import { getRepository } from "typeorm";
import { Hospede } from '../entity/Hospede';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { secret } from "../config";
import { HttpResponse } from "./response";
import { Funcionario } from "../entity/Funcionario";

const generateToken = (params = {}) => jwt.sign(params, secret, {expiresIn: 986400,});

export const authHospede = async (request: Request, response: Response) => {

    let type = request.query["tipo"];

    const { email, senha } = request.body;
    
    if(!email) return;
    if(!senha) return;

    if (type == 'hospede'){

        const registry = await getRepository(Hospede).findOne({where: {email, senha}});

        if(!registry)
            return response.status(404).json(new HttpResponse<Hospede>(null, 404, 'Dados incorretos.'));
            
        registry.senha = undefined;
        return response.status(200).json({data: registry, token: generateToken({id: registry.idHospede})});
    } else
    if (type == 'funcionario'){
        const registry = await getRepository(Funcionario).findOne({where: {email, senha}});

        if(!registry)
            return response.status(404).json(new HttpResponse<Funcionario>(null, 404, 'Funcionario não localizado.'));
            
        registry.senha = undefined;
        return response.status(200).json({data: registry, token: generateToken({id: registry.idFuncionario})})
    } else
    return response.status(400).json(new HttpResponse<Funcionario>(null, 400, 'O parâmetro passado deve ser \"hospede\" ou \"funcionario.\"'))
};

export const signupHospede = async (request: Request, response: Response) => {

    let type = request.query["tipo"];

    const registry = request.body;
    if (type == "hospede"){

        if (await getRepository(Hospede).findOne({ where: { email: registry.email} })) 
        return response.status(403).json(new HttpResponse<Hospede>(null, 403, 'Email já cadastrado'));
        
        const savedHospede = await getRepository(Hospede).save(request.body);
        savedHospede.senha = "";
        return response.status(201).json({data: savedHospede, token: generateToken({idHospede: savedHospede.idHospede})});
    }
    else
        if (type == "funcionario"){
            
        if (await getRepository(Funcionario).findOne({ where: { email: registry.email} })) 
        return response.status(403).json(new HttpResponse<Funcionario>(null, 403, 'Email já cadastrado'));
        
        const savedFuncionario = await getRepository(Funcionario).save(request.body);
        savedFuncionario.senha = "";
        return response.status(201).json({data: savedFuncionario, token: generateToken({idFuncionario: savedFuncionario.idFuncionario})});
        } else
            return response.status(400).json(new HttpResponse<Funcionario>(null, 403, 'O query param deve ser \"hospede\" ou \"funcionario\"'));
    };
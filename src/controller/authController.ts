import { getRepository } from "typeorm";
import { Hospede } from '../entity/Hospede';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { secret } from "../config";
import { HttpResponse } from "./response";
import { Funcionario } from "../entity/Funcionario";

const generateToken = (params = {}) => jwt.sign(params, secret, {expiresIn: 986400,});

export const authHospede = async (request: Request, response: Response) => {

    let type = request.query["type"];

    const { email, senha } = request.body;
    
    if(!email) return;
    if(!senha) return;


    if (type == 'hospede'){

        const registry = await getRepository(Hospede).findOne({where: {email, senha}});

        if(!registry)
            return response.status(404).json(new HttpResponse<Hospede>(null, 404, 'Hospede não localizado.'));
            
        registry.senha = undefined;
        return response.status(200).json(new HttpResponse<Hospede>(registry, 200, {data: registry, token: generateToken({id: registry.idHospede})}.toString()));
    } else
    if (type == 'funcionario'){
        const registry = await getRepository(Funcionario).findOne({where: {email, senha}});

        if(!registry)
            return response.status(404).json(new HttpResponse<Funcionario>(null, 404, 'Funcionario não localizado.'));
            
        registry.senha = undefined;
        return response.status(200).json(new HttpResponse<Funcionario>(registry, 200, {data: registry, token: generateToken({id: registry.idFuncionario})}.toString()));
    } else
    return response.status(400).json(new HttpResponse<Funcionario>(null, 400, 'O parâmetro passado deve ser \"hospede\" ou \"funcionario.\"'))
};

export const signupHospede = async (request: Request, response: Response) => {
    


    const hospede = request.body;
   
    if (await getRepository(Hospede).findOne({ where: { email: hospede.email} })) 
        return response.status(403).json({msg: 'Email já cadastrado'});

    const savedHospede = await getRepository(Hospede).save(request.body);
    savedHospede.senha = undefined;
    return response.status(201).json({data: savedHospede, token: generateToken({id: savedHospede.id})});
};
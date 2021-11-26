import { getRepository } from 'typeorm';
import { Hospede } from '../entity/Hospede';
import { Request, Response } from 'express';
import { HttpResponse } from './response';
import { hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secret } from '../config'

export const getHospedes = async (request: Request, response: Response) => {
    const hospede = await getRepository(Hospede).find({order: {idHospede: "ASC"}});

    hospede.forEach((hospede) => {
        hospede.senha = ""
    })

    return response.json(new HttpResponse<Hospede[]>(hospede, 200, 'Lista de Hospedes'));
}

export const getHospede = async (request: Request, response: Response) => {
    const { id } = request.params

    const hospede = await getRepository(Hospede).findOne(id)

    hospede.senha = "";

    return hospede == undefined ? response.status(404).json(new HttpResponse<Hospede>(hospede, 404, 'Hospede não localizado.')) : response.status(200).json(new HttpResponse<Hospede>(hospede, 200, 'Hospede localizado.'));
};

export const saveHospede = async (request: Request, response: Response) => {

    if (await getRepository(Hospede).findOne({ where: { email: request.body.email} })) 
        return response.status(403).json(new HttpResponse<Hospede>(null, 403, 'Email já cadastrado.'));  

    const hashPassword = await hash(request.body.senha, 10)

    request.body.senha = hashPassword;

    const hospede = await getRepository(Hospede).save(request.body);
    
    return response.status(201).json(new HttpResponse<Hospede>(hospede, 201, 'Hospede salvo com sucesso.'));
}

export const updateHospede = async (request: Request, response: Response) => {
    const { id } = request.params

    if (request.body.senha == ""){
        const { senha } = await getRepository(Hospede).findOne(id);
        request.body.senha = senha;
    }

    const hospede = await getRepository(Hospede).update(id, request.body); 
    const newHospede = await getRepository(Hospede).findOne(id);

    if( hospede.affected == 1 ){
        newHospede.senha = ""
        return response.status(200).json(new HttpResponse<Hospede>(newHospede, 200, 'Hospede alterado com sucesso.'))

    } 
    else
        response.status(404).json(new HttpResponse<Hospede>(null, 404, 'Hospede não localizado.'))

};

export const deleteHospede = async (request: Request, response: Response) => {
    const { id } = request.params
    const hospede = await getRepository(Hospede).delete(id)

    return hospede.affected == 1 ? response.status(204).json(new HttpResponse<Hospede>(null, 204, 'Hospede deletado com sucesso.')) : response.status(404).json(new HttpResponse<Hospede>(null, 404, 'Hospede não localizado.'))

};

export const getMe = async (request: Request, response: Response) => {
    const token = request.headers.authorization.split(' ')[1];

    const register = jwt.verify(token, secret);

    const hospede = await getRepository(Hospede).findOne({where: {idHospede: register.id}})

    hospede.senha = ""

    return response.status(200).json(new HttpResponse<Hospede>(hospede, 200, 'Dados do hospede logado.'));
}

export const findReservas = async (request: Request, response: Response) => {
    const cpf = request.query;
    const hospede = await getRepository(Hospede).findOne(cpf, { relations: ["reservas"] });

    return response.json(hospede)
}
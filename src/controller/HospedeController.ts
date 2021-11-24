import { getRepository } from 'typeorm';
import { Hospede } from '../entity/Hospede';
import { Request, Response } from 'express';
import { HttpResponse } from './response';
import { hash } from 'bcrypt'

export const getHospedes = async (request: Request, response: Response) => {
    const hospede = await getRepository(Hospede).find({order: {idHospede: "ASC"}});
    return response.json(new HttpResponse<Hospede[]>(hospede, 200, 'Lista de Hospedes'));
}

export const getHospede = async (request: Request, response: Response) => {
    const { id } = request.params

    const hospede = await getRepository(Hospede).findOne(id)

    hospede.senha = "";

    return hospede == undefined ? response.status(404).json(new HttpResponse<Hospede>(hospede, 404, 'Hospede não localizado.')) : response.status(200).json(new HttpResponse<Hospede>(hospede, 200, 'Hospede localizado.'));
};

export const saveHospede = async (request: Request, response: Response) => {

    const hashPassword = await hash(request.body.senha, 10)

    request.body.senha = hashPassword;

    const hospede = await getRepository(Hospede).save(request.body);
    
    return response.status(201).json(new HttpResponse<Hospede>(hospede, 201, 'Hospede salvo com sucesso.'));
}

export const updateHospede = async (request: Request, response: Response) => {
    const { id } = request.params
    const hospede = await getRepository(Hospede).update(id, request.body)
    const newHospede = await getRepository(Hospede).findOne(id)

    return hospede.affected == 1 ? response.status(200).json(new HttpResponse<Hospede>(newHospede, 200, 'Hospede alterado com sucesso.')) : response.status(404).json(new HttpResponse<Hospede>(null, 404, 'Hospede não localizado.'))

};

export const deleteHospede = async (request: Request, response: Response) => {
    const { id } = request.params
    const hospede = await getRepository(Hospede).delete(id)

    return hospede.affected == 1 ? response.status(204).json(new HttpResponse<Hospede>(null, 204, 'Hospede deletado com sucesso.')) : response.status(404).json(new HttpResponse<Hospede>(null, 404, 'Hospede não localizado.'))

};
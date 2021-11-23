import { getRepository } from 'typeorm';
import { Hospede } from '../entity/Hospede';
import { Request, Response } from 'express';
import { HttpResponse } from './response';


export const getHospedes = async (request: Request, response: Response) => {
    const hospede = await getRepository(Hospede).find();
    return response.json(new HttpResponse<Hospede[]>(hospede, 200, 'Lista de Hospedes'));
}

export const getHospede = async (request: Request, response: Response) => {
    const { id } = request.params
    const hospede = await getRepository(Hospede).findOne(id)
    return hospede == undefined ? response.status(404).json('Hospede não localizado.') : response.json(hospede);
};

export const saveHospede = async (request: Request, response: Response) => {
    const hospede = await getRepository(Hospede).save(request.body);
    return response.status(201).json(hospede);
}

export const updateHospede = async (request: Request, response: Response) => {
    const { id } = request.params
    const hospede = await getRepository(Hospede).update(id, request.body)
    const newHospede = await getRepository(Hospede).findOne(id)

    return hospede.affected == 1 ? response.status(200).json(newHospede) : response.status(404).json('Hospede não localizado.')

};

export const deleteHospede = async (request: Request, response: Response) => {
    const { id } = request.params
    const hospede = await getRepository(Hospede).delete(id)

    return hospede.affected == 1 ? response.status(204).json('Hospede excluído com sucesso.') : response.status(404).json('Hospede não localizado.')

};
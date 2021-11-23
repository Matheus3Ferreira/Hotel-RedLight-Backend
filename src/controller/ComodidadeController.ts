import { getRepository } from 'typeorm';
import { Comodidade } from '../entity/Comodidade';
import { Request, Response } from 'express';
import { HttpResponse } from './response';

export const getComodidades = async (request: Request, response: Response) => {
    const comodidade = await getRepository(Comodidade).find();
    return response.status(200).json(new HttpResponse<Comodidade[]>(comodidade, 200, 'Lista de Comodidades.'));
}

export const getComodidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const comodidade = await getRepository(Comodidade).findOne(id)
    return comodidade == undefined ? response.status(404).json(new HttpResponse<Comodidade>(null, 404, 'Comodidade não localizada')) : response.status(200).json(new HttpResponse<Comodidade>(comodidade, 200, 'Comodidade localizada'));
};

export const saveComodidade = async (request: Request, response: Response) => {
    const comodidade = await getRepository(Comodidade).save(request.body);
    return response.status(201).json(new HttpResponse<Comodidade>(comodidade, 201, 'Comodidade salva com sucesso'));
}

export const updateComodidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const comodidade = await getRepository(Comodidade).update(id, request.body)
    const findComodidade = await getRepository(Comodidade).findOne(id);

    return comodidade.affected == 1 ? response.status(200).json(new HttpResponse<Comodidade>(findComodidade, 200, 'Comodidade alterada com sucesso')) : response.status(404).json(new HttpResponse<Comodidade>(null, 404, 'Comodidade não localizada'));

};

export const deleteComodidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const comodidade = await getRepository(Comodidade).delete(id)

    return comodidade.affected == 1 ? response.status(204).json(new HttpResponse<Comodidade>(null, 204, 'Comodidade excluida com sucesso.')) : response.status(404).json(new HttpResponse<Comodidade>(null, 404, 'Comodidade não localizada'))

};


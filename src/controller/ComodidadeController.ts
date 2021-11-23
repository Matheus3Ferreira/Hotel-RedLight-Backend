import { getRepository } from 'typeorm';
import { Comodidade } from '../entity/Comodidade';
import { Request, Response } from 'express';

export const getComodidades = async (request: Request, response: Response) => {
    const comodidade = await getRepository(Comodidade).find();
    return response.json(comodidade);
}

export const getComodidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const comodidade = await getRepository(Comodidade).findOne(id)
    return comodidade == undefined ? response.status(404).json('Usuario não localizado.') : response.status(200).json(comodidade);
};

export const saveComodidade = async (request: Request, response: Response) => {
    const comodidade = await getRepository(Comodidade).save(request.body);
    return response.status(201).json(comodidade);
}

export const updateComodidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const comodidade = await getRepository(Comodidade).update(id, request.body)

    return comodidade.affected == 1 ? response.status(200).json('Comodidade alterada com sucesso.') : response.status(404).json('Comodidade não localizada.')

};

export const deleteComodidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const comodidade = await getRepository(Comodidade).delete(id)

    return comodidade.affected == 1 ? response.status(200).json('Comodidade excluída com sucesso.') : response.status(404).json('Comodidade não localizada.')

};


import { getRepository } from 'typeorm';
import { Quarto } from '../entity/Quarto';
import { Request, Response } from 'express';
import { HttpResponse } from './response';

export const getQuartos = async (request: Request, response: Response) => {
    const quarto = await getRepository(Quarto).find({relations: ['comodidades']});
    return response.json(new HttpResponse<Quarto[]>(quarto, 200, 'Quarto localizado.'));
}

export const getQuarto = async (request: Request, response: Response) => {
    const { id } = request.params
    const quarto = await getRepository(Quarto).findOne(id, {relations: ['comodidades']});
    return quarto == undefined ? response.status(404).json(new HttpResponse<Quarto>(null, 404, 'Quarto não localizado.')) : response.status(200).json(new HttpResponse<Quarto>(quarto, 200, 'Quarto localizado.'));
};

export const saveQuarto = async (request: Request, response: Response) => {

    const quarto = await getRepository(Quarto).save(request.body);
    return response.status(201).json(new HttpResponse<Quarto>(quarto, 201, 'Quarto criado com sucesso.'));
}

export const updateQuarto = async (request: Request, response: Response) => {
    const { id } = request.params
    const quarto = await getRepository(Quarto).update(id, request.body)

    return quarto.affected == 1 ? response.status(200).json('Quarto alterado com sucesso.') : response.status(404).json('Quarto não localizado.')

};

export const deleteQuarto = async (request: Request, response: Response) => {
    const { id } = request.params
    const quarto = await getRepository(Quarto).delete(id)

    return quarto.affected == 1 ? response.status(200).json('Quarto excluído com sucesso.') : response.status(404).json('Quarto não localizado.')

};




import { getRepository } from 'typeorm';
import { Quarto } from '../entity/Quarto';
import { Request, Response } from 'express';

export const getQuartos = async (request: Request, response: Response) => {
    const quarto = await getRepository(Quarto).find();
    return response.json(quarto);
}

export const getQuarto = async (request: Request, response: Response) => {
    const { id } = request.params
    const quarto = await getRepository(Quarto).findOne(id);
    return quarto == undefined ? response.status(404).json('Quarto não localizado.') : response.status(200).json(quarto);
};

export const saveQuarto = async (request: Request, response: Response) => {
    const quarto = await getRepository(Quarto).save(request.body);
    return response.status(201).json(quarto);
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




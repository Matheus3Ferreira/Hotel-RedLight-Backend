import { getRepository } from 'typeorm';
import { Quarto } from '../entity/Quarto';
import { Request, Response } from 'express';
import { json } from 'body-parser';

export const getQuartos = async (request: Request, response: Response) => {
    const quarto = await getRepository(Quarto).find({relations: ['comodidades']});
    return response.json(quarto);
}

export const getQuarto = async (request: Request, response: Response) => {
    const { id } = request.params
    const quarto = await getRepository(Quarto).findOne(id, {relations: ['comodidades']});
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

export const bookQuarto = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { disponivel } = await getRepository(Quarto).findOne(id);
    const quarto = await getRepository(Quarto).update(id, {disponivel: !disponivel});

    if (quarto.affected == 1) {
        const quartoTurnedOff = await getRepository(Quarto).findOne(id);
        return response.json(quartoTurnedOff);
    }
    else
        return response.status(404).json({ message: "Quarto não localizado." });
}  


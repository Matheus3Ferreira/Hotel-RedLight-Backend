import { getRepository } from 'typeorm';
import { Ocupacao } from '../entity/Ocupacao';
import { Request, Response } from 'express';
import { HttpResponse } from './response'

export const getOcupacoes = async (request: Request, response: Response) => {
    const ocupacao = await getRepository(Ocupacao).find();
    return response.json(ocupacao);
}

export const getOcupacao = async (request: Request, response: Response) => {
    const { id } = request.params
    const ocupacao = await getRepository(Ocupacao).findOne(id)
    return ocupacao == undefined ? response.status(404).json('Usuário não localizado.') : response.json(ocupacao);
};

export const saveOcupacao = async (request: Request, response: Response) => {
    const ocupacao = await getRepository(Ocupacao).save(request.body);
    return response.status(201).json(ocupacao);
}

export const updateOcupacao = async (request: Request, response: Response) => {
    const { id } = request.params
    const ocupacao = await getRepository(Ocupacao).update(id, request.body)

    if (ocupacao.affected == 1) {
        const ocupacaoUpdated = await getRepository(Ocupacao).findOne(id)
        return response.json(ocupacaoUpdated);
    }
    else {
        return response.status(404).json({ message: 'Ocupação não encontrada!' })
    }
};

export const deleteOcupacao = async (request: Request, response: Response) => {
    const { id } = request.params
    const ocupacao = await getRepository(Ocupacao).delete(id)

    if (ocupacao.affected == 1) {
        return response.status(200).json({ message: "Ocupação excluída com sucesso!" });
    }
    else {
        return response.status(404).json({ message: 'Ocupação não encontrada!' })
    }
};
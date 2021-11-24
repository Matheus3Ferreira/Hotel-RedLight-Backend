import { getRepository } from 'typeorm';
import { Ocupacao } from '../entity/Ocupacao';
import { Request, Response } from 'express';
import { HttpResponse } from './response'

export const getOcupacoes = async (request: Request, response: Response) => {
    const ocupacao = await getRepository(Ocupacao).find();
    return response.status(200).json(new HttpResponse<Ocupacao[]>(ocupacao, 200, 'Lista de Ocupações.'));
}

export const getOcupacao = async (request: Request, response: Response) => {
    const { id } = request.params
    const ocupacao = await getRepository(Ocupacao).findOne(id)
    return ocupacao == undefined ? response.status(404).json(new HttpResponse<Ocupacao>(null, 404, 'Ocupação não localizada.')) : response.status(200).json(new HttpResponse<Ocupacao>(ocupacao, 200, 'Ocupação localizada.'));
};

export const saveOcupacao = async (request: Request, response: Response) => {
    const ocupacao = await getRepository(Ocupacao).save(request.body);
    return response.status(201).json(new HttpResponse<Ocupacao>(ocupacao, 201, 'Ocupação salva com sucesso.'));
}

export const updateOcupacao = async (request: Request, response: Response) => {
    const { id } = request.params
    const ocupacao = await getRepository(Ocupacao).update(id, request.body)

    if (ocupacao.affected == 1) {
        const ocupacaoUpdated = await getRepository(Ocupacao).findOne(id)
        return response.json(new HttpResponse<Ocupacao>(ocupacaoUpdated, 200, 'Ocupação alterada com sucesso.'));
    }
    else {
        return response.status(404).json(new HttpResponse<Ocupacao>(null, 404, 'Ocupação não localizada.'))
    }
};

export const deleteOcupacao = async (request: Request, response: Response) => {
    const { id } = request.params
    const ocupacao = await getRepository(Ocupacao).delete(id)

    if (ocupacao.affected == 1) {
        return response.status(200).json(new HttpResponse<Ocupacao>(null, 204, 'Ocupação excluida com sucesso.'));
    }
    else {
        return response.status(404).json(new HttpResponse<Ocupacao>(null, 404, 'Ocupação não localizada.'))
    }
};
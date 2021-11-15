import { getRepository } from 'typeorm';
import { Servico } from '../entity/Servico';
import { Request, Response } from 'express';
import { HttpResponse } from './response';

export const getServicos = async (request: Request, response: Response) => {
    const servico = await getRepository(Servico).find();
    return response.json(servico);
}

export const getOneServico = async (request: Request, response: Response) => {
    const { id } = request.params
    const servico = await getRepository(Servico).findOne(id)
    return servico == undefined ? response.status(404).json('Serviço não localizado.') : response.json(servico);
};

export const saveServico = async (request: Request, response: Response) => {
    const servico = await getRepository(Servico).save(request.body);
    return response.status(201).json(servico);
}

export const updateServico = async (request: Request, response: Response) => {
    const { id } = request.params
    const servico = await getRepository(Servico).update(id, request.body)

    if (servico.affected == 1) {
        const servicoUpdated = await getRepository(Servico).findOne(id)
        return response.json(servicoUpdated);
    }
    else {
        return response.status(404).json({ message: 'Serviço não encontrado!' })
    }
};

export const deleteServico = async (request: Request, response: Response) => {
    const { id } = request.params
    const servico = await getRepository(Servico).delete(id)
    return servico.affected == 1 ? response.status(204).json("Serviço excluído com sucesso") : response.status(404).json('Serviço não encontrado!')
};
import { getRepository } from 'typeorm';
import { Servico } from '../entity/Servico';
import { Request, Response } from 'express';
import { HttpResponse } from './response';

export const getServicos = async (request: Request, response: Response) => {
    const servico = await getRepository(Servico).find();
    return response.status(200).json(new HttpResponse<Servico[]>(servico, 200, 'Serviços listados.'));
}

export const getOneServico = async (request: Request, response: Response) => {
    const { id } = request.params
    const servico = await getRepository(Servico).findOne(id)
    return servico == undefined ? response.status(404).json(new HttpResponse<Servico>(null, 404, 'Serviço não localizado.')) : response.status(200).json(new HttpResponse<Servico>(servico, 200, 'Serviço localizado.'));
};

export const saveServico = async (request: Request, response: Response) => {
    const servico = await getRepository(Servico).save(request.body);
    return response.status(201).json(new HttpResponse<Servico>(servico, 201, 'Serviços salvo com sucesso.'));
}

export const updateServico = async (request: Request, response: Response) => {
    const { id } = request.params
    const servico = await getRepository(Servico).update(id, request.body)

    if (servico.affected == 1) {
        const servicoUpdated = await getRepository(Servico).findOne(id)
        return response.status(200).json(new HttpResponse<Servico>(servicoUpdated, 200, 'Serviço alterado com sucesso..'));
    }
    else {
        return response.status(404).json(new HttpResponse<Servico>(null, 404, 'Serviços não localizado.'))
    }
};

export const deleteServico = async (request: Request, response: Response) => {
    const { id } = request.params
    const servico = await getRepository(Servico).delete(id)
    return servico.affected == 1 ? response.status(204).json(new HttpResponse<Servico>(null, 204, 'Serviço excluido com sucesso.')) : response.status(404).json(new HttpResponse<Servico>(null, 404, 'Serviço não localizado.'))
};
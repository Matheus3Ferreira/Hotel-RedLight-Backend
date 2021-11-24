import { getRepository } from 'typeorm';
import { Consumo } from '../entity/Consumo';
import { Request, Response } from 'express';
import { Servico } from '../entity/Servico';
import { HttpResponse } from './response';

export const getConsumos = async (request: Request, response: Response) => {
    const consumo = await getRepository(Consumo).find();
    return response.status(200).json(new HttpResponse<Consumo[]>(consumo, 200, 'Listagem de Consumos'));
}

export const getOneConsumo = async (request: Request, response: Response) => {
    const { id } = request.params;
    const consumo = await getRepository(Consumo).findOne(id);
    return consumo == undefined ? response.status(404).json(new HttpResponse<Consumo>(consumo, 404, 'Consumo não localizado')) : response.status(200).json(new HttpResponse<Consumo>(consumo, 200, 'Consumo localizado'));
};

export const saveConsumo = async (request: Request, response: Response) => {
    const {quantidade, idServico} = request.body;
    const {valor} = await getRepository(Servico).findOne(idServico);
    request.body.valorTotal = valor * quantidade;
    const consumo = await getRepository(Consumo).save(request.body);
    return response.status(201).json(new HttpResponse<Consumo>(consumo, 201, 'Consumo criado.'));
}

export const updateConsumo = async (request: Request, response: Response) => {
    const { id } = request.params;
    const consumo = await getRepository(Consumo).update(id, request.body);

    if (consumo.affected == 1) {
        const servicoUpdated = await getRepository(Consumo).findOne(id)
        return response.status(200).json(new HttpResponse<Consumo>(servicoUpdated, 200, 'Consumo alterado com sucesso'));
    }
    else {
        return response.status(404).json(new HttpResponse<Consumo>(null, 404, 'Consumo não localizado'))
    }
};

export const deleteConsumo = async (request: Request, response: Response) => {
    const { id } = request.params
    const consumo = await getRepository(Consumo).delete(id)
    return consumo.affected == 1 ? response.status(204).json("Consumo excluído com sucesso") : response.status(404).json('Consumo não encontrado!')
};
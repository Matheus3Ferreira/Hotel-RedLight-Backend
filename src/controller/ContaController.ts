import { getRepository } from 'typeorm';
import { Conta } from '../entity/Conta';
import { Request, Response } from 'express';

export const getContas = async (request: Request, response: Response) => {
    const conta = await getRepository(Conta).find({relations: ['consumos']});
    return response.json(conta);
}

export const getOneConta = async (request: Request, response: Response) => {
    const { id } = request.params
    const conta = await getRepository(Conta).findOne(id, { relations: ['consumos'] })
    return conta == undefined ? response.status(404).json('Conta não localizado.') : response.json(conta);
};

export const getConta = async (request: Request, response: Response) => {
    const { id } = request.params
    const conta = await getRepository(Conta).findOne(id)
    return conta == undefined ? response.status(404).json('Conta não localizado.') : response.status(200).json(conta);
};

export const saveConta = async (request: Request, response: Response) => {
    if (!request.body.quartos)
        return response.status(400).json()
    const conta = await getRepository(Conta).save(request.body);

    return response.status(201).json(conta);
}

export const updateConta = async (request: Request, response: Response) => {
    const { id } = request.params
    const conta = await getRepository(Conta).update(id, request.body)

    return conta.affected == 1 ? response.status(200).json('Conta alterada com sucesso.') : response.status(404).json('Conta não localizada.')

};

export const deleteConta = async (request: Request, response: Response) => {
    const { id } = request.params
    const conta = await getRepository(Conta).delete(id)

    return conta.affected == 1 ? response.status(200).json('Conta excluída com sucesso.') : response.status(404).json('Conta não localizada.')

};


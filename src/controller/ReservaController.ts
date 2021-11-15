import { getRepository } from 'typeorm';
import { Reserva } from '../entity/Reserva';
import { Request, Response } from 'express';
import { HttpResponse } from './response'

export const getReservas = async (request: Request, response: Response) => {
    const reserva = await getRepository(Reserva).find();
    return response.json(reserva);
}

export const getReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).findOne(id)
    return reserva == undefined ? response.status(404).json('Reserva não localizada.') : response.status(200).json(reserva);
};

export const saveReserva = async (request: Request, response: Response) => {
    const reserva = await getRepository(Reserva).save(request.body);
    return response.status(201).json(reserva);
}

export const updateReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).update(id, request.body)

    return reserva.affected == 1 ? response.status(200).json('Reserva alterada com sucesso.') : response.status(404).json('Reserva não localizada.')

};

export const deleteReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).delete(id)

    return reserva.affected == 1 ? response.status(200).json('Reserva excluída com sucesso.') : response.status(404).json('Reserva não localizada.')

};

export const inactiveReserva = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { ativo } = await getRepository(Reserva).findOne(id);
    const reserva = await getRepository(Reserva).update(id, {ativo: !ativo});

    if (reserva.affected == 1) {
        const inactiveReserva = await getRepository(Reserva).findOne(id);
        return response.status(200).json(inactiveReserva);
    }
    else
        return response.status(404).json({ message: "Reserva não localizada." });
};
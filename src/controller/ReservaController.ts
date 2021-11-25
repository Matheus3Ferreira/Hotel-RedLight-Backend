import { getRepository } from 'typeorm';
import { Reserva } from '../entity/Reserva';
import { Request, Response } from 'express';
import { HttpResponse } from './response';

export const getReservas = async (request: Request, response: Response) => {
    const reserva = await getRepository(Reserva).find();
    return response.status(200).json(new HttpResponse<Reserva[]>(reserva, 200, 'Reservas listadas'));
}

export const getReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).findOne(id)
    return reserva == undefined ? response.status(404).json(new HttpResponse<Reserva>(null, 404, 'Reserva não localizada listadas')) : response.status(200).json(new HttpResponse<Reserva>(reserva, 200, 'Reserva localizada'));
};

export const saveReserva = async (request: Request, response: Response) => {
    
    if (!request.body.quartos)
        return response.status(400).json(new HttpResponse<Reserva>(null, 400, 'Quartos não informados.'))

    const reserva = await getRepository(Reserva).save(request.body);

    return response.status(201).json(new HttpResponse<Reserva>(reserva, 201, 'Reserva salva com sucesso.'));
}

export const updateReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).update(id, request.body)

    return reserva.affected == 1 ? response.status(200).json(new HttpResponse<Reserva>(null, 200, 'Reserva alterada com sucesso.')) : response.status(404).json(new HttpResponse<Reserva>(null, 404, 'Reserva não localizada '))

};

export const deleteReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).delete(id)

    return reserva.affected == 1 ? response.status(200).json(new HttpResponse<Reserva>(null, 200, 'Reserva excluida com sucesso.')) : response.status(404).json(new HttpResponse<Reserva>(null, 404, 'Reserva não localizada '))

};
import { getRepository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Reserva } from '../entity/Reserva';
import { Request, Response } from 'express';
import { HttpResponse } from './response';
import { Quarto } from '../entity/Quarto';
import uniqid from 'uniqid'

export const getReservas = async (request: Request, response: Response) => {
    const reserva = await getRepository(Reserva).find({ relations: ['quartos'], order: { idReserva: "DESC" } });
    return response.status(200).json(new HttpResponse<Reserva[]>(reserva, 200, 'Reservas listadas'));
}

export const getReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).findOne(id, { relations: ['quartos'], order: { idReserva: "DESC" } })
    return reserva == undefined ? response.status(404).json(new HttpResponse<Reserva>(null, 404, 'Reserva não localizada listadas')) : response.status(200).json(new HttpResponse<Reserva>(reserva, 200, 'Reserva localizada'));
};

export const saveReserva = async (request: Request, response: Response) => {

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

export const checkReserva = async (request: Request, response: Response) => {
    const {idReserva} = request.params;

    const reservaChecada = await getRepository(Reserva).update(idReserva, {
        checado: true,
        protocolo: uniqid()
    })

   if (reservaChecada.affected) {
       const reserva = await getRepository(Reserva).findOne(idReserva);
       return response.status(200).json(new HttpResponse<Reserva>(reserva, 200, 'Reserva checada com sucesso.')); 
   }
   else
       return response.status(200).json(new HttpResponse<Reserva>(null, 404, 'Reserva não localizada.')); 

}   
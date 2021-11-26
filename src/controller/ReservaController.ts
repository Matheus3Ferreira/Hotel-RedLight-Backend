import { getRepository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Reserva } from '../entity/Reserva';
import { Request, Response } from 'express';
import { HttpResponse } from './response';
import { Quarto } from '../entity/Quarto';

export const getReservas = async (request: Request, response: Response) => {
    const reserva = await getRepository(Reserva).find({relations: ['quartos'], order: {idReserva: "DESC"}});
    return response.status(200).json(new HttpResponse<Reserva[]>(reserva, 200, 'Reservas listadas'));
}

export const getReserva = async (request: Request, response: Response) => {
    const { id } = request.params
    const reserva = await getRepository(Reserva).findOne(id, {relations: ['quartos'], order: {idReserva: "DESC"}})
    return reserva == undefined ? response.status(404).json(new HttpResponse<Reserva>(null, 404, 'Reserva não localizada listadas')) : response.status(200).json(new HttpResponse<Reserva>(reserva, 200, 'Reserva localizada'));
};

export const testReserva = async (request: Request, response: Response) => {
    const reserva = await getRepository(Reserva).save(request.body);

    return response.status(201).json(new HttpResponse<Reserva>(reserva, 201, 'Reserva salva com sucesso.'));
}

export const saveReserva = async (request: Request, response: Response) => {
    
    const { quartos, checkIn, checkOut } = request.body;

    if (!quartos)
        return response.status(400).json(new HttpResponse<Reserva>(null, 400, 'Quartos não informados.'));

    let err = false;

     quartos.forEach( async (quarto) => {
        //Procurar nas reservas se dentro da data de checkin E checkout existe o quarto listado.
        //1° pegar todas as reservas do periodo
        //2° verificar se os quarto está em uma dessas reservas.
        const verifyReservas = await getRepository(Reserva).find({
            where: {
                checkIn: MoreThanOrEqual(checkIn),
                checkOut: LessThanOrEqual(checkOut)
            },
        });

        console.log(verifyReservas)
        return response.json("Ok")
    })


    //     if (verifyReservas)
    //         console.log(verifyReservas)
    //         return response.status(400).json(new HttpResponse<Reserva>(null, 400, 'Quarto já reservado.'));
    // })

    // const reserva = await getRepository(Reserva).save(request.body);

    // return response.status(201).json(new HttpResponse<Reserva>(reserva, 201, 'Reserva salva com sucesso.'));
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
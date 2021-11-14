// import { getRepository } from 'typeorm';
// import { Reserva } from '../entity/Reserva';
// import { Request, Response } from 'express';

// export const getReservas = async (request: Request, response: Response) => {
//     const comodidade = await getRepository(Reserva).find();
//     return response.json(comodidade);
// }

// export const getReserva = async (request: Request, response: Response) => {
//     const { id } = request.params
//     const comodidade = await getRepository(Reserva).findOne(id)
//     return comodidade == undefined ? response.status(404).json('Usuario não localizado.') : response.status(200).json(comodidade);
// };

// export const saveReserva = async (request: Request, response: Response) => {
//     const comodidade = await getRepository(Reserva).save(request.body);
//     return response.status(201).json(comodidade);
// }

// export const updateReserva = async (request: Request, response: Response) => {
//     const { id } = request.params
//     const comodidade = await getRepository(Reserva).update(id, request.body)

//     return comodidade.affected == 1 ? response.status(200).json('Reserva alterada com sucesso.') : response.status(404).json('Reserva não localizada.')

// };

// export const deleteReserva = async (request: Request, response: Response) => {
//     const { id } = request.params
//     const comodidade = await getRepository(Reserva).delete(id)

//     return comodidade.affected == 1 ? response.status(200).json('Reserva excluída com sucesso.') : response.status(404).json('Reserva não localizada.')

// };


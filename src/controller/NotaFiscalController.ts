// import { getRepository } from 'typeorm';
// import { NotaFiscal } from '../entity/NotaFiscal';
// import { Request, Response } from 'express';

// export const getNotaFiscais = async (request: Request, response: Response) => {
//     const notaFiscal = await getRepository(NotaFiscal).find();
//     return response.json(notaFiscal);
// }

// export const getNotaFiscal = async (request: Request, response: Response) => {
//     const { id } = request.params
//     const notaFiscal = await getRepository(NotaFiscal).findOne(id)
//     return notaFiscal == undefined ? response.status(404).json('Usuario não localizado.') : response.status(200).json(notaFiscal);
// };

// export const saveNotaFiscal = async (request: Request, response: Response) => {
//     const notaFiscal = await getRepository(NotaFiscal).save(request.body);
//     return response.status(201).json(notaFiscal);
// }

// export const deleteNotaFiscal = async (request: Request, response: Response) => {
//     const { id } = request.params
//     const notaFiscal = await getRepository(NotaFiscal).delete(id)

//     return notaFiscal.affected == 1 ? response.status(200).json('NotaFiscal excluída com sucesso.') : response.status(404).json('Nota fiscal não localizada.')

// };
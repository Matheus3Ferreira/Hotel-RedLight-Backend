import { getRepository } from 'typeorm';
import { Funcionario } from '../entity/Funcionario';
import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import { HttpResponse } from './response';


export const getFuncionarios = async (request: Request, response: Response) => {
    const funcionario = await getRepository(Funcionario).find({order: {idFuncionario: "ASC"}});
    return response.json(new HttpResponse<Funcionario[]>(funcionario, 200, 'Lista de Funcionarios'));
}

export const getFuncionario = async (request: Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).findOne(id)

    funcionario.senha = "";

    return funcionario == undefined ? response.status(404).json(new HttpResponse<Funcionario>(null, 404, 'Funcionário não localizado')) : response.json(new HttpResponse<Funcionario>(funcionario, 200, 'Funcionario localizado'));
};

export const saveFuncionario = async (request: Request, response: Response) => {

    const hashPassword = await hash(request.body.senha, 10)

    request.body.senha = hashPassword;

    const funcionario = await getRepository(Funcionario).save(request.body);

    return response.status(201).json(funcionario);
}

export const updateFuncionario = async (request: Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).update(id, request.body)

    if (funcionario.affected == 1) {
        const funcionarioUpdated = await getRepository(Funcionario).findOne(id)
        return response.json(funcionarioUpdated);
    }
    else {
        return response.status(404).json({ message: 'Funcionario não encontrado!' })
    }
};

export const deleteFuncionario = async (request: Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).delete(id)

    if (funcionario.affected == 1) {
        return response.status(200).json({ message: "Funcionario excluído com sucesso!" });
    }
    else {
        return response.status(404).json({ message: 'Funcionario não encontrado!' })
    }
};
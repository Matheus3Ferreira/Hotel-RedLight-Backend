import { getRepository } from 'typeorm';
import { Funcionario } from '../entity/Funcionario';
import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import { HttpResponse } from './response';


export const getFuncionarios = async (request: Request, response: Response) => {
    const funcionario = await getRepository(Funcionario).find({order: {idFuncionario: "ASC"}});

    funcionario.forEach((funcionario) => {
        funcionario.senha = "";
    })

    return response.json(new HttpResponse<Funcionario[]>(funcionario, 200, 'Lista de Funcionarios'));
}

export const getFuncionario = async (request: Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).findOne(id)

    funcionario.senha = "";

    return funcionario == undefined ? response.status(404).json(new HttpResponse<Funcionario>(null, 404, 'Funcionário não localizado')) : response.json(new HttpResponse<Funcionario>(funcionario, 200, 'Funcionario localizado'));
};

export const saveFuncionario = async (request: Request, response: Response) => {

    if (await getRepository(Funcionario).findOne({ where: { email: request.body.email} })) 
        return response.status(403).json(new HttpResponse<Funcionario>(null, 403, 'Email já cadastrado.'));

    const hashPassword = await hash(request.body.senha, 10)

    request.body.senha = hashPassword;

    const funcionario = await getRepository(Funcionario).save(request.body);

    return response.status(201).json(new HttpResponse<Funcionario>(funcionario, 201, 'Funcionário salvo com sucesso'));
}

export const updateFuncionario = async (request: Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).update(id, request.body)

    if (request.body.senha == ""){
        const {senha} = await getRepository(Funcionario).findOne(id);
        request.body.senha = senha;
    }

    if (funcionario.affected == 1) {
        const funcionarioUpdated = await getRepository(Funcionario).findOne(id)
        funcionarioUpdated.senha = "";
        return response.json(new HttpResponse<Funcionario>(funcionarioUpdated, 201, 'Funcionário salvo com sucesso'));
    }
    else {
        return response.status(404).json(new HttpResponse<Funcionario>(null, 404, 'Funcionário não localizado'))
    }
};

export const deleteFuncionario = async (request: Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).delete(id)

    if (funcionario.affected == 1) {
        return response.status(204).json(new HttpResponse<Funcionario>(null, 204, 'Funcionário deletado com sucesso'));
    }
    else {
        return response.status(404).json(new HttpResponse<Funcionario>(null, 404, 'Funcionário não localizado'))
    }
};
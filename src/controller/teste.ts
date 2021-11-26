import { Request, Response } from 'express';
import uniqid from 'uniqid'

export const teste = async (request: Request, response: Response) => {
   console.log(uniqid());
}
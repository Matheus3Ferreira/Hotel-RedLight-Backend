import * as jwt from "jsonwebtoken"
import {secret} from "../config"
import { HttpResponse } from "../controller/response"


export default function tokenValidator(req: any, res: any, next: Function) {

    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send(new HttpResponse(null, 401, 'No token provided'));

    const parts: string[] = authHeader.split(' ');

    if(parts.length !== 2)
        return res.status(401).send(new HttpResponse(null, 401, 'Token error'));

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send(new HttpResponse(null, 401, 'Token malformatted'));

    jwt.verify(token, secret, (err: Error, decoded: any) => {

        if(err) 
            return res.status(401).send(new HttpResponse(null, 401, 'Token invalid'));

        req.confirmationCode = decoded.id;
        return next();

    });

};
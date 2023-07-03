import { Desafio } from "./desafio.interface";

export interface Prueba{
    id: number;
    datos: string;
    resultado: string;
    desafio: Desafio;
}

export interface PruebaRes{
    desafio: Desafio;
    prueba_res: Respuesta[];
}

export interface Respuesta{
    id: number;
    respuesta: any;
    pregunta: string;
}
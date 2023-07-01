import { Nivel } from "./nivel.interface";

export interface Desafio {
    id: number;
    nombre: string;
    min_energia: number;
    nivel: Nivel;
}
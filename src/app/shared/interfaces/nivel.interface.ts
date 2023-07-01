export interface Nivel {
    id: number;
    nombre: string;
    descripcion: string;
    nivel: number;
    imagen: string;
}

export interface NivelUser {
    id: number;
    nombre: string;
    descripcion: string;
    nivel: number;
    imagen: string;
    habilitado: boolean;
}
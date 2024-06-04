import { TipoUva } from "./TipoUva";

export class Varietal {
    descripcion: string;
    porcentajeComposicion: number;
    tipoUva:TipoUva;
    constructor(descripcion: string, porcentajeComposicion: number, tipoUva:TipoUva){
        this.descripcion = descripcion, 
        this.porcentajeComposicion = porcentajeComposicion;
        this.tipoUva = tipoUva;
    }
}
import { TipoUva } from "./TipoUva";

export class Varietal {
    descripcion: string;
    porcentajeComposicion: number;
    tipoUva:string;
    constructor(descripcion: string, porcentajeComposicion: number, tipoUva:string){
        this.descripcion = descripcion, 
        this.porcentajeComposicion = porcentajeComposicion;
        this.tipoUva = tipoUva;
    }
}

//REVISAR LA FOTO DE LAS CLASE QUE NOS DIERON PARA VER SI AGREGAR MÁS METODOS
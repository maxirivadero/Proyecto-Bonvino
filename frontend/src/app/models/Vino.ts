import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { Varietal } from "./Varietal";

export class Vino {
    imagenEtiqueta: string;
    nombre: string;
    notaDeCataBodega: string;
    precioARS:number;
    varietal:Array<Varietal>;
    maridaje:Array<Maridaje>;
    bodega:string;
    fechaActualizacion:Date;

    constructor(imagenEtiqueta: string, nombre: string, notaDeCataBodega: string, precioARS:number, varietal:Array<Varietal>, maridaje:Array<Maridaje>, bodega:string, fechaActualizacion:Date) {
        this.imagenEtiqueta = imagenEtiqueta;
        this.nombre = nombre;
        this.notaDeCataBodega = notaDeCataBodega;
        this.precioARS = precioARS;
        this.varietal = varietal;
        this.maridaje = maridaje;
        this.bodega = bodega;
        this.fechaActualizacion = new Date();
    }

    //mostrarInfo(): string {
    //    return `
    //        Nombre: ${this.nombre}
    //        Nota de Cata: ${this.notaDeCataBodega}
    //        Precio (ARS): ${this.precioARS}
    //        Bodega: ${this.bodega.nombre}
    //        Varietales: ${this.varietal.map(v => v.descripcion).join(", ")}
    //        Maridajes: ${this.maridaje.map(m => m.descripcion).join(", ")}
    //    `;
    //}

    sosVinoActualizar() {

    }

    set setPrecio(nuevoPrecio:number) {
        this.precioARS = nuevoPrecio;
    }

    set setNotaCata(nuevaNotaCata:string) {
        this.notaDeCataBodega = nuevaNotaCata;
    }

    set setImagenEtiqueta(nuevaImagenEtiqueta:string) {
        this.imagenEtiqueta = nuevaImagenEtiqueta;
    }

    set setFechaActualizacion(fecha: Date){
        this.fechaActualizacion = fecha;
    }

    crearVarietal() {
        
    }

}

//VER COMO HACER PARA RELACIONAR VINO CON BODEGA
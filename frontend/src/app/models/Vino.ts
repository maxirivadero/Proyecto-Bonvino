import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { Varietal } from "./Varietal";
import vinos from "../../assets/json/vinos.json";

export class Vino {
    imagenEtiqueta: string;
    nombre: string;
    notaDeCataBodega: string;
    precioARS:number;
    varietal:Array<Varietal>;
    maridaje:Array<Maridaje>;
    bodega:string;
    fechaActualizacion:Date;
    vinosActualizados: Vino[] = [];
    vinosACrear: Vino[] = [];

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

    sosVinoActualizar(vinoActualizado:string) {
        return (this.nombre === vinoActualizado);
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
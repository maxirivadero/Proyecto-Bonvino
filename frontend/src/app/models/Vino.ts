import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { Varietal } from "./Varietal";
import { TipoUva } from "./TipoUva";

export class Vino {
    añada:number;
    imagenEtiqueta: string;
    nombre: string;
    notaDeCataBodega: string;
    precioARS:number;
    varietal:Array<Varietal>;
    maridaje:Array<Maridaje>;
    bodega:string;
    fechaActualizacion:Date;

    constructor(añada:number,imagenEtiqueta: string, nombre: string, notaDeCataBodega: string, precioARS:number, varietal:Array<Varietal>, maridaje:Array<Maridaje>, bodega:string, fechaActualizacion:Date) {
        this.añada = añada;
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

    crearVarietal(nuevoTipoUva:TipoUva[]) {
        //verificar atributos Varietal
        let varietales: Array<Varietal> = [];
        let cont = 0;
        nuevoTipoUva.forEach((tipoUva) => {
            let varietal = new Varietal(this.varietal[cont].descripcion,this.varietal[cont].porcentajeComposicion,tipoUva);
            varietales.push(varietal);
        })
        return varietales;
    }

}

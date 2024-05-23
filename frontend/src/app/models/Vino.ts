import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { Varietal } from "./Varietal";

export class Vino {
    contraseña: string;
    imagenEtiqueta: string;
    nombre: string;
    notaDeCataBodega: string;
    precioARS:number;
    varietal:Array<Varietal>;
    maridaje:Array<Maridaje>;
    bodega:Bodega;

    constructor(contraseña: string, imagenEtiqueta: string, nombre: string, notaDeCataBodega: string, precioARS:number, varietal:Array<Varietal>, maridaje:Array<Maridaje>, bodega:Bodega) {
        this.contraseña = contraseña;
        this.imagenEtiqueta = imagenEtiqueta;
        this.nombre = nombre;
        this.notaDeCataBodega = notaDeCataBodega;
        this.precioARS = precioARS;
        this.varietal = varietal;
        this.maridaje = maridaje;
        this.bodega = bodega;
    }

    calcularRanking() {

    }

    compararEtiqueta() {

    }

    esDeBodega() {

    }

    esDeRegionVitivinicola() {

    }

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

    setFechaAcualizacion() {
        
    }

    crearVarietal() {
        
    }

}

//VER COMO HACER PARA RELACIONAR VINO CON BODEGA
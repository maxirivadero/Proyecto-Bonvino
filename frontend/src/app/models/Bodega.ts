import vinos from "../../assets/json/vinos.json";
import { Vino } from "./Vino";
import { JsonToClass } from "./JsonToClass";

export class Bodega {
    nombre: string;
    descripcion: string;
    historia:string;
    coordenadasUbicacion:Array<Number>;
    periodoActualizacion:number;
    ultimaActualizacion: Date;
    jsonToClass = new JsonToClass;

    constructor(nombre: string, descripcion: string,historia:string, coordenadasUbicacion:Array<Number>, periodoActualizacion:number, ultimaActualizacion:Date) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.historia = historia;
        this.coordenadasUbicacion= coordenadasUbicacion;
        this.periodoActualizacion= periodoActualizacion;
        this.ultimaActualizacion= ultimaActualizacion;
    }  

    sosActualizable(fechaActual: Date) {
        const diferenciaMilisegundos = fechaActual.getTime() - this.ultimaActualizacion.getTime();
        const mesesDesdeUltimaActualizacion = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 30);
        
        return (mesesDesdeUltimaActualizacion >= this.periodoActualizacion);
    }

    get getNombre(): string {
        return this.nombre;
    }

    get getDescripcion(): string {
        return this.descripcion;
    }

    get getCoordenadas(): Array<Number> {
        return this.coordenadasUbicacion;
    }

    actualizarVinos(vinosAActualizar: Vino[], vinosActualizados: Vino[], vinosACrear: Vino[]) {
        vinosAActualizar.forEach(vinoActualizado => {
            let vinoEncontrado = (this.jsonToClass.jsonToVino(vinos)).find(vino => vino.sosVinoActualizar(vinoActualizado.nombre));
            if (vinoEncontrado) {
                console.log("vino encontrado", vinoEncontrado);
                vinoEncontrado.setPrecio = vinoActualizado.precioARS;
                vinoEncontrado.setNotaCata = vinoActualizado.notaDeCataBodega;
                vinoEncontrado.setImagenEtiqueta = vinoActualizado.imagenEtiqueta;
                vinoEncontrado.setFechaActualizacion = new Date();
                vinosActualizados.push(vinoEncontrado); // Agregar el vino actualizado al arreglo
            } else {
                vinosACrear.push(vinoActualizado); // Agregar el vino a crear al arreglo
            }
        });
    }

    //cambiar despues el any por el tipo de valor de la var
    set setFechaUltimaActualizacion(fecha: Date){
        this.ultimaActualizacion = fecha;
    }
}

// FALTA METODO sosActualizable()
//FALTA METODO setFechaActualizacion()
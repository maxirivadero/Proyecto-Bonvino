import { Vino } from "./Vino";
import { JsonToClass } from "./JsonToClass";

export class Bodega {
    nombre: string;
    descripcion: string;
    historia:string;
    coordenadasUbicacion:Array<Number>;
    periodoActualizacion:number;
    ultimaActualizacion: Date;
    vinos: Array<Vino>;
    jsonToClass = new JsonToClass;

    constructor(nombre: string, descripcion: string,historia:string, coordenadasUbicacion:Array<Number>, periodoActualizacion:number, ultimaActualizacion:Date, vinos: Array<Vino>) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.historia = historia;
        this.coordenadasUbicacion= coordenadasUbicacion;
        this.periodoActualizacion= periodoActualizacion;
        this.ultimaActualizacion= ultimaActualizacion;
        this.vinos = vinos;
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
            let vinoEncontrado = this.vinos.find(vino => vino.sosVinoActualizar(vinoActualizado.nombre));
            if (vinoEncontrado) {
                vinoEncontrado.setPrecio = vinoActualizado.precioARS;
                vinoEncontrado.setNotaCata = vinoActualizado.notaDeCataBodega;
                vinoEncontrado.setImagenEtiqueta = vinoActualizado.imagenEtiqueta;
                vinoEncontrado.setFechaActualizacion = new Date();
                vinosActualizados.push(vinoEncontrado);
            } else {
                vinosACrear.push(vinoActualizado); 
            }
        });
    }

    set setFechaUltimaActualizacion(fecha: Date){
        this.ultimaActualizacion = fecha;
    }
}

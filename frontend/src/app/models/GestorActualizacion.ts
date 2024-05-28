import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { TipoUva } from "./TipoUva";
import { Vino } from "./Vino";
import bodegas from "../../assets/json/bodegas";

export class GestorActualizacion {
    fechaActual: Date;//chequear si se hace asi y con todos los undefined
    bodegasActualizables:Array<Bodega>;//chequear si se hace asi
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;


    constructor() {
        this.fechaActual = new Date();
        this.bodegasActualizables = [];
        this.maridajes = [];
        this.tipoUvas = [];
    }
    getFechaActual() {
        this.fechaActual = new Date();
    };
    importarActualizacionDeVinos() {
        
    };
    buscarBodegasActualizables() {
        for (const bodegaJson of bodegas) {
            // Crear una instancia de Bodega a partir de cada objeto JSON
            const bodega = new Bodega(
                bodegaJson.nombre,
                bodegaJson.descripcion,
                bodegaJson.historia,
                bodegaJson.coordenadasUbicacion,
                bodegaJson.periodoActualizacion,
                new Date(bodegaJson.ultimaActualizacion)
            );
            console.log(bodega);

            // Verificar si la bodega es actualizable
            bodega.sosActualizable(this.fechaActual);

            // Si es actualizable, agregarla al arreglo bodegasActualizables
            if (bodega.sosActualizable(this.fechaActual)) {
                this.bodegasActualizables.push(bodega);
            }
        }
    }
    tomarSeleccionBodega() {
    };
    obtenerActualizacionVino() {
    };
    crearVino() {
        
    };
    buscarMaridaje() {
        
    };
    
    buscarTipoUva() {
        
    };
    notificarSubscripciones() {
        
    };
    finCU() {
        
    };
}
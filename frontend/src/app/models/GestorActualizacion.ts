import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { TipoUva } from "./TipoUva";
import { Vino } from "./Vino";
import * as fs from 'fs';

export class GestorActualizacion {
    fechaActual: Date | undefined;//chequear si se hace asi y con todos los undefined
    bodegasActualizables:Array<Bodega> | undefined;//chequear si se hace asi
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje> | undefined;
    tipoUvas:Array<TipoUva> | undefined;

    constructor(){
    }
    getFechaActual() {
        this.fechaActual = new Date();
    };
    importarActualizacionDeVinos() {
        
    };
    buscarBodegasActualizables() {
        
    };
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
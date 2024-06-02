
import enofilos from "src/assets/json/enofilos.json";
import bodegas from "../../assets/json/bodegas.json";
import { Bodega } from "./Bodega";
import { Enofilo } from "./Enofilo";
import { InterfazNotificacionPush } from "./InterfazNotificacionPush";
import { JsonToClass } from "./JsonToClass";
import { Maridaje } from "./Maridaje";
import { Siguiendo } from "./Siguiendo";
import { SistemaDeBodega } from "./SistemaDeBodega";
import { TipoUva } from "./TipoUva";
import { Usuario } from "./Usuario";
import { Vino } from "./Vino";

export class GestorActualizacion {
    fechaActual: Date;//chequear si se hace asi y con todos los undefined
    bodegasActualizables:Array<any>;//chequear si se hace asi
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;
    enofilosSubscriptos:Array<string>;
    interfaz = InterfazNotificacionPush;
    sistemaDeBodega = new SistemaDeBodega();
    vinosActualizar: Vino[] = [];
    jsonToClass = new JsonToClass;

    vinosActualizados: Vino[] = [];

    constructor() {
        this.fechaActual = new Date();
        this.bodegasActualizables = [];
        this.maridajes = [];
        this.tipoUvas = [];
        this.enofilosSubscriptos = [];
        this.vinosActualizar = [];
    }
    get getFechaActual() {
        return this.fechaActual;
    };
    importarActualizacionDeVinos() {
        this.bodegasActualizables = this.buscarBodegasActualizables();
    };
    buscarBodegasActualizables() {
        let fecha = this.getFechaActual;
        let bodegasActualizables = [];
        for (const bodega of (this.jsonToClass.jsonToBodega(bodegas))) {
            if (bodega.sosActualizable(fecha)) {

                bodegasActualizables.push([bodega.getNombre, bodega.getDescripcion, bodega.getCoordenadas]);

            }
        }
        return bodegasActualizables;
    }
    tomarSeleccionBodega(bodegaNombre: string) {
        this.bodegaSeleccionada = this.jsonToClass.jsonToBodega(bodegas).find(b => b.getNombre === bodegaNombre);
        this.obtenerActualizacionVino();
    }
    obtenerActualizacionVino() {
        this.vinosActualizar = this.sistemaDeBodega.obtenerNovedadesDeVinos();
        console.log("VINOS OBTACTVIN",this.vinosActualizar);
        console.log("AAA BODEGA SEC",this.bodegaSeleccionada);
        if (this.bodegaSeleccionada?.actualizarVinos(this.vinosActualizar)) {
            this.vinosActualizados = this.bodegaSeleccionada.actualizarVinos(this.vinosActualizar);
            this.bodegaSeleccionada.setFechaUltimaActualizacion = this.fechaActual;
            
            this.notificarSubscripciones(this.bodegaSeleccionada);
        }
    };
    crearVino() {
        
    };
    buscarMaridaje() {
        
    };
    
    buscarTipoUva() {
        
    };
    notificarSubscripciones(bodega: Bodega) {
        
        for (const enofiloJson of (this.jsonToClass.jsonToEnofilo(enofilos))) {
    
            // Verificar si el enófilo está suscrito a la bodega y agregarlo a la lista de bodegas actualizables
            if (enofiloJson.estasSuscriptoABodega(bodega.getNombre)) {
                this.enofilosSubscriptos.push(enofiloJson.obtenerNombreUsuario());
            }
        }
        const interfazNotificacion = new InterfazNotificacionPush();
        interfazNotificacion.actualizarNovedadBodega(this.enofilosSubscriptos);

        this.finCU();
    };
    
    finCU() {
        console.log("Fin caso de uso")
    };
}
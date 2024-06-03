
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
import maridajes from "../../assets/json/maridajes"
import { compileNgModule } from "@angular/compiler";

export class GestorActualizacion {
    fechaActual: Date;//chequear si se hace asi y con todos los undefined
    bodegasActualizables:Array<any>;//chequear si se hace asi
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;
    interfaz = InterfazNotificacionPush;
    sistemaDeBodega = new SistemaDeBodega();
    jsonToClass = new JsonToClass;

    vinosActualizar: Vino[] = [];
    vinosActualizados: Vino[] = [];
    vinosACrear: Vino[] = [];

    //constructor segun ChatGPT
    constructor() {
        this.fechaActual = new Date();
        this.bodegasActualizables = [];
        this.bodegaSeleccionada = undefined;
        this.maridajes = [];
        this.tipoUvas = [];
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
        if (this.bodegaSeleccionada !== undefined) {
            this.bodegaSeleccionada.actualizarVinos(this.vinosActualizar, this.vinosActualizados, this.vinosACrear);

            if (this.vinosACrear) {
                //console.log("se esta creando")
                this.crearVino(this.vinosACrear)
            }

            //Set fecha ultima actualizacion
            this.bodegaSeleccionada.setFechaUltimaActualizacion = this.fechaActual;
            this.notificarSubscripciones(this.bodegaSeleccionada);
        }
    };
    crearVino(vinosACrear: Vino[]) {
        let maridajesVino = this.buscarMaridaje(vinosACrear)
        let tiposUvaVino = this.buscarTipoUva(vinosACrear)
        vinosACrear.forEach((vino) => {
            //console.log("aaaaaaaaaaaaa")
            const vinoNuevo = new Vino(
                vino.imagenEtiqueta,
                vino.nombre,
                vino.notaDeCataBodega,
                vino.precioARS,
                vino.varietal,
                maridajesVino,
                vino.bodega,
                vino.fechaActualizacion
            )
        })
    };
    buscarMaridaje(vinosACrear: Vino[]) {
        let maridajesVino: Maridaje[] = []
        vinosACrear.forEach(vino => {
            vino.maridaje.forEach(vinoMaridaje => {
                //verificar el parametro q se pasa
                if (vinoMaridaje.sosMaridaje(maridajes[2])) {
                    maridajesVino.push(vinoMaridaje)
                    //console.log(`Maridaje encontrado para el vino: ${vino.nombre} con el maridaje: ${vinoMaridaje.nombre}`);
                }
            });
        });
        console.log(maridajesVino)
        return maridajesVino
    }
    
    buscarTipoUva(vinosACrear: Vino[]) {
        
    };
    notificarSubscripciones(bodega: Bodega) {
        let enofilosSubscriptos = []
        for (const enofiloJson of (this.jsonToClass.jsonToEnofilo(enofilos))) {
    
            // Verificar si el enófilo está suscrito a la bodega y agregarlo a la lista de bodegas actualizables
            if (enofiloJson.estasSuscriptoABodega(bodega.getNombre)) {
                enofilosSubscriptos.push(enofiloJson.obtenerNombreUsuario());
            }
        }
        const interfazNotificacion = new InterfazNotificacionPush();
        interfazNotificacion.actualizarNovedadBodega(enofilosSubscriptos);

        this.finCU();
    };
    
    finCU() {
        console.log("Fin caso de uso")
    };
}

import { VariableBinding } from "@angular/compiler";
import enofilos from "src/assets/json/enofilos.json";
import bodegas from "../../assets/json/bodegas.json";
import maridajes from "../../assets/json/maridajes.json";
import vinos from "../../assets/json/vinos.json";
import { Bodega } from "./Bodega";
import { Enofilo } from "./Enofilo";
import { InterfazNotificacionPush } from "./InterfazNotificacionPush";
import { JsonToClass } from "./JsonToClass";
import { Maridaje } from "./Maridaje";
import { Siguiendo } from "./Siguiendo";
import { SistemaDeBodega } from "./SistemaDeBodega";
import { TipoUva } from "./TipoUva";
import { Usuario } from "./Usuario";
import { Varietal } from "./Varietal";
import { Vino } from "./Vino";

export class GestorActualizacion {
    fechaActual: Date;
    bodegasActualizables:Array<any>;
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;
    interfaz = InterfazNotificacionPush;
    sistemaDeBodega = new SistemaDeBodega();
    jsonToClass = new JsonToClass;

    vinosActualizar: Vino[] = [];
    vinosActualizados: Vino[] = [];
    vinosACrear: Vino[] = [];

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
    tomarSeleccionBodega(bodegaNombre: string): Promise<void> {
        this.bodegaSeleccionada = this.jsonToClass.jsonToBodega(bodegas).find(b => b.getNombre === bodegaNombre);
        return this.obtenerActualizacionVino();
    }
    
    obtenerActualizacionVino(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.sistemaDeBodega.simularErrorServidor()
                .then(vinosActualizar => {
                    this.vinosActualizar = vinosActualizar;
                    if (this.bodegaSeleccionada !== undefined) {
                        this.bodegaSeleccionada.vinos.forEach(element => {
                            console.log("VINOS ANTES",element)
                        });
    
                        this.bodegaSeleccionada.actualizarVinos(this.vinosActualizar, this.vinosActualizados, this.vinosACrear);
    
                        if (this.vinosACrear) {
                            this.crearVino(this.vinosACrear);
                        }
    
                        this.bodegaSeleccionada.vinos.forEach(element => {
                            console.log("VINOS DESPUES",element)
                        });
    
                        this.bodegaSeleccionada.setFechaUltimaActualizacion = this.fechaActual;
                    };
                    resolve();
                })
                .catch(error => {
                    console.error('El sistema de bodegas falló', error);
                    window.alert('El sistema de bodegas fallo');
                    reject(error);
                });
        });
    }
    crearVino(vinosACrear: Vino[]) {
        let maridajesVino = this.buscarMaridaje(vinosACrear);
        let tiposUvaVino = this.buscarTipoUva(vinosACrear);
        let contador = 0;

        vinosACrear.forEach((vino) => {
            
            
            let vinoNuevo = new Vino(
                vino.anada,
                vino.imagenEtiqueta,
                vino.nombre,
                vino.notaDeCataBodega,
                vino.precioARS,
                vino.crearVarietal(tiposUvaVino[contador]),
                maridajesVino[contador],
                vino.bodega,
                vino.fechaActualizacion
            )

            
            contador ++;
            this.bodegaSeleccionada?.vinos.push(vinoNuevo);

        });
    };
    buscarMaridaje(vinosACrear: Vino[]) {
        let listaMaridajes: Array<Maridaje[]> = [];
        vinosACrear.forEach(vino => {
            let maridajesVino: Maridaje[] = [];
            vino.maridaje.forEach(vinoMaridaje => {
                if (vinoMaridaje.sosMaridaje()) {
                    maridajesVino.push(vinoMaridaje)
                }
            });
            listaMaridajes.push(maridajesVino);
            maridajesVino = [];
        });
        return listaMaridajes;
    }
    
    buscarTipoUva(vinosACrear: Vino[]) {
        let listaTiposUvas: Array<TipoUva[]> = [];
        vinosACrear.forEach(vino => {
            let tiposUvas: TipoUva[] = [];

            
            vino.varietal.forEach(unVarietal => {
                if (unVarietal.tipoUva.sosTipoUva()) {
                    tiposUvas.push(unVarietal.tipoUva)
                }
            });
            
            listaTiposUvas.push(tiposUvas);
        });
        return listaTiposUvas;
    };
    notificarSubscripciones() {
        let enofilosSubscriptos = []
        for (const enofiloJson of (this.jsonToClass.jsonToEnofilo(enofilos))) {
    
            if (this.bodegaSeleccionada && enofiloJson.estasSuscriptoABodega(this.bodegaSeleccionada.getNombre)) {
                enofilosSubscriptos.push(enofiloJson.obtenerNombreUsuario());
            }
        }
        const interfazNotificacion = new InterfazNotificacionPush();
        interfazNotificacion.actualizarNovedadBodega(enofilosSubscriptos);
        window.alert("Se mando una notificacion a los Enofilos Subscriptos");

        this.finCU();
    };
    
    
    finCU() {
        console.log("Fin caso de uso")
    };
}
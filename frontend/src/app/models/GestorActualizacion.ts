import enofilos from "src/assets/json/enofilos.json";
import bodegas from "../../assets/json/bodegas.json";
import { Bodega } from "./Bodega";
import { InterfazNotificacionPush } from "./InterfazNotificacionPush";
import { JsonToClass } from "./JsonToClass";
import { Maridaje } from "./Maridaje";
import { SistemaDeBodega } from "./SistemaDeBodega";
import { TipoUva } from "./TipoUva";

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

    arraySimDBAVinos: Vino[] = [];
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
    tomarSeleccionBodega(bodegaNombre: string) {
        this.bodegaSeleccionada = this.jsonToClass.jsonToBodega(bodegas).find(b => b.getNombre === bodegaNombre);
        if (this.bodegaSeleccionada) {
            this.arraySimDBAVinos = this.sistemaDeBodega.obtenerVinosBodega(this.bodegaSeleccionada?.nombre);
            this.obtenerActualizacionVino();
        }
    }
    obtenerActualizacionVino() {

        if (this.bodegaSeleccionada !== undefined) {
            let vinosActualizar:Vino[] = [];
            vinosActualizar = this.sistemaDeBodega.obtenerNovedadesDeVinos(this.bodegaSeleccionada.nombre);

            //vinosActualizar.forEach(element => {
            //    console.log("AAAAAAA",element)
            //});

            this.bodegaSeleccionada.actualizarVinos(vinosActualizar, this.vinosActualizados, this.vinosACrear);
            
            if (this.vinosACrear) {
                this.crearVino(this.vinosACrear);
            }

            this.bodegaSeleccionada.setFechaUltimaActualizacion = this.fechaActual;
        }
    };
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

            vino.varietal = vino.crearVarietal(tiposUvaVino[contador]);
            vino.maridaje = maridajesVino[contador];
            
            contador ++;
            this.arraySimDBAVinos.push(vinoNuevo);

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
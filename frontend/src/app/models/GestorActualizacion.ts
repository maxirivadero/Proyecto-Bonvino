
import enofilos from "src/assets/json/enofilos.json";
import bodegas from "../../assets/json/bodegas.json";
import maridajes from "../../assets/json/maridajes.json";
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
import vinos from "../../assets/json/vinos.json";
import { VariableBinding } from "@angular/compiler";
import { Varietal } from "./Varietal";

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

    //representa la base de datos de los vinos que hay
    vinosDeLaBodega = this.jsonToClass.jsonToVino(vinos);

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
            //console.log("vinosDeLaBodega antes del if",this.vinosDeLaBodega);
            if (this.vinosACrear) {
                console.log("HAY UN VINO PARA CREAR, BASE DE DATOS ANTES",this.vinosDeLaBodega);
                this.crearVino(this.vinosACrear);
                console.log("ASI QUEDA DESPUES DE AGREGAR EL VINO",this.vinosDeLaBodega);
            }

            //Set fecha ultima actualizacion
            this.bodegaSeleccionada.setFechaUltimaActualizacion = this.fechaActual;
            this.notificarSubscripciones(this.bodegaSeleccionada);
        }
    };
    crearVino(vinosACrear: Vino[]) {
        //console.log("vinosACrear: ", vinosACrear)
        let maridajesVino = this.buscarMaridaje(vinosACrear);
        let tiposUvaVino = this.buscarTipoUva(vinosACrear);
        let contador = 0;

        vinosACrear.forEach((vino) => {
            //se crea un solo varietal pq el array tiposUvaVino siempre va a tener un elemento
            let varietalNuevo: Array <Varietal> = vino.crearVarietal(tiposUvaVino[contador])
            let vinoNuevo = new Vino(
                vino.imagenEtiqueta,
                vino.nombre,
                vino.notaDeCataBodega,
                vino.precioARS,
                varietalNuevo,
                maridajesVino[contador],
                vino.bodega,
                vino.fechaActualizacion
            )
            contador ++;
            console.log("POR AGREGAR EL VINO", vinoNuevo)
            this.vinosDeLaBodega.push(vinoNuevo);
            console.log("SE CREO Y AGREGO EL VINO")

        })
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
        console.log(listaMaridajes)
        return listaMaridajes
    }
    
    buscarTipoUva(vinosACrear: Vino[]) {
        let listaTiposUvas: Array<TipoUva[]> = [];
        vinosACrear.forEach(vino => {
            let tiposUvas: TipoUva[] = [];
            vino.varietal.forEach(unVarietal => {
                //console.log("unVarietal: ", unVarietal)
                //console.log("unVarietal.tipoUva: ",unVarietal.tipoUva)
                if (unVarietal.tipoUva.sosTipoUva()) {
                    tiposUvas.push(unVarietal.tipoUva)
                }
            });
            listaTiposUvas.push(tiposUvas);
            tiposUvas = [];
        });
        //console.log("lista uvas: ",listaTiposUvas)
        return listaTiposUvas
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
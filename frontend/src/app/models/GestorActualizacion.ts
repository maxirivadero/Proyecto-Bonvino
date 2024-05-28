import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { TipoUva } from "./TipoUva";
import { Vino } from "./Vino";
import bodegas from "../../assets/json/bodegas";
import enofilos from "src/assets/json/enofilos";
import { Enofilo } from "./Enofilo";
import { Siguiendo } from "./Siguiendo";
import { Usuario } from "./Usuario";
import { InterfazNotificacionPush } from "./InterfazNotificacionPush";
import { SistemaDeBodega } from "./SistemaDeBodega";

export class GestorActualizacion {
    fechaActual: Date;//chequear si se hace asi y con todos los undefined
    bodegasActualizables:Array<Bodega>;//chequear si se hace asi
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;
    enofilosSubscriptos:Array<string>;
    interfaz = InterfazNotificacionPush;
    sistemaDeBodega = new SistemaDeBodega();
    vinosActualizar: Vino[] = [];

    vinosActualizados: Vino[] = [];

    constructor() {
        this.fechaActual = new Date();
        this.bodegasActualizables = [];
        this.maridajes = [];
        this.tipoUvas = [];
        this.enofilosSubscriptos = [];
        this.vinosActualizar = [];
    }
    getFechaActual() {
        this.fechaActual = new Date();
    };
    importarActualizacionDeVinos() {
        this.buscarBodegasActualizables();

    };
    buscarBodegasActualizables() {
        for (const bodegaJson of bodegas) {
            
            const bodega = new Bodega(
                bodegaJson.nombre,
                bodegaJson.descripcion,
                bodegaJson.historia,
                bodegaJson.coordenadasUbicacion,
                bodegaJson.periodoActualizacion,
                new Date(bodegaJson.ultimaActualizacion)
            );

            if (bodega.sosActualizable(this.fechaActual)) {
                this.bodegasActualizables.push(bodega);
            }
        }
    }
    tomarSeleccionBodega(bodega: Bodega) {
        this.bodegaSeleccionada = bodega;
        this.obtenerActualizacionVino();
    };
    obtenerActualizacionVino() {
        this.vinosActualizar = this.sistemaDeBodega.obtenerNovedadesDeVinos();
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
        for (const enofiloJson of enofilos) {
            // Mapear los objetos siguiendo a instancias de la clase Siguiendo
            const siguiendoArray = enofiloJson.siguiendo.map((siguiendoItem: any) => {
                return new Siguiendo(
                    new Date(siguiendoItem.fechaInicio),
                    new Date(siguiendoItem.fechaFin),
                    siguiendoItem.bodega,
                    siguiendoItem.enofilo
                );
            });
            // Crear una instancia de Usuario a partir del objeto JSON
            const usuario = new Usuario(
                enofiloJson.usuario.contraseña,
                enofiloJson.usuario.nombre,
                enofiloJson.usuario.premium
            );
    
            // Crear una instancia de Enofilo con los datos obtenidos
            const enofilo = new Enofilo(
                enofiloJson.contraseña,
                enofiloJson.imagenEtiqueta,
                enofiloJson.nombre,
                siguiendoArray,
                usuario
            );
    
            // Verificar si el enófilo está suscrito a la bodega y agregarlo a la lista de bodegas actualizables
            if (enofilo.estasSuscriptoABodega(bodega.getNombre)) {
                this.enofilosSubscriptos.push(enofilo.obtenerNombreUsuario());
            }
        }
        const interfazNotificacion = new InterfazNotificacionPush();
        interfazNotificacion.actualizarNovedadBodega(this.enofilosSubscriptos);
    };
    
    finCU() {
        
    };
}
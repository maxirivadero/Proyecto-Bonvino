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
    bodegasSeleccionada:Array<Bodega> = [];
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;
    sistemaDeBodega = new SistemaDeBodega();
    jsonToClass = new JsonToClass;

    vinosActualizados: Array<Vino[]> = [];
    vinosACrear: Array<Vino[]> = [];

    //Para simular la base de datos antes y despues
    arrayDBAVinosAntes: Array<Vino[]> = [];
    arraySimDBAVinos: Array<Vino[]> = [];


    constructor() {
        this.fechaActual = new Date();
        this.bodegasActualizables = [];
        this.bodegasSeleccionada = [];
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
    tomarSeleccionBodega(nombresBodega: Array<string>) {
        let bodegasDisponibles = this.jsonToClass.jsonToBodega(bodegas);
        for (let nombreBodega of nombresBodega) {
            let bodegaEncontrada = bodegasDisponibles.find(b => b.getNombre === nombreBodega);
            //this.bodegasSeleccionada.push(bodegaEncontrada);
            if (bodegaEncontrada) {
                this.bodegasSeleccionada.push(bodegaEncontrada);
            }
        }
        this.obtenerActualizacionVino();
        
    }
    obtenerActualizacionVino() {
        for (const bodega of this.bodegasSeleccionada) {
            let vinosActualizar: Vino[] = [];
            let vinosBodegaActualizados: Vino[] = [];
            let vinosBodegaCreados: Vino[] = [];
//
            //console.log( [this.sistemaDeBodega.obtenerVinosBodega(bodega.nombre)]);
            //this.sistemaDeBodega.obtenerVinosBodega(bodega.nombre).forEach(element => {
            //    console.log("AAAAAAA",element)
            //});
            this.arrayDBAVinosAntes.push(this.sistemaDeBodega.obtenerVinosBodega(bodega.nombre));

            vinosActualizar = this.sistemaDeBodega.obtenerNovedadesDeVinos(bodega.nombre);

            bodega.actualizarVinos(vinosActualizar, vinosBodegaActualizados, vinosBodegaCreados);

            if (vinosBodegaCreados.length > 0) {
                this.crearVino(vinosBodegaCreados);
            }
            this.vinosActualizados.push(vinosBodegaActualizados);
            this.vinosACrear.push(vinosBodegaCreados);

            this.vinosActualizados.forEach(element => {
                console.log("AAAAAAA",element)
            });
            //Simulamos como quedaria la base de datos nueva luego de actualizar y crear
            let simBDAVinosNueva = vinosBodegaActualizados;
            vinosBodegaCreados.forEach(element => {
                simBDAVinosNueva.push(element)
            });
            this.arraySimDBAVinos.push(simBDAVinosNueva);

            //seteamos la fecha de actualizacion de la bodega
            bodega.setFechaUltimaActualizacion = this.fechaActual;
        }


        this.arrayDBAVinosAntes.forEach(element => {
            console.log("eeeeee",element)
        });
        this.arraySimDBAVinos.forEach(element => {
            console.log("ddddd",element)
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

            vino.varietal = vino.crearVarietal(tiposUvaVino[contador]);
            vino.maridaje = maridajesVino[contador];
            
            contador ++;
            //this.arraySimDBAVinos.push(vinoNuevo);

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
        // Recorre cada bodega seleccionada
        this.bodegasSeleccionada.forEach(bodega => {
            // Obtiene los enófilos suscritos a esta bodega
            let enofilosSubscriptos = [];
            for (const enofiloJson of this.jsonToClass.jsonToEnofilo(enofilos)) {
                if (enofiloJson.estasSuscriptoABodega(bodega.getNombre)) {
                    enofilosSubscriptos.push(enofiloJson.obtenerNombreUsuario());
                }
            }
            // Si hay enófilos suscritos, envía la notificación
            if (enofilosSubscriptos.length > 0) {
                let notificationTitle = `Nueva novedad en la bodega ${bodega.getNombre}`;
                let notificationOptions = {
                    body: `Se ha publicado una nueva novedad en la bodega ${bodega.getNombre}`,
                    icon: '../../assets/svg/hojas.svg' // Ruta a una imagen para el ícono de la notificación
                };
    
                // Verificar si el navegador soporta notificaciones
                if ('Notification' in window) {
                    // Verificar si las notificaciones están permitidas
                    if (Notification.permission === 'granted') {
                        // Mostrar la notificación
                        new Notification(notificationTitle, notificationOptions);
                    } else if (Notification.permission !== 'denied') {
                        // Solicitar permiso al usuario para mostrar notificaciones
                        Notification.requestPermission().then(permission => {
                            if (permission === 'granted') {
                                // Mostrar la notificación
                                new Notification(notificationTitle, notificationOptions);
                            }
                        });
                    }
                }
    
                // Actualizar la interfaz con la notificación
                let interfazNotificacion = new InterfazNotificacionPush();
                interfazNotificacion.actualizarNovedadBodega(enofilosSubscriptos, bodega.getNombre);
            }
        });
        this.finCU();
    }
    
    finCU() {
        console.log("Fin caso de uso")
    };
}
import enofilos from "src/assets/json/enofilos.json";
import bodegas from "../../assets/json/bodegas.json";
import { Bodega } from "./Bodega";
import { InterfazNotificacionPush } from "./InterfazNotificacionPush";
import { JsonToClass } from "./JsonToClass";
import { Maridaje } from "./Maridaje";
import { SistemaDeBodega } from "./SistemaDeBodega";
import { TipoUva } from "./TipoUva";

import { Vino } from "./Vino";
import { ISujeto } from "./ISujeto";
import { IObservador } from "./IObservador";

export class GestorActualizacion implements ISujeto {
    fechaActual: Date;
    bodegasActualizables:Array<any>;
    bodegasSeleccionada:Array<Bodega> = [];
    maridajes:Array<Maridaje>;
    tipoUvas:Array<TipoUva>;
    sistemaDeBodega = new SistemaDeBodega();
    enofilosSubscriptos: IObservador[] = [];
    jsonToClass = new JsonToClass;

    //Para simular la base de datos antes y despues
    arrayVinosMostrar: Array<Vino[]> = [];


    constructor() {
        this.fechaActual = new Date();
        this.bodegasActualizables = [];
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
            if (bodegaEncontrada) {
                this.bodegasSeleccionada.push(bodegaEncontrada);
            }
        }
        this.obtenerActualizacionVino();
        // this.notificarSubscripciones();
        this.conocerSuscripciones();
    }
    obtenerActualizacionVino() {
        for (const bodega of this.bodegasSeleccionada) {
            let vinosActualizar: Vino[] = [];
            let vinosBodegaActualizados: Vino[] = [];
            let vinosBodegaACrear: Vino[] = [];

            vinosActualizar = this.sistemaDeBodega.obtenerNovedadesDeVinos(bodega.nombre);

            bodega.actualizarVinos(vinosActualizar, vinosBodegaActualizados, vinosBodegaACrear);
            let simBDAVinosNueva = vinosBodegaActualizados;

            if (vinosBodegaACrear.length > 0) {
                this.crearVino(vinosBodegaACrear, simBDAVinosNueva);
            }

            this.arrayVinosMostrar.push(simBDAVinosNueva);

            //seteamos la fecha de actualizacion de la bodega
            bodega.setFechaUltimaActualizacion = this.fechaActual;
        }
        
    }
    crearVino(vinosACrear: Vino[], simBDA:Vino[]) {
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
            simBDA.push(vinoNuevo);

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

    conocerSuscripciones() {
        this.bodegasSeleccionada.forEach(bodega => {
            // Obtiene los enófilos suscritos a esta bodega
            this.enofilosSubscriptos = [];
            for (const enofiloJson of this.jsonToClass.jsonToEnofilo(enofilos)) {
                if (enofiloJson.estasSuscriptoABodega(bodega.getNombre)) {
                    this.suscribir(enofiloJson);
                }
            }

            this.notificar(bodega)

            // Se le hace saber al Usuario Cu que se envio notificaciones por x
            let notificationTitle = `Nueva novedad en la bodega ${bodega.nombre}`;
            let notificationOptions = {
                body: `Se ha publicado una nueva novedad en la bodega ${bodega.nombre}`,
                icon: '../../assets/svg/hojas.svg'
            };

            // Notificacion usuario del CU
            if ('Notification' in window) {
                // Verificar si las notificaciones están permitidas
                if (Notification.permission !== 'denied') {
                    // Solicitar permiso al usuario para mostrar notificaciones
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            // Mostrar la notificación
                            new Notification(notificationTitle, notificationOptions); 
                        }
                    });
                }
            }
        })

        this.finCU();
    }

    suscribir(observador: IObservador): void {
        this.enofilosSubscriptos.push(observador);
    }

    quitar(observador: IObservador): void {
        this.enofilosSubscriptos = this.enofilosSubscriptos.filter(obs => obs !== observador);
    }    

    notificar(bodega: Bodega): void {
        if (this.enofilosSubscriptos.length > 0) {
            // Notificacion subscriptor
            this.enofilosSubscriptos.forEach(enofilo => {
                enofilo.actualizar(bodega.getNombre)
            })
        }
    }
    
    /*
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
                // Notificacion subscriptor
                let interfazNotificacion = new InterfazNotificacionPush();
                interfazNotificacion.actualizarNovedadBodega(enofilosSubscriptos, bodega.getNombre);

                let notificationTitle = `Nueva novedad en la bodega ${bodega.getNombre}`;
                let notificationOptions = {
                    body: `Se ha publicado una nueva novedad en la bodega ${bodega.getNombre}`,
                    icon: '../../assets/svg/hojas.svg'
                };
    
                // Notificacion usuario del CU
                if ('Notification' in window) {
                    // Verificar si las notificaciones están permitidas
                    if (Notification.permission !== 'denied') {
                        // Solicitar permiso al usuario para mostrar notificaciones
                        Notification.requestPermission().then(permission => {
                            if (permission === 'granted') {
                                // Mostrar la notificación
                                new Notification(notificationTitle, notificationOptions);
                            }
                        });
                    }
                }
    
            }
        });
        this.finCU();
    }
    */

    finCU() {
        console.log("Fin caso de uso")
    };
}
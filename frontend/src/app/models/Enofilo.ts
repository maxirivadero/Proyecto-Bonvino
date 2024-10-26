import { InterfazNotificacionPush } from "./InterfazNotificacionPush";
import { IObservador } from "./IObservador";
import { Siguiendo } from "./Siguiendo";
import { Usuario } from "./Usuario";


export class Enofilo implements IObservador {
    apellido: string;
    imagenPerfil: string;
    nombre: string;
    siguiendo:Array<Siguiendo>;
    usuario:Usuario;

    constructor(apellido: string, imagenPerfil: string, nombre: string, siguiendo:Array<Siguiendo>, usuario:Usuario) {
        this.apellido = apellido;
        this.imagenPerfil = imagenPerfil;
        this.nombre = nombre;
        this.siguiendo = siguiendo;
        this.usuario = usuario;
    }

    estasSuscriptoABodega(nombreBodega: string): boolean {
        return this.siguiendo.filter(suscripcion => suscripcion.sosDeBodega(nombreBodega)).some(suscripcion => true);
    }

    obtenerNombreUsuario(): string {
        return this.usuario.getNombre;
    }

    actualizar(nombreBodega: string): void {
        const interfazNotificacion = new InterfazNotificacionPush();
        interfazNotificacion.enviarNotificacion(nombreBodega)
    }

}
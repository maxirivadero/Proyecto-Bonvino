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
    // No estoy seguro si crear la interfaz aca o en el metodo actualizar :$
    interfazNotificacion = new InterfazNotificacionPush;

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

    obtenerNombreUsuario() {
        return this.usuario.getNombre;
    }

    actualizar(nombreBodega: string): void {
        this.interfazNotificacion.enviarNotificacion(nombreBodega)
    }

}
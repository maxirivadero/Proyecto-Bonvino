import { Siguiendo } from "./Siguiendo";
import { Usuario } from "./Usuario";
import { Vino } from "./Vino";

export class Enofilo {
    contraseña: string;
    imagenEtiqueta: string;
    nombre: string;
    siguiendo:Array<Siguiendo>;
    vinos:Array<Vino>;
    usuario:Usuario;

    constructor(contraseña: string, imagenEtiqueta: string, nombre: string, notaDeCataBodega: string, precioARS:number, siguiendo:Array<Siguiendo>,vinos:Array<Vino>, usuario:Usuario) {
        this.contraseña = contraseña;
        this.imagenEtiqueta = imagenEtiqueta;
        this.nombre = nombre;
        this.siguiendo = siguiendo;
        this.vinos = vinos;
        this.usuario = usuario;
    }

    estasSuscriptoABodega() {

    }

    obtenerNombreUsuario() {
        
    }

}
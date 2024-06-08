import usuarios from '../../assets/json/usuarios.json'; // Importar el array de usuarios
import { JsonToClass } from "./JsonToClass";

export class InterfazNotificacionPush {
    jsonToClass = new JsonToClass;
    
    actualizarNovedadBodega(arregloEnofilos: Array<string>, nombreBodega: string) {
        for (const nombreEnofilo of arregloEnofilos) {
            
            const usuario = (this.jsonToClass.jsonToUsuario(usuarios)).find(usuario => usuario.nombre === nombreEnofilo);
            
            // Si se encuentra el usuario, imprimir un mensaje en la consola
            if (usuario) {
                console.log(`Se mandó una notificación a ${nombreEnofilo} para la bodega ${nombreBodega}`);
            } else {
                console.log(`No se encontró un usuario con el nombre ${nombreEnofilo}`);
            }
        }
    }
}

import usuarios from '../../assets/json/usuarios.json'; // Importar el array de usuarios
import { JsonToClass } from "./JsonToClass";

export class InterfazNotificacionPush {
    jsonToClass = new JsonToClass;
    
    enviarNotificacion(nombreUsuario: string,nombreBodega: string) {
        const usuario = (this.jsonToClass.jsonToUsuario(usuarios)).find(usuario => usuario.nombre === nombreUsuario);
            
            if (usuario) {
                console.log(`Se mandó una notificación a ${nombreUsuario} para la bodega ${nombreBodega}`);
            } else {
                console.log(`No se encontró un usuario con el nombre ${nombreUsuario}`);
            }

        /*
        let notificationTitle = `Nueva novedad en la bodega ${nombreBodega}`;
        let notificationOptions = {
            body: `Se ha publicado una nueva novedad en la bodega ${nombreBodega}`,
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
            */
    }

    /* 
    actualizarNovedadBodega(arregloEnofilos: Array<string>, nombreBodega: string) {
        for (const nombreEnofilo of arregloEnofilos) {
            
            const usuario = (this.jsonToClass.jsonToUsuario(usuarios)).find(usuario => usuario.nombre === nombreEnofilo);
            
            if (usuario) {
                console.log(`Se mandó una notificación a ${nombreEnofilo} para la bodega ${nombreBodega}`);
            } else {
                console.log(`No se encontró un usuario con el nombre ${nombreEnofilo}`);
            }
        }
    }
    */
}

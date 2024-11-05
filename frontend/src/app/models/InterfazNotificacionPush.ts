import { IObservador } from './IObservador'

export class InterfazNotificacionPush implements IObservador {
    
    actualizar(nombreBodega: string, usuarios: string[]): void {
        this.enviarNotificacion(nombreBodega, usuarios)
    }

    enviarNotificacion(nombreBodega: string, usuarios: string[]): void {
        
        usuarios.forEach(usuario => {
            console.log(`Se envio una notificacion push a ${usuario}`)
        })
        
        let notificationTitle = `Nueva novedad en la bodega ${nombreBodega}`;
        let notificationOptions = {
            body: `Se ha publicado una nueva novedad en la bodega ${nombreBodega}`,
            icon: '../../assets/svg/hojas.svg'
        }

        // Notificacion usuario del CU
        if ('Notification' in window) {
            // Verificar si las notificaciones están permitidas
            if (Notification.permission !== 'denied') {
                // Solicitar permiso al usuario para mostrar notificaciones
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        // Mostrar la notificación
                        new Notification(notificationTitle, notificationOptions)
                    }
                })
            }
        }
    }
}

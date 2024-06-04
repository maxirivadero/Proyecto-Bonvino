import { Bodega } from "./Bodega";
import { Enofilo } from "./Enofilo";
import { Maridaje } from "./Maridaje";
import { Siguiendo } from "./Siguiendo";
import { TipoUva } from "./TipoUva";
import { Usuario } from "./Usuario";
import { Varietal } from "./Varietal";
import { Vino } from "./Vino";


export class JsonToClass {
    jsonToBodega(jsonBodegas: any): Array<Bodega> {
        let bodegas: Array<Bodega> = [];
        for (let key in jsonBodegas) {
            if (jsonBodegas.hasOwnProperty(key)) {
                let bodegaJson = jsonBodegas[key];
                let bodega = new Bodega(
                    bodegaJson.nombre,
                    bodegaJson.descripcion,
                    bodegaJson.historia,
                    bodegaJson.coordenadasUbicacion,
                    bodegaJson.periodoActualizacion,
                    new Date(bodegaJson.ultimaActualizacion),
                    this.jsonToVino(bodegaJson.vinos)
                );
                bodegas.push(bodega);
            }
        }
        return bodegas;
    }

    jsonToEnofilo(jsonEnofilos: any): Array<Enofilo> {
        let enofilos: Array<Enofilo> = [];
        for (let key in jsonEnofilos) {
            if (jsonEnofilos.hasOwnProperty(key)) {
                let enofiloJson = jsonEnofilos[key];

                // Crear array de instancias de Siguiendo
                let siguiendoArray = enofiloJson.siguiendo.map((siguiendoItem: any) => {
                    return new Siguiendo(
                        new Date(siguiendoItem.fechaInicio),
                        new Date(siguiendoItem.fechaFin),
                        siguiendoItem.bodega,
                        siguiendoItem.enofilo
                    );
                });

                // Crear una instancia de Usuario a partir del objeto JSON
                let usuario = new Usuario(
                    enofiloJson.usuario.contraseña,
                    enofiloJson.usuario.nombre,
                    enofiloJson.usuario.premium
                );

                // Crear una instancia de Enofilo con los datos obtenidos
                let enofilo = new Enofilo(
                    enofiloJson.apellido,
                    enofiloJson.imagenPerfil,
                    enofiloJson.nombre,
                    siguiendoArray,
                    usuario
                );
                enofilos.push(enofilo);
            }
        }
        return enofilos;
    }

    jsonToVino(jsonVinos: any): Array<Vino> {
        let vinos: Array<Vino> = [];
        for (let key in jsonVinos) {
            if (jsonVinos.hasOwnProperty(key)) {
                let vinoJson = jsonVinos[key];

                // Crear array de instancias de Siguiendo
                let varietalArray = vinoJson.varietal.map((varietalItem: any) => {
                    return new Varietal(
                        varietalItem.descripcion,
                        varietalItem.porcentajeComposicion,
                        new TipoUva(varietalItem.tipoUva.nombre, varietalItem.tipoUva.descripcion)
                    );
                });

                // Crear array de instancias de Siguiendo
                let maridajeArray = vinoJson.maridaje.map((maridajeItem: any) => {
                    return new Maridaje(
                        maridajeItem.nombre,
                        maridajeItem.descripcion
                    );
                });

                // Crear una instancia de Enofilo con los datos obtenidos
                const vino = new Vino(
                    vinoJson.añada,
                    vinoJson.imagenEtiqueta,
                    vinoJson.nombre,
                    vinoJson.notaDeCataBodega,
                    vinoJson.precioARS,
                    varietalArray,
                    maridajeArray,
                    vinoJson.bodega,
                    new Date(vinoJson.fechaActualizacion)
                );

                vinos.push(vino);
            }
        }
        return vinos;
    }

    jsonToUsuario(jsonUsuarios: any): Array<Usuario> {
        let usuarios: Array<Usuario> = [];
        for (let key in jsonUsuarios) {
            if (jsonUsuarios.hasOwnProperty(key)) {
                let usuarioJson = jsonUsuarios[key];
                let usuario = new Usuario(
                    usuarioJson.contraseña,
                    usuarioJson.nombre,
                    usuarioJson.premium
                );
                usuarios.push(usuario);
            }
        }
        return usuarios;
    }

    jsonToMaridaje(jsonMaridajes: any): Array<Maridaje> {
        let maridajes: Array<Maridaje> = [];
        for (let key in jsonMaridajes) {
            if (jsonMaridajes.hasOwnProperty(key)) {
                let maridajesJson = jsonMaridajes[key];
                let maridaje = new Maridaje(
                    maridajesJson.nombre,
                    maridajesJson.descripcion
                );
                maridajes.push(maridaje);
            }
        }
        return maridajes;
    }

    jsonToTipoUva(jsonTipoUva: any): Array<TipoUva> {
        let tiposUvas: Array<TipoUva> = [];
        for (let key in jsonTipoUva) {
            if (jsonTipoUva.hasOwnProperty(key)) {
                let tiposUvasJson = jsonTipoUva[key];
                let tipoUva = new TipoUva(
                    tiposUvasJson.nombre,
                    tiposUvasJson.descripcion
                );
                tiposUvas.push(tipoUva);
            }
        }
        return tiposUvas;
    }


}

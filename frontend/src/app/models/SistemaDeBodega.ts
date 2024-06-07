import { Vino } from "./Vino";
import { Varietal } from "./Varietal";
import { Maridaje } from "./Maridaje";
import { Bodega } from "./Bodega";
import { JsonToClass } from "./JsonToClass";
import vinosActualizar from "../../assets/json/vinosActualizar.json"; // Importa el arreglo de vinos

export class SistemaDeBodega {
    jsonToClass = new JsonToClass;
    // REVISAR ACA!!!
    // recibe como parametro la bodega seleccionada
    obtenerNovedadesDeVinos(): Vino[] {
        const vinos: Vino[] = [];

        (this.jsonToClass.jsonToVino(vinosActualizar)).forEach(vino => {
            vinos.push(vino);
        });

        return vinos;
    };
    simularErrorServidor(): Promise<any> {
        return new Promise((resolve, reject) => {
            // Asignar el objeto JSON de error a resultado
            let resultado = { error: true, message: 'El sistema de bodegas falló' };
            resolve(resultado);
        });
    }
}
import { Vino } from "./Vino";
import { JsonToClass } from "./JsonToClass";
import vinosActualizarLaViña from "../../assets/json/vinosActualizarLaViña.json"; // Importa el arreglo de vinos
import vinosActualizarElCastillo from "../../assets/json/vinosActualizarElCastillo.json"; // Importa el arreglo de vinos
import vinosActualizarLosRobles from "../../assets/json/vinosActualizarLosRobles.json"; // Importa el arreglo de vinos
import vinosLaViña from "../../assets/json/vinosLaViña.json";
import vinosElCastillo from "../../assets/json/vinosElCastillo.json";
import vinosLosRobles from "../../assets/json/vinosLosRobles.json";

export class SistemaDeBodega {
    jsonToClass = new JsonToClass;
    obtenerVinosBodega(nombreBodega: string): Vino[] {
        let vinosBodega: Vino[];
    
        switch (nombreBodega) {
            case "Bodega La Viña":
                vinosBodega = this.jsonToClass.jsonToVino(vinosLaViña);
                break;
            case "Bodega Los Robles":
                vinosBodega = this.jsonToClass.jsonToVino(vinosElCastillo);
                break;
            case "Bodega El Castillo":
                vinosBodega = this.jsonToClass.jsonToVino(vinosLosRobles);
                break;
            default:
                vinosBodega = [];
                break;
        }
    
        return vinosBodega;
    }
    obtenerNovedadesDeVinos(nombreBodega: string): Vino[] {
        let vinos: Vino[] = [];

        switch (nombreBodega) {
            case "Bodega La Viña":
                (this.jsonToClass.jsonToVino(vinosActualizarLaViña)).forEach(vino => {
                    vinos.push(vino);
                });
                break;
            case "Bodega Los Robles":
                (this.jsonToClass.jsonToVino(vinosActualizarLosRobles)).forEach(vino => {
                    vinos.push(vino);
                });
                break;
            case "Bodega El Castillo":
                (this.jsonToClass.jsonToVino(vinosActualizarElCastillo)).forEach(vino => {
                    vinos.push(vino);
                });
                break;
            default:
                vinos = [];
                break;
        }
        return vinos;
    }

    simularErrorServidor(): any {
        // Devolver un objeto JSON de error
        return { error: true, message: 'El sistema de bodegas falló000' };
    };
};

import maridajes from "../../assets/json/maridajes.json";
import { JsonToClass } from "./JsonToClass";

export class Maridaje {
    nombre: string;
    descripcion: string;
    jsonToClass = new JsonToClass;

    constructor(nombre: string, descripcion: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    sosMaridaje(): Boolean {
        let bandera = false; 
        (this.jsonToClass.jsonToMaridaje(maridajes)).forEach(vinoMaridaje => {
            if (this.nombre === vinoMaridaje.nombre){
                bandera = true;
            }
        });
        return bandera;
    }
}
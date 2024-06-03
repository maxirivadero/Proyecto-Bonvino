import tipoUvas from "../../assets/json/tipoUvas.json";
import { JsonToClass } from "./JsonToClass";

export class TipoUva {
    descripcion: string;
    nombre: string;
    jsonToClass = new JsonToClass;

    constructor(nombre: string, descripcion: string){
        this.descripcion = descripcion, 
        this.nombre = nombre;
    }

    sosTipoUva(): Boolean {
        let bandera = false; 
        (this.jsonToClass.jsonToTipoUva(tipoUvas)).forEach(vinoTipoUva => {
            if (this.nombre === vinoTipoUva.nombre){
                bandera = true;
            }
        });
        return bandera;
    }
}
import tipoUvas from "../../assets/json/tipoUvas.json";
import { JsonToClass } from "./JsonToClass";
 // FIJARSE TIPOS DE UVA DE PDF
export class TipoUva {
    nombre: string;
    descripcion: string;
    jsonToClass = new JsonToClass;

    constructor(nombre: string, descripcion: string){
        this.nombre = nombre,
        this.descripcion = descripcion
    }

    sosTipoUva(): Boolean {
        let bandera = false; 
        (this.jsonToClass.jsonToTipoUva(tipoUvas)).forEach(vinoTipoUva => {
            if (vinoTipoUva.nombre === this.nombre){
                bandera = true;
            }
        });
        return bandera;
    }
}
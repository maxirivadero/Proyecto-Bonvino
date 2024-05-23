import { Enofilo } from "./Enofilo";
import { Vino } from "./Vino";

export class Siguiendo {
    fechaInicio: Date;
    fechaFin: Date;
    vino:Vino | undefined;//Chequear despues como se pone para decir que no hace falta definir o setear el vino que tenga, igual con Enofilo
    enofilo:Enofilo | undefined;
    constructor(fechaInicio: Date, fechaFin: Date, vino:Vino, enofilo:Enofilo){
        this.fechaInicio = fechaInicio, 
        this.fechaFin = fechaFin;
        this.vino = vino;
        this.enofilo = enofilo;
    }

    sosDeBodega() {
        
    }
}
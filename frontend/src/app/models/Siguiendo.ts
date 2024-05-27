import { Enofilo } from "./Enofilo";
import { Vino } from "./Vino";

export class Siguiendo {
    fechaInicio: Date;
    fechaFin: Date;
    vino:Vino;
    enofilo:Enofilo | undefined;
    constructor(fechaInicio: Date, fechaFin: Date, vino:Vino, enofilo:Enofilo){
        this.fechaInicio = fechaInicio, 
        this.fechaFin = fechaFin;
        this.vino = vino;
        this.enofilo = enofilo;
    }

    sosDeBodega(): boolean {
        return !!this.vino.bodega;
        
    }
}
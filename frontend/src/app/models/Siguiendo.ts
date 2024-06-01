

export class Siguiendo {
    fechaInicio: Date;
    fechaFin: Date;
    bodega:string;
    enofilo:string | undefined;
    constructor(fechaInicio: Date, fechaFin: Date, bodega:string, enofilo:string){
        this.fechaInicio = fechaInicio, 
        this.fechaFin = fechaFin;
        this.bodega = bodega;
        this.enofilo = enofilo;
    }

    sosDeBodega(nombreBodega:string): boolean {
        return nombreBodega === this.bodega;
    }
}
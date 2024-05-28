export class Bodega {
    nombre: string;
    descripcion: string;
    historia:string;
    coordenadasUbicacion:Array<Number>;
    periodoActualizacion:number;
    ultimaActualizacion: Date;

    constructor(nombre: string, descripcion: string,historia:string, coordenadasUbicacion:Array<Number>, periodoActualizacion:number, ultimaActualizacion:Date) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.historia = historia;
        this.coordenadasUbicacion= coordenadasUbicacion;
        this.periodoActualizacion= periodoActualizacion;
        this.ultimaActualizacion= ultimaActualizacion;
    }  

    sosActualizable(fechaActual: Date) {
        const diferenciaMilisegundos = fechaActual.getTime() - this.ultimaActualizacion.getTime();
        const mesesDesdeUltimaActualizacion = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 30);
        
        return (mesesDesdeUltimaActualizacion >= this.periodoActualizacion);
    } 

    get getNombre(): string {
        return this.nombre;
    }

    get getDescripcion(): string {
        return this.descripcion;
    }

    get getCoordenadas(): Array<Number> {
        return this.coordenadasUbicacion;
    }

    actualizaVinos() {
        
    }

    //cambiar despues el any por el tipo de valor de la var
    setFechaActualizacion(fecha: any){

    }
}

// FALTA METODO sosActualizable()
//FALTA METODO setFechaActualizacion()
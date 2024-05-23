export class Bodega {
    nombre: string;
    descripcion: string;
    historia:string;
    coordenadasUbicacion:Array<Number>;
    //periodoActualizacion:string;

    constructor(nombre: string, descripcion: string,historia:string, coordenadasUbicacion:Array<Number>) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.historia = historia;
        this.coordenadasUbicacion= coordenadasUbicacion;
    }  
    
    mostrarTodosVinos() {

    }

    contarReseñas() {

    }

    sosActualizable() {
        
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
import { Vino } from "./Vino";

export class Bodega {
    nombre: string;
    descripcion: string;
    historia:string;
    coordenadasUbicacion:Array<Number>;
    private vinos: Vino[] = []; //Agrego esto para poder mostrar los vinos
    //periodoActualizacion:string;

    constructor(nombre: string, descripcion: string,historia:string, coordenadasUbicacion:Array<Number>) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.historia = historia;
        this.coordenadasUbicacion= coordenadasUbicacion;
    }  
    
    agregerVino(vino: Vino): void {
        this.vinos.push(vino);
    }

    mostrarTodosVinos(): void {
        this.vinos.forEach(vino => {
            console.log(vino.mostrarInfo());
        });
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
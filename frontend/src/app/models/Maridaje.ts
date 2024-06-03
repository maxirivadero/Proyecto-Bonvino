export class Maridaje {
    nombre: string;
    descripcion: string;

    constructor(nombre: string, descripcion: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    sosMaridaje(maridaje:Maridaje) {
        //console.log(maridaje.nombre, this.nombre)
        return maridaje.nombre === this.nombre;
    }
}
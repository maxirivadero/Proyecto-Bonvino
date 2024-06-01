export class TipoUva {
    descripcion: string;
    nombre: string;
    constructor(nombre: string, descripcion: string){
        this.descripcion = descripcion, 
        this.nombre = nombre;
    }

    sosTipoUva(tipoUva:TipoUva) {
        return tipoUva.nombre === this.nombre;
    }
}
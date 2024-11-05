export class Usuario {
    contraseña: string;
    nombre: string;
    premium: boolean;
    constructor(contraseña: string, nombre: string, premium: boolean){
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.premium = premium;
    }

    get getNombre(): string {
        return this.nombre;
    }
}

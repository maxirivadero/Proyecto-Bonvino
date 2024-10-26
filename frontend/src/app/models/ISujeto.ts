import { IObservador } from "./IObservador";

export interface ISujeto {
    suscribir(observador: IObservador): void;
    quitar(observador: IObservador): void;
    notificar(obj: Object): void;
}

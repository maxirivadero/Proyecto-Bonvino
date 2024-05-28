import { Bodega } from "../models/Bodega";

export interface PantallaActualizacion {

    opcionImportarActualizacionDeVinos: () => void;
    habilitarVentana: () => void;
    mostrarBodegasDisponibles: () => void;
    solicitarSeleccionBodega: () => void;
    tomarSeleccionBodega: (bodega: Bodega) => void;
    mostrarResumenActualizacion: () => void;
}
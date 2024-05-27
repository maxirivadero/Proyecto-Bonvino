import { Bodega } from "./Bodega";
import { Maridaje } from "./Maridaje";
import { TipoUva } from "./TipoUva";

export class GestorActualizacion {
    fechaActual: Date | undefined;//chequear si se hace asi y con todos los undefined
    bodegasActualizables:Array<Bodega> | undefined;//chequear si se hace asi
    bodegaSeleccionada:Bodega | undefined;
    maridajes:Array<Maridaje> | undefined;
    tipoUvas:Array<TipoUva> | undefined;
    constructor(){
    }

    importarActualizacionDeVinos() {
        
    };
    buscarBodegasActualizables() {

    };
    
    tomarSeleccionBodega() {
        
    };
    obtenerActualizacionVino() {
        
    };
    getFechaActual() {
        
    };
    crearVino() {
        
    };
    buscarMaridaje(palabraClave: string): Maridaje[] {
        if (!this.maridajes) {
            return []; // Devolver una lista vacía si no hay maridajes disponibles
        }

        // Filtrar los maridajes que coincidan con la palabra clave en el nombre o la descripción
        const maridajesFiltrados = this.maridajes.filter(maridaje => {
            // Convertir la palabra clave y los campos de búsqueda a minúsculas para una comparación insensible a mayúsculas
            const claveMin = palabraClave.toLowerCase();
            const nombreMin = maridaje.nombre.toLowerCase();
            const descripcionMin = maridaje.descripcion.toLowerCase();

            // Verificar si la palabra clave está presente en el nombre o la descripción del maridaje
            return nombreMin.includes(claveMin) || descripcionMin.includes(claveMin);
        });

        return maridajesFiltrados;
    };

    buscarTipoUva() {
        
    };
    notificarSubscripciones() {
        
    };
    finCU() {
        
    };
}
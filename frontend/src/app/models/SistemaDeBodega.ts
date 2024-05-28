import { Vino } from "./Vino";
import { Varietal } from "./Varietal";
import { Maridaje } from "./Maridaje";
import { Bodega } from "./Bodega";
import vinosActualizar from "../../assets/json/vinosActualizar"; // Importa el arreglo de vinos

export class SistemaDeBodega {
    obtenerNovedadesDeVinos(): Vino[] {
        const vinos: Vino[] = [];

        vinosActualizar.forEach(vinoData => {
            const varietales: Varietal[] = vinoData.varietal.map(varietalData => new Varietal(varietalData.descripcion, varietalData.porcentajeComposicion, varietalData.tipoUva));
            const maridajes: Maridaje[] = vinoData.maridaje.map(maridajeData => new Maridaje(maridajeData.nombre, maridajeData.descripcion));
            const fechaActualizacion: Date = new Date(vinoData.fechaActualizacion);

            const vino: Vino = new Vino(
                vinoData.imagenEtiqueta,
                vinoData.nombre,
                vinoData.notaDeCataBodega,
                vinoData.precioARS,
                varietales,
                maridajes,
                vinoData.bodega,
                fechaActualizacion
            );

            vinos.push(vino);
        });

        return vinos;
    }
}

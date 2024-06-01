import { Bodega } from "./Bodega";

export class JsonToClass {
    jsonToBodega(jsonBodegas: any): Array<Bodega> {
        let bodegas: Array<Bodega> = [];
        for (let key in jsonBodegas) {
            if (jsonBodegas.hasOwnProperty(key)) {
                let bodegaJson = jsonBodegas[key];
                let bodega = new Bodega(
                    bodegaJson.nombre,
                    bodegaJson.descripcion,
                    bodegaJson.historia,
                    bodegaJson.coordenadasUbicacion,
                    bodegaJson.periodoActualizacion,
                    new Date(bodegaJson.ultimaActualizacion)
                );
                bodegas.push(bodega);
            }
        }
        return bodegas;
    }
}

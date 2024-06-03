import { Maridaje } from "src/app/models/Maridaje";
import { Vino } from "src/app/models/Vino";

const vinos = [
    new Vino(
        "URL de imagen de la etiqueta 1",
        "Vino 1",
        "Nota de cata de la Bodega 1",
        1000,
        [
            {
                "descripcion": "Descripcion 1",
                "porcentajeComposicion": 25,
                "tipoUva": "Jugosa"
            },
            {
                "descripcion": "Descripcion 2",
                "porcentajeComposicion": 25,
                "tipoUva": "Seca"
            }
        ],
        [
            new Maridaje(
                "Maridaje 1",
                "Descripción del Maridaje 1"
            ),
            new Maridaje(
                "Maridaje 2",
                "Descripción del Maridaje 2"
            )
        ],
        "Bodega La Viña",
        new Date("2024-03-15T12:30:00.000Z")
    ),
    new Vino(
        "URL de imagen de la etiqueta 2",
        "Vino 2",
        "Nota de cata de la Bodega 2",
        2000,
        [
            {
                "descripcion": "Descripcion 3",
                "porcentajeComposicion": 25,
                "tipoUva": "Agria"
            }
        ],
        [
            new Maridaje(
                "Maridaje 3",
                "Descripción del Maridaje 3"
            )
        ],
        "Bodega La Viña",
        new Date("2024-03-15T12:30:00.000Z")
    ),
];

export default vinos;
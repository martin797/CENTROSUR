import { Injectable } from "@angular/core";
import { Documento } from '../../interfaces/documentos';
import { Filtro } from '../../interfaces/filtros';
import { Colletion } from '../../interfaces/coleccion';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class CollectionService {

    constructor(private localstore: LocalstorageService) {
        //console.log("Servicio inicializado");
    }

    documento: Documento = {
        nombre: "Profesores",
        filas: 5,
        filasConFiltro: 5,
        nuevo: false
    };

    documento2: Documento = {
        nombre: "Universidades",
        filas: 4,
        filasConFiltro: 4,
        nuevo: false
    };

    documento3: Documento = {
        nombre: "Empresas",
        filas: 5,
        filasConFiltro: 0,
        nuevo: false
    };

    documento4: Documento = {
        nombre: "Autos",
        filas: 5,
        filasConFiltro: 5,
        nuevo: true
    };

    doc1filtro1: Filtro = {
        nombre_filtro: "Profesor J",
        filas: 2,
        configuracion: [
            {
                nombre_columna: "nombre",
                config_name: "Comienza por",
                config_value: ["J"],
            },
            {
                nombre_columna: "edad",
                config_name: "Menor que",
                config_value: [18],
            },
        ],
        datos: [
            { nombre: "Juan", edad: 17 },
            { nombre: "Julia", edad: 16 }
        ],
        visto: true
    }

    doc1filtro2: Filtro = {
        nombre_filtro: "Profesores A",
        filas: 3,
        configuracion: [
            {
                nombre_columna: "nombre",
                config_name: "Comienza por",
                config_value: ["A"],
            },
            {
                nombre_columna: "edad",
                config_name: "Mayor que",
                config_value: [18],
            },
        ],
        datos: [
            { nombre: "Andres", edad: 25 },
            { nombre: "Ana", edad: 27 },
            { nombre: "Amadeus", edad: 33 }
        ],
        visto: true
    }

    doc2filtro1: Filtro = {
        nombre_filtro: "Clase A",
        filas: 2,
        configuracion: [
            {
                nombre_columna: "ciudad",
                config_name: "Es igual a",
                config_value: ["cuenca"],
            },
            {
                nombre_columna: "alumnos",
                config_name: "Mayor que",
                config_value: [100],
            },
        ],
        datos: [],
        visto: false
    }

    doc2filtro2: Filtro = {
        nombre_filtro: "Clase B",
        filas: 2,
        configuracion: [
            {
                nombre_columna: "nombre",
                config_name: "Comienza por",
                config_value: ["U"],
            },
            {
                nombre_columna: "edad",
                config_name: "Menor que",
                config_value: [100],
            },
        ],
        datos: [],
        visto: false
    }

    doc3filtro1: Filtro = {
        nombre_filtro: "Empresas A",
        filas: 0,
        configuracion: [
            {
                nombre_columna: "nombre",
                config_name: "Comienza por",
                config_value: ["A"],
            },
            {
                nombre_columna: "empleados",
                config_name: "Menor que",
                config_value: [100],
            },
        ],
        datos: [],
        visto: false
    }

    doc3filtro2: Filtro = {
        nombre_filtro: "Empresas B",
        filas: 0,
        configuracion: [
            {
                nombre_columna: "nombre",
                config_name: "Comienza por",
                config_value: ["B"],
            },
            {
                nombre_columna: "pais",
                config_name: "Es igual a",
                config_value: ["Peru"],
            },
        ],
        datos: [],
        visto: false
    }

    private _CollectionGestion: Colletion[] =
        [{
            documento: this.documento2,
            filtros: [
                this.doc2filtro1,
                this.doc2filtro2,
            ],
            datos: [
                { nombre: "U de cuenca", ciudad: "cuenca", alumnos: 1022, edad: 150, presupuesto: 23 },
                { nombre: "cato", ciudad: "cuenca", alumnos: 2022, edad: 130, presupuesto: 13 },
                { nombre: "U del azuay", ciudad: "quito", alumnos: 20, edad: 50, presupuesto: 45 },
                { nombre: "U politecnica", ciudad: "cuenca", alumnos: 50, edad: 30, presupuesto: 67 },
            ]
        },
        {
            documento: this.documento3,
            filtros: [
                this.doc3filtro1,
                this.doc3filtro2,
            ],
            datos: [
                { nombre: "B Austro", pais: "Ecuador", empleados: 1022 },
                { nombre: "B Pichincha", pais: "Ecuador", empleados: 1022 },
                { nombre: "Giga Solutions", pais: "Peru", alumnos: 2022 },
                { nombre: "Infinity", pais: "Brasil", alumnos: 2000 },
                { nombre: "Warner Bros", pais: "USA", alumnos: 5000 },
            ]
        },
        {
            documento: this.documento4,
            filtros: [],
            datos: [
                { nombre: "B Austro", continente: "America", empleados: 1022 },
                { nombre: "Giga Solutions", continente: "Europa", alumnos: 2022 },
                { nombre: "Infinity", continente: "Asia", alumnos: 20 },
                { nombre: "Warner Bros", continente: "Africa", alumnos: 50 },
                { nombre: "Universal Picture", continente: "Oceania", alumnos: 50 },
            ]
        }]

    //-------Regulacion-------------

    doc_regulacion_1: Documento = {
        nombre: "Artistas d",
        filas: 5,
        filasConFiltro: 5,
        nuevo: false
    };

    doc1_regulacion_filtro_1: Filtro = {
        nombre_filtro: "Artistas con M",
        filas: 2,
        configuracion: [
            {
                nombre_columna: "nombre",
                config_name: "Comienza por",
                config_value: ["M"],
            }
        ],
        datos: [],
        visto: false
    }

    doc1_regulacion_filtro_2: Filtro = {
        nombre_filtro: "Artistas en cuenca",
        filas: 3,
        configuracion: [
            {
                nombre_columna: "ciudad",
                config_name: "Es igual a",
                config_value: ["cuenca"],
            }
        ],
        datos: [],
        visto: false
    }

    private _CollectionRegulation: Colletion[] =
        [{
            documento: this.doc_regulacion_1,
            filtros: [
                this.doc1_regulacion_filtro_1,
                this.doc1_regulacion_filtro_2,
            ],
            datos: [
                { nombre: "Michael  Jackson", ciudad: "cuenca" },
                { nombre: "Red Hot Chillie", ciudad: "manta" },
                { nombre: "Queen", ciudad: "cuenca" },
                { nombre: "Soda estero", ciudad: "cuenca" },
                { nombre: "Molotov", ciudad: "loja" }
            ]
        }]

    getTypeof() {

    }

    setData(tipo_reporte: string, datos: any): void {
        if (tipo_reporte == "Gestión") {
            this._CollectionGestion = JSON.parse(datos);
        } else {
            this._CollectionRegulation = JSON.parse(datos);
        }
    }

    getData(tipo_reporte: string): Colletion[] {
        if (tipo_reporte == "Gestión") {
            return this._CollectionGestion;
        } else {
            return this._CollectionRegulation;
        }
    }

    setDataFilter(tipo_reporte: string, nombreDoc: string, nombreFiltro: string, datos: any[]): void {
        if (tipo_reporte == "Gestión") {
            this._CollectionGestion.
                filter(item => item.documento.nombre == nombreDoc)[0].filtros.
                filter(item => item.nombre_filtro == nombreFiltro)[0].datos = datos;
            //console.log("Datos del filtro save");
        } else {
            this._CollectionRegulation.
                filter(item => item.documento.nombre == nombreDoc)[0].filtros.
                filter(item => item.nombre_filtro == nombreFiltro)[0].datos = datos;
            //console.log("Datos del filtro save");
        }
    }

    setVistaFilter(tipo_reporte: string, nombreDoc: string, nombreFiltro: string, valor = true): void {
        if (tipo_reporte == "Gestión") {
            this._CollectionGestion.
                filter(item => item.documento.nombre == nombreDoc)[0].filtros.
                filter(item => item.nombre_filtro == nombreFiltro)[0].visto = valor;
            //console.log("Set filtro visto");
        } else {
            this._CollectionRegulation.
                filter(item => item.documento.nombre == nombreDoc)[0].filtros.
                filter(item => item.nombre_filtro == nombreFiltro)[0].visto = valor;
            //console.log("Set filtro visto");
        }
    }

    agregarCollection(tipo_reporte: string, filter: Colletion) {
        if (tipo_reporte == "Gestión") {
            this._CollectionGestion.push(filter);
        } else {
            this._CollectionRegulation.push(filter);
        }
    }

    eliminarDocumento(tipo_reporte: string, doc: Documento) {
        if (tipo_reporte == "Gestión") {
            this._CollectionGestion = this._CollectionGestion.filter(item => item.documento.nombre !== doc.nombre)
            //this.localstore.set("Documentos", this._CollectionGestion);
        } else {
            this._CollectionRegulation = this._CollectionRegulation.filter(item => item.documento.nombre !== doc.nombre)
            //this.localstore.set("Documentos R", this._CollectionRegulation);
        }
    }

    eliminarFiltro(tipo_reporte: string, doc: Documento, nombreFiltro: string,) {
        switch (tipo_reporte) {
            case "Gestión": {
                this.eliminar(this._CollectionGestion, doc.nombre, nombreFiltro);
                break;
            }
            case "Regulación": {
                this.eliminar(this._CollectionRegulation, doc.nombre, nombreFiltro);
                break;
            }
            default: {
                //console.log("No existe el tipo de reporte");
                break;
            }
        }
    }

    eliminar(data: any, nombreDoc: string, nombreFiltro: string) {
        const index = data.findIndex((x: any) => x.documento.nombre === nombreDoc);
        if (index >= 0) {
            console.log("borrar");
            data[index].filtros = data[index].filtros.filter((item: any) => item.nombre_filtro !== nombreFiltro);
        }
        console.log(nombreDoc, data[index].filtros);
    }

    get allCollection(): Colletion[] {
        return [...this._CollectionGestion];
    }

    get documentosGestion(): Documento[] {
        let documentos: Documento[] = [];
        this._CollectionGestion.forEach(item => {
            documentos.push(item.documento);
        });
        return documentos;
    }

    get documentosRegulacion(): Documento[] {
        let documentos: Documento[] = [];
        this._CollectionRegulation.forEach(item => {
            documentos.push(item.documento);
        });
        return documentos;
    }

    getFiltrosDocument(tipo: string, nombre: string): any[] {
        let result;
        if (tipo === "Gestión") {
            result = this._CollectionGestion.filter(item =>
                item.documento.nombre == nombre
            );
        } else {
            result = this._CollectionRegulation.filter(item =>
                item.documento.nombre == nombre
            );
        }
        return result[0] !== undefined ? result[0].filtros : [];
    }

    getDataDocument(tipo_reporte: string, nombre: string): any[] {
        let result;
        if (tipo_reporte == "Gestión") {
            result = this._CollectionGestion.filter(item =>
                item.documento.nombre == nombre
            );
        } else {
            result = this._CollectionRegulation.filter(item =>
                item.documento.nombre == nombre
            );
        }
        return result[0] !== undefined ? result[0].datos : [];
    }
}
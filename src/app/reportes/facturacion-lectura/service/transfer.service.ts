import { Injectable } from "@angular/core";
import { Documento } from '../../interfaces/documentos';
import { Filtro } from '../../interfaces/filtros';

@Injectable({
    providedIn: 'root'
})
export class DataTransfer {

    constructor() {
        //console.log("Servicio inicializado");
    }

    documento: Documento = {
        nombre: "",
        filas: 0,
        filasConFiltro: 0,
        nuevo: true
    };

    filtro: Filtro = {
        nombre_filtro: "",
        filas: 0,
        configuracion: [],
        datos: [],
        visto: false
    }

    private document: any = {
        tipo: "",
        doc: this.documento,
        url_padre: ""
    };

    private filtroDocument: any = {
        tipo: "",
        doc: this.documento,
        filtro: this.filtro
    };

    //------------Documentos------------

    setDocument(data: Documento, tipo_reporte: string, url_padre: string) {
        this.document.doc = data;
        this.document.tipo = tipo_reporte;
        this.document.url_padre = url_padre;
    }

    getDocument() {
        let result = this.document.doc;
        return result;
    }

    getDocumentTipo() {
        let result = this.document.tipo;
        return result;
    }

    getDocumentURl_padre() {
        let result = this.document.url_padre;
        return result;
    }

    clearData() {
        //this._document = undefined;
    }

    //------------Filtros------------

    setFilter(objeto: any) {
        this.filtroDocument = objeto;
    }

    getFilter() {
        let result = this.filtroDocument;
        return result;
    }

    clearDataFiltros() {
        //this._objeto = undefined;
    }

}
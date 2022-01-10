import { Documento } from './documentos';
import { Filtro } from './filtros';

export interface Colletion {
    documento: Documento,
    filtros: Filtro[],
    datos: any[]
}
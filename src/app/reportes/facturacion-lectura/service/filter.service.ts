import { Injectable } from "@angular/core";

@Injectable()
export class FilterService {

    constructor() {
        //console.log("Servicio inicializado");
    }

    verificarFiltro(dato: any, config_name: string, config_value: any) {
        //console.log(dato, config_name, config_value[0]);
        return this.opciones(config_name, dato, config_value[0]);
    }

    opciones(config_name: string, valor1: any, valor2: any): boolean {
        switch (config_name) {
            case "Es igual a": {
                return valor1 == valor2;
            }
            case "No es igual a": {
                return valor1 != valor2;
            }
            case "Comienza por": {
                return valor1.startsWith(valor2);
            }
            case "Termina con": {
                return valor1.endsWith(valor2);
            }
            case "Contiene": {
                return valor1.includes(valor2);
            }
            case "No contiene": {
                return !valor1.includes(valor2);
            }
            case "Mayor que": {
                return valor1 > valor2;
            }
            case "Mayor o igual que": {
                return valor1 >= valor2;
            }
            case "Menor que": {
                return valor1 < valor2;
            }
            case "Menor o igual que": {
                return valor1 <= valor2;
            }
            default: {
                console.log("Entra en Default");
                return false;
            }
        }
    }

}
export const getErroresNode = (errors: any) => {
    console.log('obteniendo errroes');
    //console.log(errors.status);
    let my_error: any = {};
    if (errors.status === 0) {
        my_error.conexion = true;
        my_error.mensaje = "Servicio no disponible";
    }
    if (errors.error.hasOwnProperty('errors')) {
        console.log('errores node')
        var errores: string = '';
        for (let index = 0; index < errors.error.errors.length; index++) {
            errores += errors.error.errors[index].msg + '\n'
        }
        return errores;
    }
    console.log('sin conexion')
    return my_error;
}
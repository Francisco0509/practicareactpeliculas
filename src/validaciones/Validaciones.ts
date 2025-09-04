

export function PrimeraLetraMayuscula(){
    return {
        name: 'primera-letra-mayuscula',
        message: 'La primera letra debe ser mayúscula',
        test: (valor: string | undefined) => {
            if(valor && valor.length > 0){
                const primeraLetra = valor.substring(0,1);
                return primeraLetra === primeraLetra.toUpperCase()
            }

            return true;
        }
    }
}
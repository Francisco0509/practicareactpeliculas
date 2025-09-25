import type { AxiosError } from "axios";

export default function extraerErroresIdentity(obj: AxiosError): string[]{
    const data = obj.response?.data as RespuestaError[];
    console.log('Errores identity', data);
    const mensajeDeError: string[] = data.map(error => error.description);
    return mensajeDeError;
}

interface RespuestaError{
    code: string;
    description: string;
}
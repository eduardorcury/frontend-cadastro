export class Alerta {
    id: string;
    tipo: TipoAlerta;
    mensagem: string;

    constructor(init?:Partial<Alerta>) {
        Object.assign(this, init);
    }
}

export enum TipoAlerta {
    Successo,
    Erro,
}
import { Contato } from "./contato.model";

export interface Pessoa {
    nome: string;
    cpf: string;
    nascimento: string;
    contatos: Contato[];
}
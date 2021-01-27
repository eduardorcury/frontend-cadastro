import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Alerta, TipoAlerta } from "../models/alerta.model";

@Injectable({ providedIn: 'root' })
export class AlertaService {

    private subject = new Subject<Alerta>();

    alertar(): Observable<Alerta> {
        return this.subject.asObservable().pipe();
    }

    successo(mensagem: string) {
        this.alerta(new Alerta({ tipo: TipoAlerta.Successo, mensagem }));
    }

    erro(mensagem: string) {
        this.alerta(new Alerta({ tipo: TipoAlerta.Erro, mensagem }));
    }
    
    alerta(alerta: Alerta) {
        this.subject.next(alerta);
    }

    limpar() {
        this.subject.next(new Alerta({}));
    }

}
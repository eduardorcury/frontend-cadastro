import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alerta, TipoAlerta } from '../../models/alerta.model';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  alertas: Alerta[] = [];

  subscription: Subscription;

  constructor(private service: AlertaService) { }

  ngOnInit(): void {
    this.subscription = this.service.alertar()
      .subscribe(alerta => {
        if (!alerta.mensagem) {
          this.alertas = [];
          return;
        }
        this.alertas.push(alerta);
      });
  }

  removerAlerta(alerta: Alerta) {
    this.alertas = this.alertas.filter(obj => obj !== alerta);
  }

  cssClass(alerta: Alerta) {

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];

    const alertTypeClass = {
      [TipoAlerta.Successo]: 'alert alert-success',
      [TipoAlerta.Erro]: 'alert alert-danger',
    }

    classes.push(alertTypeClass[alerta.tipo]);

    return classes.join(' ');
  }

}

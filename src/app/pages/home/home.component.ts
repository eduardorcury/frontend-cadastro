import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { PessoaService } from 'src/app/shared/services/pessoa.service';

import { first } from 'rxjs/operators';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { AlertaService } from 'src/app/shared/services/alerta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  carregando = false;

  form = this.fb.group({
    nome: [''],
    cpf: [''],
    nascimento: [''],
    contatos: this.fb.array([
      this.fb.group({
        nome: [''],
        telefone: [''],
        email: ['']
      })
    ]),
  });

  constructor(private fb: FormBuilder,
              private pessoaService: PessoaService,
              private alertaService: AlertaService) { }

  salvar() {
    console.log(this.form.value);
    this.alertaService.limpar();
    this.carregando = true;
    this.pessoaService.salvar(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertaService.successo('Cadastro feito com sucesso');
          this.carregando = false;
        },
        error: error => {
          console.log(error);
          error.error.forEach(element => {
            this.alertaService.erro(element);
          });
          this.carregando = false;
        }
      });
  }

  get contatos() {
    return this.form.controls.contatos as FormArray;
  }

  adicionarContato() {
    this.contatos.push(this.fb.group({
      nome: [''],
      telefone: [''],
      email: [''],
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { PessoaService } from 'src/app/shared/services/pessoa.service';

import { first } from 'rxjs/operators';
import { Pessoa } from 'src/app/shared/models/pessoa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  form = this.fb.group({
    nome: [''],
    cpf: [''],
    nascimento: [''],
    contatos: this.fb.array([
      this.fb.group({
        contato_nome: [''],
        contato_telefone: [''],
        contato_email: ['']
      })
    ]),
  });

  constructor(private fb: FormBuilder,
              private pessoaService: PessoaService) { }

  salvar() {
    console.log(this.form.value);
    this.pessoaService.salvar(this.form.value)
      .subscribe((pessoa: Pessoa) => console.log(pessoa));

  }

  get contatos() {
    return this.form.controls.contatos as FormArray;
  }

  adicionarContato() {
    this.contatos.push(this.fb.group({
      contato_nome: [''],
      contato_telefone: [''],
      contato_email: [''],
    }));
  }

}

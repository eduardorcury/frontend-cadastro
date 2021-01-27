import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  salvar() {
    console.log('teste');
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

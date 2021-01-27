import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pessoa } from '../models/pessoa.model';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${environment.apiUrl}`);
  }

  encontrarPorId(id: string): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(`${environment.apiUrl}/${id}`);
  }

  salvar(pessoa: Pessoa) {
    return this.httpClient.post(`${environment.apiUrl}`, pessoa);
  }

  atualizar(id: string, pessoa: Pessoa) {
    return this.httpClient.put(`${environment.apiUrl}/${id}`, pessoa);
  }

  deletar(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/${id}`);
  }

}

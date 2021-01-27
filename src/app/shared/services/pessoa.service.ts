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
    return this.httpClient.get<Pessoa[]>(`${environment.apiUrl}`)
      .pipe(catchError(this.errorHandler));
  }

  encontrarPorId(id: string): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(`${environment.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  salvar(pessoa: Pessoa) {
    return this.httpClient.post(`${environment.apiUrl}`, pessoa)
      .pipe(catchError(this.errorHandler));;
  }

  atualizar(id: string, pessoa: Pessoa) {
    return this.httpClient.put(`${environment.apiUrl}/${id}`, pessoa)
      .pipe(catchError(this.errorHandler));
  }

  deletar(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(
      `Erro na requisição. Mensagem: ${error.error}`
    )
  }

}

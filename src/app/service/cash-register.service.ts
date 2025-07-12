import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CashRegister } from '../../domain/CashRegister';
import { CashRegisterData } from '../../domain/data/CashRegisterData';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  constructor(private httpClient: HttpClient) { }

  private readonly API_BASE = `${environment.apiUrl}/v1/cashes-registers`;

  listarCaixas(page = 0, size = 10, sort = 'cashRegisterId,desc', filters?: any) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          params = params.set(key, filters[key]);
        }
      });
    }

    // Log da URL e parâmetros sendo enviados
  console.log('Enviando requisição para:', this.API_BASE);
  console.log('Parâmetros:', params.toString());

  return this.httpClient.get<CashRegister>(this.API_BASE, { params }).pipe(
    tap({
      next: (response) => {
        // Log da resposta completa
        console.log('Resposta completa da API:', response);

        // Log do conteúdo (se existir)
        if (response && response.content) {
          console.log('Número de registros recebidos:', response.content.length);
          console.log('Primeiro registro:', response.content[0]);
        }
      },
      error: (err) => {
        // Log detalhado de erros
        console.error('Erro na requisição:', {
          url: err.url,
          status: err.status,
          message: err.message,
          error: err.error
        });
      }
    })
  );
  }

  getCashRegisterById(id: number) {
    return this.httpClient.get<CashRegisterData>(`${this.API_BASE}/${id}`);
  }
}

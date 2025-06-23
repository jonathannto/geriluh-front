import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CashRegister } from '../../domain/CashRegister';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

  constructor(private httpClient: HttpClient) { }

  private readonly API_LIST = `${environment.apiUrl}/v1/cashes-registers?size=2000&sort=cashRegisterId%2Cdesc`;

  listCashesRegisters() {
    return this.httpClient.get<CashRegister>(this.API_LIST);
  }
  
}

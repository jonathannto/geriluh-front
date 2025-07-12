import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../../../service/cash-register.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DataView, DataViewLazyLoadEvent } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-caixa-visualizar-historico',
  templateUrl: './caixa-visualizar-historico.component.html',
  styleUrls: ['./caixa-visualizar-historico.component.css'],
  imports: [DataView, CommonModule, Tag, ButtonModule, DatePipe, PaginatorModule]
})
export class CaixaVisualizarHistoricoComponent implements OnInit {

  caixaRegistradora: any[] = [];
  registrosTotais = 0;
  carregando = true;
  colunas = [
  { field: 'cashRegisterId', header: 'Código', sortable: true },
  { field: 'initDate', header: 'Data Abertura', sortable: true },
  { field: 'endDate', header: 'Data Fechamento', sortable: true },
  { field: 'initialBalance', header: 'Saldo Inicial', sortable: true },
  { field: 'endBalance', header: 'Saldo Final', sortable: true },
  { field: 'totalSales', header: 'Total Vendas', sortable: true },
  { field: 'status', header: 'Status', sortable: true }
  ];

  private lastLazyLoadEvent: DataViewLazyLoadEvent = {
    first: 0, rows: 10,
    sortField: '',
    sortOrder: 0
  };


  constructor(private cashRegisterService: CashRegisterService) {
  }

  ngOnInit(): void{
    this.carregarCaixaRegistradora(this.lastLazyLoadEvent);
  }

  carregarCaixaRegistradora(event: DataViewLazyLoadEvent) {
    this.carregando = true;
    this.lastLazyLoadEvent = event;

    // Calcula a página e o tamanho com base no evento de lazy load
    // PrimeNG 'first' é o índice inicial, 'rows' é o número de linhas por página
    const page = event.first! / event.rows!;
    const size = event.rows!;

    // Formata o parâmetro 'sort' conforme sua API espera (ex: 'fieldName,order')
    // O DataView também pode ter sortField e sortOrder no evento de lazy load
    let sortParam = 'cashRegisterId,desc'; // Valor padrão
    if (event.sortField && event.sortOrder) {
      const order = event.sortOrder === 1 ? 'asc' : 'desc';
      sortParam = `${event.sortField},${order}`;
    }

    const filters = {};

    this.cashRegisterService.listarCaixas(page, size, sortParam, filters)
    .pipe(
      map((response: any) => {
        this.registrosTotais = response.numberOfElements || 0; // Atualiza o total de registros
       return response.content || [];
      }),
      catchError((error) => {
          console.error('Ocorreu um erro ao buscar os dados do caixa registrador: ', error);
          this.carregando = false; // Define o estado de carregamento para false em caso de erro
          this.registrosTotais = 0; // Reseta o total de registros em caso de erro
          return of([]); // Retorna um observable vazio para evitar quebrar a stream
        })
    )
    .subscribe((data: any[]) => {
        this.caixaRegistradora = data; // Atribui os dados recebidos à tabela
        this.carregando = false; // Define o estado de carregamento para false após os dados serem carregados
    });

  }
  colunaSelecionada(event: any) {
    console.log('Registro selecionado:', event.data);
  }
}


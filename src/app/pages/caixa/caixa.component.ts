import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { DataView } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';


@Component({
  selector: 'app-caixa',
  standalone: true,
  imports: [ConfirmDialog, ToastModule, ButtonModule, CommonModule, DataView, Tag],
  providers: [ConfirmationService, MessageService],
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
  }

  abrirCaixa() {
        this.confirmationService.confirm({

            message: 'Você tem certeza que gostaria de abrir um novo Caixa?',
            header: 'Confirmação',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Abrir',
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Novo caixa aberto' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: 'Nenhuma ação foi realizada',
                    life: 3000,
                });
            },
        });
      }

      abrirGerenciamentoCaixa() {
        this.confirmationService.confirm({

            message: 'Você tem certeza que gostaria de abrir um novo Caixa?',
            header: 'Confirmação',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Abrir',
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Novo caixa aberto' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: 'Nenhuma ação foi realizada',
                    life: 3000,
                });
            },
        });
      }

      products() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: '29/06/2025',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 210.58,
        category: 'Terca-feira',
        quantity: 24,
        inventoryStatus: 'ABERTO',
        rating: "Thais Santos",
      }
    ];
  }
}

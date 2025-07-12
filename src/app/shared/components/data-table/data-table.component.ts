import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T = any> {
  @Input() columns: { field: string, header: string, sortable?: boolean }[] = [];
  @Input() data: T[] = [];
  @Input() loading: boolean = false;
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() paginator: boolean = true;
  @Input() selectionMode: 'single' | 'multiple' | null = 'single';
  @Input() scrollable: boolean = false;
  @Input() scrollHeight: string = 'flex';
  @Input() rowTrackBy: string = 'id';
  @Input() showCurrentPageReport: boolean = true;
  @Input() rowsPerPageOptions: number[] = [10, 25, 50];

  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onRowSelect = new EventEmitter<any>();
  @Output() onRowUnselect = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<any>();

  // Template para ações personalizadas
  @ContentChild('actions') actionsTemplate?: TemplateRef<any>;
  // Template para celulas personalizadas
  @ContentChild('cellTemplate') cellTemplate?: TemplateRef<any>;
}

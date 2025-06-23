import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() paginator: boolean = true;

  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onRowSelect = new EventEmitter<any>();

}

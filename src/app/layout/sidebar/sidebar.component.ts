import { Component, OnInit, ElementRef} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterLink, MenuComponent],
})
export class SidebarComponent implements OnInit {

  constructor(public el: ElementRef) {}

  ngOnInit() {
  }

}

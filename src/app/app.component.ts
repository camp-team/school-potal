import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-potal';
  opened: boolean;

  constructor(
    private drawerservice: DrawerService
  ) {
    this.drawerservice.isOpen$.subscribe(opened => this.opened = opened);
  }
}

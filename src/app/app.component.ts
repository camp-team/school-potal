import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Players Hub';

  opened$: Observable<boolean> = this.drawerservice.isOpen$;

  constructor(private drawerservice: DrawerService) {}
}

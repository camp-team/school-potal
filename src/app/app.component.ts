import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Players Hub';

  opened$: Observable<boolean> = this.drawerservice.isOpen$;
  loading$ = this.loadingService.loading$;

  constructor(
    private drawerservice: DrawerService,
    private loadingService: LoadingService
  ) {}
}

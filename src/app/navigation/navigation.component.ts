import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  opened$: Observable<boolean> = this.drawerService.isOpen$;

  constructor(private drawerService: DrawerService, private router: Router) {}

  ngOnInit(): void {}

  routeCategoryFilter(category: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { category },
    });
  }
}

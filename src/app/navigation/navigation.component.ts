import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  opened$: Observable<boolean> = this.drawerService.isOpen$;
  user$: Observable<User> = this.userService.user$;

  constructor(
    private drawerService: DrawerService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  routeCategoryFilter(category: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { category },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  opened$: Observable<boolean> = this.uiService.isOpen$;
  user$: Observable<User> = this.userService.user$;

  constructor(
    private uiService: UiService,
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

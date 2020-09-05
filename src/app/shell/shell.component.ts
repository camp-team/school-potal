import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  opened$: Observable<boolean> = this.drawerService.isOpen$;

  constructor(private drawerService: DrawerService) {}

  ngOnInit(): void {}
}

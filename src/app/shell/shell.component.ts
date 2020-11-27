import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  opened$: Observable<boolean> = this.uiService.isOpen$;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  toggleNav() {
    console.log('check');

    this.uiService.toggleOpening();
  }
}

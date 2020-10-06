import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from 'src/app/search-dialog/search-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openSearchDialog() {
    this.dialog
      .open(SearchDialogComponent, {
        width: '60%',
        autoFocus: false,
      })
      .afterClosed();
  }
}

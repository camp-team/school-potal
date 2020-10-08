import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from 'src/app/search-dialog/search-dialog.component';
import { RequestDialogComponent } from 'src/app/shared/request-dialog/request-dialog.component';

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
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
      })
      .afterClosed();
  }

  openRequestDialog() {
    this.dialog
      .open(RequestDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
      })
      .afterClosed();
  }
}

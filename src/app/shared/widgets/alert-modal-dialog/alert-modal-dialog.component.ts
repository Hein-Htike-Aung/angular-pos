import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-alert-modal-dialog',
  templateUrl: './alert-modal-dialog.component.html',
  styleUrls: ['./alert-modal-dialog.component.scss']
})
export class AlertModalDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    $('.alert-modal').css('display', 'block');
  }

  close() {
    $('.alert-modal').css('display', 'none');
  }

}

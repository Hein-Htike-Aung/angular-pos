import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-info-modal-dialog',
  templateUrl: './info-modal-dialog.component.html',
  styleUrls: ['./info-modal-dialog.component.scss']
})
export class InfoModalDialogComponent implements OnInit {

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

  
  open() {
    $('.info-modal').css('display', 'block');
  }

  close() {
    $('.info-modal').css('display', 'none');
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-confirm-modal-dialog',
  templateUrl: './confirm-modal-dialog.component.html',
  styleUrls: ['./confirm-modal-dialog.component.scss'],
})
export class ConfirmModalDialogComponent implements OnInit {
  @Input()
  disableSubmitButton?: boolean;

  @Output()
  submitButton = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  open() {
    $('.confirm-modal').css('display', 'block');
  }

  close() {
    $('.confirm-modal').css('display', 'none');
  }

  submit() {
    this.submitButton.emit(true);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-form-modal-dialog',
  templateUrl: './form-modal-dialog.component.html',
  styleUrls: ['./form-modal-dialog.component.scss'],
})
export class FormModalDialogComponent implements OnInit {
  @Input()
  disableSubmitButton?: boolean;
  @Input()
  title?: string;

  @Output()
  submitButton = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  open() {
    $('.form-modal').css('display', 'block');
  }

  close() {
    $('.form-modal').css('display', 'none');
  }

  submit() {
    this.submitButton.emit(true);
  }
}

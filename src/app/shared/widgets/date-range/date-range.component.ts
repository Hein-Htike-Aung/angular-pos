import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  dateRange: FormGroup;

  @Output()
  dateRangeSearch = new EventEmitter();

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dateRange = this.builder.group({
      start: '',
      end: '',
    });
  }

  search() {
    this.dateRangeSearch.emit(this.dateRange.value);
  }
}

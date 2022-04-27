import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { ErrorProvider } from './../../shared/provider/error.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormModalDialogComponent } from './../../shared/widgets/form-modal-dialog/form-modal-dialog.component';
import { SupplierDto } from './../../model/app.model';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from './../../service/supplier.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  suppliers: SupplierDto[];
  supplierDto: SupplierDto;
  keyword: string;
  supplierForm: FormGroup;
  @ViewChild(FormModalDialogComponent)
  formModalDialogComponent: FormModalDialogComponent;
  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.instantiateSupplierDto();
  }

  instantiateSupplierDto() {
    this.supplierDto = {
      id: 0,
      fullName: '',
      address: '',
      orgName: '',
      phone: '',
    };
  }

  ngOnInit(): void {
    this.supplierForm = this.builder.group({
      id: 0,
      address: ['', Validators.required],
      fullName: ['', Validators.required],
      orgName: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.getAllSuppliers();
  }

  addNew() {
    this.supplierForm.reset();
    this.instantiateSupplierDto();
    this.formModalDialogComponent.open();
  }

  save() {

    this.supplierDto.fullName = this.supplierForm.get('fullName').value;
    this.supplierDto.address = this.supplierForm.get('address').value;
    this.supplierDto.orgName = this.supplierForm.get('orgName').value;
    this.supplierDto.phone = this.supplierForm.get('phone').value;

    this.supplierService.save(this.supplierDto).subscribe({
      next: (resp) => {
        this.formModalDialogComponent.close();
        this.getAllSuppliers();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error?.message);
      },
    });
  }

  update(s: SupplierDto) {
    this.supplierDto = s;
    this.supplierForm.patchValue(this.supplierDto);
    this.formModalDialogComponent.open();
  }

  search(value: string) {
    const result: SupplierDto[] = [];

    this.suppliers.forEach((s) => {
      if (
        s.fullName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        s.address.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        s.orgName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        s.phone.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        result.push(s);
      }
    });

    this.suppliers = result;

    if (this.suppliers.length == 0 || !value) {
      this.getAllSuppliers();
    }
  }

  confirmDelete(s: SupplierDto) {
    this.supplierDto = s;
    this.confirmModalDialogComponent.open();
  }

  // TODO:
  delete(value: any) {
    if(value) {
      this.supplierService.delete(this.supplierDto.id).subscribe({
        next: (resp) => {
          console.log(resp);
          this.confirmModalDialogComponent.close();
          this.getAllSuppliers();
        },
        error: (error) => {
          console.log(error);
          this.confirmModalDialogComponent.close();
          this.toastr.error(error.error?.message);
        },
      });
    }
  }

  getAllSuppliers() {
    this.supplierService
      .getAllSuppliers()
      .subscribe((resp) => (this.suppliers = resp));
  }

  showError(name: string) {
    return ErrorProvider.showError(name, this.supplierForm);
  }
}

import { ConfirmModalDialogComponent } from '../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { ProductService } from '../../service/product.service';
import { OrderRequestPayload, ProductDto } from '../../model/app.model';
import { OrderRequestProvider } from '../../shared/provider/order-request.provider';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cus-order-info',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit {

  ngOnInit(): void {
    
  }
  
}

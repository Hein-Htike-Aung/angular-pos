import {
  ChartType,
  Column
} from 'angular-google-charts';
import { cardType, Gender, OrderStatus } from './../enummeration/app.enum';

export interface ApiResponse {
  data: [];
  message: string;
  httpStatus: string;
  timestamp: Date;
}

export interface LoginRequestPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  authenticationToken: string;
  expiresAt: Date;
  role: string;
  username: string;
}

export interface CredentialInfo {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id: 0;
  created: string;
  email: string;
  username: string;
}

export interface EmployeeDto {
  id: number;
  address: string;
  dob: string; // bind With java instant Date
  email: string;
  fullName: string;
  gender: Gender;
  maritalStatus: string;
  password: string;
  phone: string;
  username: string;
  enabled: boolean;
}

export interface EmployeeUpdateRequestPayload {
  id: number;
  address: string;
  email: string;
  maritalStatus: string;
  phone: string;
}

export interface CustomerDto {
  id: number;
  address: string;
  fullName: string;
  phone: string;
  username: string;
  password: string;
  enabled: boolean;
  email: string;
}

export interface CategoryDto {
  id: number;
  categoryName: string;
}

export interface SubCategoryDto {
  id: number;
  categoryId: number;
  categoryName: string;
  subCategoryName: string;
}

export interface BrandDto {
  id: number;
  categoryId: number;
  categoryName: string;
  brandName: string;
}

export interface SupplierDto {
  id: number;
  address: string;
  fullName: string;
  orgName: string;
  phone: string;
}

export interface Product_Photo {
  id?: number;
  photo: string;
  productId?: number;
}

export interface Product_Property {
  id?: number;
  productId?: number;
  propertyName: string;
  propertyValue: string;
}

export interface ProductDto {
  id: number;
  brandDto: BrandDto;
  photos: Product_Photo[];
  price: number;
  productName: string;
  properties: Product_Property[];
  quantity: number;
  subCategoryDto: SubCategoryDto;
}

export interface ProductRequestPayload {
  id: number;
  brandId: number;
  photos: Product_Photo[];
  price: number;
  productName: string;
  properties: Product_Property[];
  quantity: number;
  subCategoryId: number;
}

export interface PurchaseRequestPayload {
  id: number;
  description: string;
  purchaseDetails: PurchaseDetailsRequestPayload[];
  supplierId: number;
}

export interface PurchaseDetailsRequestPayload {
  id: number;
  productId: number;
  quantity: number;
}

export interface PurchaseResponse {
  id: number;
  description: string;
  employeeDto: EmployeeDto;
  purchaseDate: string;
  supplierDto: SupplierDto;
  unitTotal: number;
  purchaseDetails: PurchaseDetialsResponse[];
}

export interface PurchaseDetialsResponse {
  id: number;
  quantity: number;
  productResponse: ProductDto;
  purchaseResponse: PurchaseResponse;
}

export interface OrderRequestPayload {
  id: 0;
  customerDto: CustomerDto | null; 
  description: string;
  orderDetails: OrderDetailsRequestPayload[];
  payment: PaymentDto | null;
}

export interface OrderDetailsRequestPayload {
  id: number;
  productId?: number;
  product: ProductDto | null;
  quantity: number;
}

export interface PaymentDto {
  id: 0;
  card: string;
  cardType: cardType | string;
  expireDate: string;
  safeGuard: number;
}

export interface OrderResponse {
  id: 0;
  customerDto: CustomerDto;
  deliveryDate: string;
  description: string;
  employeeDto: EmployeeDto;
  orderDate: string;
  orderDetails: OrderDetialsResponse[];
  orderStatus: OrderStatus;
  unitTotal: number;
  payment: PaymentDto;
}

export interface OrderDetialsResponse {
  id: number;
  quantity: number;
  productResponse: ProductDto;
}

export interface GoogleChart {
  title: string;
  type: ChartType | null;
  data: any[][];
  columns?: Column[];
  options?: {};
}
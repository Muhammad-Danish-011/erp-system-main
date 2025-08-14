export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
  brand: string;
  category: string;
  specifications: string;
  costPrice: number;
  supplierInfo: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  warrantyInfo: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  companyName: string;
  customerType: string;
  creditLimit: number;
}

export interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  taxIdentificationNumber: string;
  paymentTerms: string;
  bankAccountDetails: string;
  creditLimit: number;
  rating: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  taxAmount: number;
  shippingCost: number;
  shippingAddress: string;
  paymentStatus: string;
  paymentMethod: string;
  trackingNumber: string;
  shippedDate?: string;
  deliveredDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
  product?: Product;
}

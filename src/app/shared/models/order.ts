import {OrderItem} from './order-item';

export class Order {
  totalQuantity = 0;
  totalPrice: number;
  orderItems: OrderItem[];
}

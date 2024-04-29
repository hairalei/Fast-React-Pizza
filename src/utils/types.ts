export type Cart = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

export type CreateOrder = {
  customer: string;
  phone: string;
  address: string;
  priority: boolean | string;
  cart: Cart;
};

export type CompleteOrder = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean | string;
  estimatedDelivery: string;
  cart: Cart[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status?: string;
};

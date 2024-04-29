import { RootState } from '../../store';

export const getCart = (state: RootState) => state.cart.cart;

export const getTotalCartQty = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQtyById = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

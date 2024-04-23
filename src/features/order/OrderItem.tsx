import { formatCurrency } from '../../utils/helpers';
import { Cart } from '../../utils/types';

type OrderItemType = {
  item: Cart;
  isLoadingIngredients: boolean;
  ingredients: string[];
};

function OrderItem({ item, isLoadingIngredients, ingredients }: OrderItemType) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;

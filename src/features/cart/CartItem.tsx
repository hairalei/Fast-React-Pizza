import { formatCurrency } from '../../utils/helpers';
import { type Cart } from '../../utils/types';

function CartItem({ item }: { item: Cart }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;

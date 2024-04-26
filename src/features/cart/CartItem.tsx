import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { type Cart } from '../../utils/types';
import { deleteItem } from './cartSlice';

function CartItem({ item }: { item: Cart }) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, totalPrice } = item;

  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <Button type='small' onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;

import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { type Cart } from '../../utils/types';
import DeleteItem from './DeleteItem';
import UpdateItemQty from './UpdateItemQty';
import { getCurrentQtyById } from './cartSelector';

function CartItem({ item }: { item: Cart }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQty = useSelector(getCurrentQtyById(pizzaId));

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>

        <UpdateItemQty pizzaId={pizzaId} currentQty={currentQty} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;

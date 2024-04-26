import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQty } from './cartSelector';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQty = useSelector(getTotalCartQty);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    <div className='flex items-center justify-between px-4 py-4 text-sm uppercase md:text-base text-stone-200 bg-stone-800 sm:px-6'>
      <p className='space-x-4 font-semibold uppercase text-stone-300 sm:space-x-6'>
        <span>{totalCartQty} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>

      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

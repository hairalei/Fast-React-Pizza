import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { Pizza } from '../../utils/types';

function Menu() {
  const menu: Pizza[] = useLoaderData() as Pizza[];

  console.log(menu);

  return (
    <ul className='px-2 divide-y divide-stone-200'>
      {menu.map((pizza: Pizza) => {
        return <MenuItem key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return await getMenu();
}

export default Menu;

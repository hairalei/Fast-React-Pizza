import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

function Menu() {
  const menu = useLoaderData();
  console.log(menu);

  return <h1>Menu</h1>;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return await getMenu();
}

export default Menu;

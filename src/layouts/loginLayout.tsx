import { matchRoutes, Outlet, useLocation } from 'umi';
import routes from '@/router';

export default function Layout() {
  const location = useLocation();
  console.log(routes);
  
  console.log(matchRoutes(routes, location));
  return (
    <div>
      <div>111</div>
      <Outlet />
    </div>
  );
}

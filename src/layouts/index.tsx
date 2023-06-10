import { useLocation } from '@/utils/hooks';
import { useEffect } from 'react';
import { Outlet, store } from 'umi';


export default function Layout() {
  const location = useLocation();
  useEffect(() => {
    // listen change of url and sync data to store
    store.dispatch('route', 'updatePath', location.pathname);
    store.dispatch('route', 'updateQuery', location.query);
  }, [location])
  
  return (
    <Outlet />
  );
}

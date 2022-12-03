import { useLocation } from '@/utils/hooks';
import { useEffect } from 'react';
import { Outlet, store } from 'umi';


export default function Layout() {
  const location = useLocation();
  useEffect(() => {
    // 监听路由变化，并同步到store
    store.dispatch('route', 'updatePath', location.pathname);
  }, [location])
  
  return (
    <Outlet />
  );
}

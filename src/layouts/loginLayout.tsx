import { inject, matchRoutes, Outlet, useNavigate } from 'umi';
import routes from '@/router';
import { traverseObject } from '@/utils';
import { cloneDeep } from 'lodash';
import { Button } from '@mui/material';
import { useLocation } from '@/utils/hooks';
import { useEffect } from 'react';

const formatRoutes = cloneDeep(routes);
traverseObject(formatRoutes, (item) => {
    if (Array.isArray(item?.routes)) {
        item.children = item.routes;
    }
});
traverseObject(formatRoutes, (item) => {
    if (Array.isArray(item?.routes)) {
        item.routes = undefined;
    }
})

const injector = inject('user');

function LoginLayout({user}: typeof injector.type) {
  const location = useLocation();
  const authList = matchRoutes(formatRoutes, location)?.map(i => (i.route as any)?.meta?.auth).filter(Boolean);
  const navigator = useNavigate();
	
  useEffect(() => {
    if (!user.maps.isLogin) {
      navigator('/login');
    }
  }, [navigator, user.maps.isLogin]);
	
  if (!authList?.every(user.maps.hasAuth)) {
    return (
        <div>
            <h1>You do not have this permission</h1>
            <Button variant='outlined' onClick={() => navigator({
                pathname: `/`,
            }, {
                replace: true,
            })}>Go Home</Button>
        </div>
    )
  }


  return (
    <div>
      <Outlet />
    </div>
  );
}

export default injector(LoginLayout);
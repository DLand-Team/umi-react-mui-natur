import { matchRoutes, Outlet, useNavigate } from 'umi';
import routes from '@/router';
import { traverseObject } from '@/utils';
import { cloneDeep } from 'lodash';
import { Button } from '@mui/material';
import { useInject, useLocation } from '@/utils/hooks';
import { useLayoutEffect } from 'react';
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';

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
});

function LoginLayout() {
	const location = useLocation();
	const [user] = useInject('user');
	const authList: string[] =
		matchRoutes(formatRoutes, location)
			?.map((i) => (i.route as any)?.meta?.auth)
			?.filter(Boolean) || [];
	const navigator = useNavigate();

	useLayoutEffect(() => {
		if (!user.maps.isLogin) {
			navigator(`/login?redirect=${location.pathname + location.search}`);
		}
	}, [navigator, user.maps.isLogin, location.pathname, location.search]);

	if (!authList.every(user.maps.hasAuth)) {
		return (
			<div>
				<h1>You do not have this permission</h1>
				<Button
					variant="outlined"
					onClick={() =>
						navigator(
							{
								pathname: `/`,
							},
							{
								replace: true,
							},
						)
					}
				>
					Go Home
				</Button>
			</div>
		);
	}

	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
}

export default LoginLayout;

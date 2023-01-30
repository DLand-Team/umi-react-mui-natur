/* eslint-disable react/jsx-no-constructed-context-values */
/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useInject } from '@/utils/hooks';

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

// Otis Admin PRO React custom hook for using context
export function useMaterialUIController() {
	const [context] = useInject('mui');
	return [context.state, context.actions];
}

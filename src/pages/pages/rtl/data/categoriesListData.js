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

// Otis Admin PRO React components
import MDTypography from '@/components/MDTypography';

export default [
	{
		color: 'dark',
		icon: 'launch',
		name: 'الأجهزة',
		description: (
			<>
				250 في المخزن,{' '}
				<MDTypography variant="caption" color="text" fontWeight="medium">
					346+ تم البيع
				</MDTypography>
			</>
		),
		route: '/',
	},
	{
		color: 'dark',
		icon: 'book_online',
		name: 'تذاكر',
		description: (
			<>
				123 مغلق,{' '}
				<MDTypography variant="caption" color="text" fontWeight="medium">
					15 افتح
				</MDTypography>
			</>
		),
		route: '/',
	},
	{
		color: 'dark',
		icon: 'priority_high',
		name: 'سجلات الخطأ',
		description: (
			<>
				1 is نشيط,{' '}
				<MDTypography variant="caption" color="text" fontWeight="medium">
					40 مغلق
				</MDTypography>
			</>
		),
		route: '/',
	},
	{
		color: 'dark',
		icon: 'insert_emoticon',
		name: 'المستخدمين السعداء',
		description: (
			<MDTypography variant="caption" color="text" fontWeight="medium">
				+ 430
			</MDTypography>
		),
		route: '/',
	},
];

import { Cascader } from '@/components/Cascader';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

const options = [
	{
		label: '福建福建福建福建福建',
		value: 'fj',
		disabled: true,
		children: [
			{
				label: '福州',
				value: 'fuzhou',
				children: [
					{
						label: '马尾',
						value: 'mawei',
					},
				],
			},
			{
				label: '泉州',
				value: 'quanzhou',
			},
		],
	},
	{
		label: '浙江',
		value: 'zj',
		children: [
			{
				label: '杭州',
				value: 'hangzhou',
				children: [
					{
						label: '余杭',
						value: 'yuhang',
					},
				],
			},
		],
	},
	{
		label: '北京',
		value: 'bj',
		children: [
			{
				label: '朝阳区朝阳区朝阳区朝阳区',
				disabled: true,
				value: 'chaoyang',
			},
			{
				label: '朝阳区',
				value: 'chaoyang1',
			},
			{
				label: '海淀区',
				value: 'haidian',
				children: [
					{
						label: '余杭',
						value: 'yuhang111',
					},
				],
			},
		],
	},
];

export const CascaderDemo = () => {
	const [value, setValue] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	return (
		<Box>
			<h1>Cascader</h1>
			<b>
				More detail you look for in{' '}
				<a href="https://www.npmjs.com/package/rc-cascader" target="_blank" rel="noreferrer">
					npm link
				</a>
			</b>
			<br />
			<Button onClick={() => setValue(['bj', 'chaoyang'])}>set value</Button>
			<Cascader placeholder="Please select city" options={options} value={value} onChange={setValue} />
		</Box>
	);
};

test('findMultipleSelectedOptionNodes', () => {
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

	const value = [
		['bj', 'bj', 'chaoyang1'],
		['bj', 'bj', 'haidian', 'yuhang111'],
	];
});

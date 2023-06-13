import { Box, TextField } from '@mui/material';
import type { BaseOptionType } from 'rc-cascader';
import Cascader from 'rc-cascader';
import { useState } from 'react';
import './style.less'

const options = [{
  'label': '福建',
  'value': 'fj',
  'children': [{
    'label': '福州',
    'value': 'fuzhou',
    'children': [{
      'label': '马尾',
      'value': 'mawei',
    }],
  }, {
    'label': '泉州',
    'value': 'quanzhou',
  }],
}, {
  'label': '浙江',
  'value': 'zj',
  'children': [{
    'label': '杭州',
    'value': 'hangzhou',
    'children': [{
      'label': '余杭',
      'value': 'yuhang',
    }],
  }],
}, {
  'label': '北京',
  'value': 'bj',
  'children': [{
    'label': '朝阳区',
    'value': 'chaoyang',
  }, {
    'label': '海淀区',
    'value': 'haidian',
  }],
}];

export interface DefaultOptionType extends BaseOptionType {
	label: React.ReactNode;
	value?: string ;
	children?: DefaultOptionType[];
	disableCheckbox?: boolean;
}


export const CascaderDemo = () => {
	const [value, setValue] = useState<DefaultOptionType[]>([]);
	const [open, setOpen] = useState(false);
	return (
		<Box>
			<h1>Cascader</h1>
			<b>More detail you look for in <a href="https://www.npmjs.com/package/rc-cascader" target='_blank' rel="noreferrer">npm link</a></b>
			<br />
			<Cascader
				options={options}
				changeOnSelect
				open={open}
				// @ts-ignore
				onChange={(e: any, selectedOptions): any => {
					console.log('selectedOptions: ', selectedOptions)
					setValue(selectedOptions);
				}}>
				<input
					autoComplete={'off'}
					onFocus={() => setOpen(true)}
					onBlur={() => setOpen(false)}
					value={value.map(i => i.label).join(',')} />
			</Cascader>
		</Box>
	)
}
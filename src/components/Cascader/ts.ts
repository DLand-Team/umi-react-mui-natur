import type { BoxProps, TextFieldProps } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';

export type CascaderOptions<V extends any = any> = {
	value: V;
	label: ReactNode;
	labelString?: string;
	disabled?: boolean;
	children?: CascaderOptions<V>;
}[];

export interface CascaderBaseProps<V extends any = any> extends Omit<BoxProps<'span'>, 'onChange'> {
	options: CascaderOptions<V>;
	children?: ReactElement;
	placeholder?: string;
	/**
	 * can select option which has children
	 * @default false
	 */
	parentSelectable?: boolean;
	clearable?: boolean;
	showRadio?: boolean;
	limitTags?: number;
	TextFieldProps?: TextFieldProps;
}

export type CascaderSingleProps<V extends any = any> = {
	multiple?: false;
	/**
	 * show radio input
	 * @default true
	 */
	showRadio?: boolean;
	value?: V[];
	onChange?: (value: V[], selectedOptions: CascaderOptions<V>) => any;
} & CascaderBaseProps<V>;

export type CascaderMultipleProps<V extends any = any> = {
	multiple: true;
	/**
	 * show radio input
	 * @default true
	 */
	value?: V[][];
	onChange?: (value: V[][], selectedOptions: CascaderOptions<V>) => any;
} & CascaderBaseProps<V>;

export type CascaderProps<V extends any = any, M extends boolean | undefined = undefined> = Omit<
	CascaderBaseProps<V>,
	'options' | 'onChange'
> &
	(
		| {
				options: CascaderOptions<V>;
				multiple?: false;
				value?: V[];
				onChange?: (value: V[], selectedOptions: CascaderOptions<V>) => any;
		  }
		| {
				options: CascaderOptions<V>;
				multiple: true;
				/**
				 * show radio input
				 * @default true
				 */
				value?: V[][];
				onChange?: (value: V[][], selectedOptions: CascaderOptions<V>) => any;
		  }
	);

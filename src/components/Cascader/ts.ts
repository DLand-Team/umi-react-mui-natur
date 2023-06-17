import type { ReactElement, ReactNode } from 'react';

export type CascaderOptions<V extends any = any> = {
	value: V;
	label: ReactNode;
	labelString?: string;
	disabled?: boolean;
	children?: CascaderOptions<V>;
}[];

export interface CascaderProps<V extends any = any> {
	options: CascaderOptions<V>;
	children?: ReactElement;
	/**
	 * show radio input
	 * @default true
	 */
	showRadio?: boolean;
	placeholder?: string;
	/**
	 * can select option which has children
	 * @default false
	 */
	parentSelectable?: boolean;
	value?: V[];
	onChange?: (value: V[], selectedOptions: CascaderOptions<V>) => any;
}

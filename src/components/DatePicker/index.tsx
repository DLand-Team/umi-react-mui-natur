import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box, Button } from '@mui/material';
import type { Dayjs } from 'dayjs';
import type { PickerProps } from 'rc-picker';
import Picker from 'rc-picker';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import enUS from 'rc-picker/lib/locale/en_US';
import type { RangePickerBaseProps, RangePickerDateProps, RangePickerTimeProps } from 'rc-picker/lib/RangePicker';
import type { Component, ForwardedRef } from 'react';
import { cloneElement, forwardRef, useImperativeHandle, useRef } from 'react';

import './style.less';

// export type DatePickerProps = PickerProps<Dayjs> & {

// }

export type RangePickerProps<DateType> =
	| RangePickerBaseProps<DateType>
	| RangePickerDateProps<DateType>
	| RangePickerTimeProps<DateType>;

export interface CommonPickerMethods {
	focus: () => void;
	blur: () => void;
}

export type PickerRef<P> = ForwardedRef<Component<P> & CommonPickerMethods>;

export type DatePickRef<DateType> = PickerRef<PickerProps<DateType>>;

export type RangePickerRef<DateType> = PickerRef<RangePickerProps<DateType>>;

type PPD = PickerProps<Dayjs>;

type CustomPickerProps = {
	hashId?: string;
	popupClassName?: string;
	locale?: PPD['locale'];
	generateConfig?: PPD['generateConfig'];
};

export type DatePickerProps = Omit<PPD, 'locale' | 'generateConfig'> & CustomPickerProps;

export const DatePicker = forwardRef<DatePickRef<Dayjs> | CommonPickerMethods, DatePickerProps>(
	({ locale, picker = 'date', ...props }, ref) => {
		const innerRef = useRef<Picker<Dayjs>>(null);

		useImperativeHandle(ref, () => ({
			focus: () => innerRef.current?.focus(),
			blur: () => innerRef.current?.blur(),
		}));
		return (
			<Picker<Dayjs>
				ref={innerRef}
				className="date-picker-component"
				locale={locale || enUS}
				picker={picker as any}
				prefixCls="mui-picker"
				superPrevIcon={<KeyboardDoubleArrowLeftIcon />}
				superNextIcon={<KeyboardDoubleArrowRightIcon />}
				prevIcon={<ChevronLeftIcon />}
				nextIcon={<ChevronRightIcon />}
				generateConfig={dayjsGenerateConfig}
				cellRender={(current: any, info: any) => {
					console.log('current: ', current);
					console.log('info: ', info);
					return cloneElement(
						info.originNode,
						{
							...info.originNode.props,
						},
						<Box
							disableRipple
							component={Button}
							width={'100%'}
							height={'100%'}
							borderRadius={'50%'}
							minWidth={0}
							p={0}
							fontWeight={400}
						>
							{current.get('date')}
						</Box>,
					);
				}}
				{...props}
			/>
		);
	},
);

import type { PickerProps } from 'rc-picker';
import Picker from 'rc-picker';
import 'rc-picker/assets/index.css';
import enUS from 'rc-picker/lib/locale/en_US';
import { render } from 'react-dom';
import type { Dayjs } from 'dayjs';
import { GenerateConfig } from 'rc-picker/lib/generate';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import type { Component, ForwardedRef} from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { RangePickerBaseProps, RangePickerDateProps, RangePickerTimeProps } from 'rc-picker/lib/RangePicker';

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

export type DatePickerProps = Omit<PPD, 'locale'|'generateConfig'> & CustomPickerProps;

export const DatePicker = forwardRef<DatePickRef<Dayjs>| CommonPickerMethods, DatePickerProps>(({
	locale,
	picker = 'date',
	...props
}, ref) => {
	const innerRef = useRef<Picker<Dayjs>>(null);

	useImperativeHandle(ref, () => ({
		focus: () => innerRef.current?.focus(),
		blur: () => innerRef.current?.blur(),
	}));
	return (
		<Picker<Dayjs>
			ref={innerRef}
			locale={locale || enUS}
			picker={picker as any}
			generateConfig={dayjsGenerateConfig}
			{...props}
		/>
	)
});
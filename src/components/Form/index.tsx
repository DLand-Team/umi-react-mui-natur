import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FormikConfig, FormikContextType, FormikValues } from 'formik';
import { useFormik } from 'formik';
import { FormikProvider } from 'formik';
import { omit, pick } from 'lodash';
import React, { useMemo } from 'react';
import type { FormContextType } from './context';
import { FormContext } from './context';
import type { FormType } from './type';

export * from './type'

const formProps = [
	// 'layout',
] as const;

export function useForm<Values extends FormikValues = FormikValues>(
	params: FormikConfig<Values> & FormContextType,
) {
	const formik = useFormik(omit(params, formProps));
	return {
		...formik,
		...pick(params, formProps),
	};
}

export { default as FormItem } from './FormItem';

export interface FormProps<T> extends FormContextType {
	form: FormType<T>;
	children: React.ReactNode;
	formSx?: BoxProps['sx'];
}

export default function Form({
	form,
	children,
	layout,
	labelStyle,
	fieldStyle,
	labelSx,
	fieldSx,
	formItemSx,
	formSx,
}: FormProps<any>) {
	const v = useMemo(() => ({
		layout,
		labelStyle,
		fieldStyle,
		labelSx,
		fieldSx,
		formItemSx,
	}), [fieldStyle, fieldSx, formItemSx, labelStyle, labelSx, layout]);
	return (
		<FormContext.Provider value={v}>
			<FormikProvider value={form}>
				<Box sx={formSx}>{children}</Box>
			</FormikProvider>
		</FormContext.Provider>
	);
}

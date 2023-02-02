import { Box } from '@mui/material';
import type { FormikConfig, FormikContextType, FormikValues } from 'formik';
import { useFormik } from 'formik';
import { FormikProvider } from 'formik';
import { omit, pick } from 'lodash';
import React, { useMemo } from 'react';
import { FormContext } from './context';
import type { FormItemProps } from './FormItem';

export interface FormContextType extends Pick<FormItemProps, 'labelStyle' | 'fieldStyle'> {
	layout?: 'vertical' | 'horizontal' | 'inline';
}

export interface FormType<T> extends FormikContextType<T>, FormContextType {}

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
}

export default function Form({ form, children, layout, labelStyle, fieldStyle }: FormProps<any>) {
	const v = useMemo(() => ({ layout, labelStyle, fieldStyle }), [fieldStyle, labelStyle, layout]);
	return (
		<FormContext.Provider value={v}>
			<FormikProvider value={form}>
				<Box>{children}</Box>
			</FormikProvider>
		</FormContext.Provider>
	);
}

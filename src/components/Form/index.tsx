import { Box } from '@mui/material';
import type { FormikConfig, FormikContextType, FormikValues } from 'formik';
import { useFormik } from 'formik';
import { FormikContext, FormikProvider } from 'formik';
import { merge } from 'lodash';
import React from 'react';

const defaultContext: Required<FormContextType> = {
	layout: 'horizontal',
};

export const FormContext = React.createContext<Required<FormContextType>>(defaultContext);

export interface FormContextType {
	layout?: 'vertical' | 'horizontal' | 'inline';
}

export interface FormType<T> extends FormikContextType<T>, FormContextType {}

export function useForm<Values extends FormikValues = FormikValues>({
	layout,
	...formikArguments
}: FormikConfig<Values> & FormContextType) {
	const formik = useFormik(formikArguments);
	return {
		...formik,
		layout,
	};
}

export { default as FormItem } from './FormItem';

export default function Form({
	form,
	children,
}: {
	form: FormType<any>;
	children: React.ReactNode;
}) {
	const { layout, ...formikContext } = form;
	return (
		<FormContext.Provider
			value={merge(defaultContext, {
				layout,
			})}
		>
			<FormikProvider value={formikContext}>
				<Box>{children}</Box>
			</FormikProvider>
		</FormContext.Provider>
	);
}

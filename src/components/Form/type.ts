import type { FormikContextType } from 'formik';
import type { FormContextType } from './context';

export interface BaseInputProps<V extends any = string, E extends any = boolean> {
	value?: V;
	onChange?: (value: V) => any;
	onBlur?: (...args: any[]) => any;
	error?: E;
}

export interface FormType<T> extends FormikContextType<T>, FormContextType {}

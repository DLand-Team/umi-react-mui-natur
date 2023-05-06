import React from 'react';
import type { FormItemProps } from './FormItem';

export interface FormContextType
	extends Pick<FormItemProps, 'labelStyle' | 'fieldStyle' | 'labelSx' | 'fieldSx' | 'formItemSx'> {
	layout?: 'vertical' | 'horizontal' | 'inline';
}

export const FormContext = React.createContext<FormContextType>({});

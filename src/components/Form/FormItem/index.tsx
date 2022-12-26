import { Box } from '@mui/material';
import type { FieldAttributes } from 'formik';
import { useField } from 'formik';
import { ErrorMessage } from 'formik';
import { useContext, useEffect, useId, useRef, useState } from 'react';
import { FormContext } from '..';
import { FormItemBox } from './style';

export interface FormItemProps extends FieldAttributes<any> {
	labelWidth?: number;
	/**
	 * form item layout
	 */
	// layout?: 'vertical' | 'horizontal' | 'inline';
	/**
	 * show required sign(*)
	 */
	required?: boolean;
}

const dispalyMap = {
	vertical: 'block',
	horizontal: 'flex',
	inline: 'inline-block',
};

const fieldDisplayMap = {
	vertical: 'block',
	horizontal: 'inline-block',
	inline: 'inline-block',
}

export default function FormItem({
	label,
	as: Comp,
	children,
	name,
	validate,
	labelWidth,
	required = false,
	...restProps
}: FormItemProps) {
	const [field, helper] = useField({ name, validate });
	const errorMsg = helper.touched ? helper.error : '';
	const fieldRef = useRef<HTMLDivElement>();
	const [fieldHeight, setFieldHeight] = useState(40);

	useEffect(() => {
		if (fieldRef.current) {
			const { height } = fieldRef.current.getBoundingClientRect();
			if (height !== fieldHeight) {
				setFieldHeight(height);
			}
		}
	}, [fieldHeight]);
	const id = useId();
	const {layout} = useContext(FormContext);

	return (
		<FormItemBox display={dispalyMap[layout]}>
			{label && (
				<Box className="label-box" component={'label'} htmlFor={id} width={labelWidth} display={dispalyMap[layout]}>
					{required && <Box color='error.main' component={'span'}>* </Box>}{label}:
				</Box>
			)}
			<Box display={fieldDisplayMap[layout]} style={{verticalAlign: 'top'}}>
				<Comp {...restProps} {...field} id={id} error={!!errorMsg} ref={fieldRef}>
					{children}
				</Comp>

				{errorMsg && (
					<>
						<br />
						<Box color="error.main" pl={1} component={'span'}>
							{<ErrorMessage name={name} />}
						</Box>
					</>
				)}
			</Box>
		</FormItemBox>
	);
}

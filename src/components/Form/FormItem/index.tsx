import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FieldAttributes } from 'formik';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import type { CSSProperties } from 'react';
import { useCallback, useContext, useId, useMemo } from 'react';
import { FormContext } from '../context';
import { FormItemBox } from './style';

export interface FormItemProps extends FieldAttributes<any> {
	labelStyle?: CSSProperties;
	labelSx?: BoxProps['sx'];
	fieldStyle?: CSSProperties;
	fieldSx?: BoxProps['sx'];
	formItemSx?: BoxProps['sx'];

	/**
	 * show required sign(*)
	 */
	required?: boolean;
	errorPropMapper?: (error?: string) => Record<string, any>;
}

const displayMap = {
	vertical: 'block',
	horizontal: 'flex',
	inline: 'inline-block',
};

const fieldDisplayMap = {
	vertical: 'block',
	horizontal: 'inline-block',
	inline: 'inline-block',
};

export default function FormItem({
	label,
	as: Comp,
	children,
	name,
	validate,
	labelStyle,
	fieldStyle,
	labelSx,
	fieldSx,
	required = false,
	formItemSx,
	errorPropMapper = (error?: string) => ({ error: !!error }),
	...restProps
}: FormItemProps) {
	const [field, helper] = useField({ name, validate });
	const { setFieldValue, setFieldTouched } = useFormikContext();
	const errorMsg = helper.touched ? helper.error : '';
	const id = useId();
	const ctx = useContext(FormContext);
	const { layout = 'horizontal' } = ctx;

	const onChange = useCallback(
		(event: any) => {
			// restProps?.onChange?.(event);
			setFieldValue(name, event?.target?.value ?? event);
		},
		[name, setFieldValue, restProps?.onChange],
	);

	const boxyStyle = useMemo(
		() => ({ ...ctx.labelStyle, ...labelStyle }),
		[ctx.labelStyle, labelStyle],
	);

	const finalFieldStyle = useMemo(
		() => ({
			verticalAlign: 'top',
			...ctx.fieldStyle,
			...fieldStyle,
		}),
		[ctx.fieldStyle, fieldStyle],
	);

	const onBlur = useCallback(() => {
		setFieldTouched(name, true);
	}, [name, setFieldTouched]);

	const fieldComponentUI = useMemo(
		() => (
			<Comp
				{...restProps}
				{...field}
				onBlur={onBlur}
				onChange={onChange}
				id={id}
				{...errorPropMapper(errorMsg)}
			>
				{children}
			</Comp>
		),
		[Comp, children, errorMsg, errorPropMapper, field, id, onBlur, onChange, restProps],
	);

	const finalLabelSx = useMemo(
		() => ({
			...(ctx.labelSx || {}),
			...(labelSx || {}),
		}),
		[ctx.labelSx, labelSx],
	);

	const finalFieldSx = useMemo(
		() => ({
			...(ctx.fieldSx || {}),
			...(fieldSx || {}),
		}),
		[ctx.fieldSx, fieldSx],
	);

	const finalFormItemSx = useMemo(
		() => ({
			...(ctx.formItemSx || {}),
			...(formItemSx || {}),
		}),
		[ctx.formItemSx, formItemSx],
	);

	return (
		<FormItemBox display={displayMap[layout]} sx={finalFormItemSx}>
			{label && (
				<Box
					className="label-box"
					component={'label'}
					htmlFor={id}
					display={fieldDisplayMap[layout]}
					style={boxyStyle}
					sx={finalLabelSx}
				>
					{required && (
						<Box color="error.main" component={'span'}>
							*{' '}
						</Box>
					)}
					{label}:
				</Box>
			)}
			<Box display={fieldDisplayMap[layout]} sx={finalFieldSx} style={finalFieldStyle}>
				{fieldComponentUI}
				{errorMsg ? (
					<>
						<Box color="error.main" component={'span'} display={'block'}>
							{<ErrorMessage name={name} />}
						</Box>
					</>
				) : null}
			</Box>
		</FormItemBox>
	);
}

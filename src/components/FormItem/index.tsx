import { Box } from '@mui/material';
import { styled } from '@mui/system';
import type { FieldAttributes } from 'formik';
import { useField } from 'formik';
import { ErrorMessage, Field } from 'formik';

export default function FormItem(props: FieldAttributes<any>) {
	const [, field] = useField(props.name);
	const errorMsg = field.touched ? field.error : '';

	return (
		<div>
			<Field {...props} error={!!errorMsg}>
				{props.children}
			</Field>
			{errorMsg && (
				<Box color="error.main" mt={1}>
					{<ErrorMessage name={props.name} />}
				</Box>
			)}
		</div>
	);
}

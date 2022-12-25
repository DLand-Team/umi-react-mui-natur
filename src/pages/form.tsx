import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik"
import Joi from "joi";



export default function FormPage() {
	const form = useFormik({
		initialValues: {
			name: 'tom111',
		},
		onSubmit: (values, helpers) => {
			console.log(values, helpers);
		},
		// validationSchema: Joi.object({
		// 	name: Joi.string().max(15, 'max length is 15.').required()
		// })
		// validate: (values) => {
		// 	if (values.name.length > 15) {

		// 	}
		// }
	});
	return (
		<Box p={2}>
			<h1>
			form page
			</h1>
			<FormikProvider value={form}>
				<Field
					as={TextField}
					name='name'
					label='name'
					InputLabelProps={{ shrink: true }}
					validate={(name: string) => name.length > 15 ? 'name max length is 15.' : ''}
				/>
				<ErrorMessage name="name" />
			</FormikProvider>
		</Box>
	)
}
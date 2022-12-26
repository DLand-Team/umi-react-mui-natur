import FormItem from "@/components/FormItem";
import { MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FormikProvider, useFormik } from "formik"



export default function FormPage() {
	const form = useFormik({
		initialValues: {
			name: 'tom111',
			sex: 'man' as 'man' | 'woman',
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
				<FormItem
					as={TextField}
					name='name'
					label='name'
					InputLabelProps={{ shrink: true }}
					validate={(name: string) => name.length > 15 ? 'name max length is 15.' : ''}
				/>
				<FormItem
					as={TextField}
					name='sex'
					select
					InputLabelProps={{ shrink: true }}
					validate={(sex: string) => sex === 'woman' ? 'you can not choose woman!' : ''}
				>
					<MenuItem value='man'>man</MenuItem>
					<MenuItem value='woman'>woman</MenuItem>
				</FormItem>
			</FormikProvider>
		</Box>
	)
}
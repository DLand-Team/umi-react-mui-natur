import Form, { FormItem, useForm } from '@/components/Form';
import { LoadingButton } from '@mui/lab';
import { MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as Yup from 'yup';
import { Message } from '@/utils/message';
import { sleep } from '@/utils';

export default function FormPage() {
	const form = useForm({
		initialValues: {
			name: '',
			sex: 'man',
		},
		onSubmit: async (formData, helpers) => {
			// helpers.setTouched({name: true, sex: true}, true);
			const res = await helpers.validateForm();
			console.log(res);
			
			await sleep(3000);
			// console.log(...arg);
			Message.success('Submit Success!');
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('please input name').min(6, 'min is 6').max(15, 'name max length is 15.'),
			sex: Yup.string().required('please input sex').notOneOf(['private'], 'you must choose one!'),
		}),
	});

	return (
		<Box p={2}>
			<h1>form page</h1>
			<Form
				form={form}
				layout="horizontal"
				labelStyle={{
					textAlign: 'right',
					width: '100px',
					marginRight: 20,
				}}
				fieldStyle={{
					width: 200,
				}}
			>
				<FormItem as={TextField} name="name" label="Name" size="small" required />
				<FormItem
					as={TextField}
					name="sex"
					label="Sex"
					select
					size="small"
					// validate={(sex: string) => (sex === 'private' ? 'you must choose one!' : '')}
				>
					<MenuItem value="private">private</MenuItem>
					<MenuItem value="man">man</MenuItem>
					<MenuItem value="woman">woman</MenuItem>
				</FormItem>
				<Box ml={'120px'}>
					<LoadingButton
						disabled={form.isSubmitting}
						variant="contained"
						loading={form.isSubmitting}
						onClick={form.submitForm}
					>
						Submit
					</LoadingButton>
				</Box>
			</Form>
		</Box>
	);
}

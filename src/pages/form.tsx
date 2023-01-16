import Form, { FormItem, useForm } from '@/components/Form';
import { useInject } from '@/utils/hooks';
import { LoadingButton } from '@mui/lab';
import { MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as Yup from 'yup';

export default function FormPage() {
	const [message] = useInject('message');
	const form = useForm({
		initialValues: {
			name: 'tom111',
			sex: 'man',
		},
		onSubmit: async (...arg) => {
			await new Promise((res) => setTimeout(res, 3000));
			console.log(...arg);
			message.actions.success('Submit Success!');
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().max(15, 'name max length is 15.'),
			sex: Yup.string().notOneOf(['private'], 'you must choose one!'),
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

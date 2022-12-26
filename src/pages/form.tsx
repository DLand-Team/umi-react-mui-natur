import Form, { FormItem, useForm } from '@/components/Form';
import { Button, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function FormPage() {
	const form = useForm({
		layout: 'vertical',
		initialValues: {
			name: 'tom111',
			sex: 'man',
		},
		onSubmit: (...arg) => {
			console.log(...arg, form);
		},
	});
	
	return (
		<Box p={2}>
			<h1>form page</h1>
			<Form form={form}>
				<FormItem
					as={TextField}
					name="name"
					label="Name"
					size="small"
					required
					validate={(name: string) => (name.length > 15 ? 'name max length is 15.' : '')}
				/>
				<FormItem
					as={TextField}
					name="sex"
					label="Sex"
					select
					style={{ width: 200 }}
					size="small"
					validate={(sex: string) => (sex === 'private' ? 'you must choose one!' : '')}
				>
					<MenuItem value="private">private</MenuItem>
					<MenuItem value="man">man</MenuItem>
					<MenuItem value="woman">woman</MenuItem>
				</FormItem>
				<Button onClick={form.submitForm}>Submit</Button>
			</Form>
		</Box>
	);
}

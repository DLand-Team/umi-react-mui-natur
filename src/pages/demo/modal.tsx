import { Modal } from '@/utils/modal';
import { Button, Box } from '@mui/material';


export const ModalDemo = () => {
	return (
		<Box>
			<h1>Modal Demo</h1>
			<Box mr={1} component="span">
				<Button variant='contained' onClick={async () => {
					await Modal.confirm({
						title: 'Confirm Title',
						content: 'confirm text',
					});
				}}>Show Confirm Modal</Button>
			</Box>
		</Box>
	);
};

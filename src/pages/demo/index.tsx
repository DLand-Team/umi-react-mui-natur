import { sleep } from '@/utils';
import type { ListItemButtonProps } from '@mui/material';
import { Box, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useFlatInject } from 'umi';
import { CodeRenderDemo } from './codeRender';
import FormDemo from './form';
import { LoadingDemo } from './loading';
import { MDRenderDemo } from './mdRender';
import { MessageDemo } from './message';
import TableDemo from './table';

const MyListItemLink = ({ href, ...props }: ListItemButtonProps & { href: string }) => {
	return (
		<ListItemButton
			onClick={() => {
				if (href) {
					document.querySelector(href)?.scrollIntoView({
						behavior: 'smooth',
					});
				}
			}}
			{...props}
		/>
	);
};

const DemoPage = () => {
	const [loading] = useFlatInject('loading', {});
	const [demo] = useFlatInject('demo', { state: [(s) => s.text.message] });
	const [message] = useFlatInject('message', {});

	const showLoading = async () => {
		loading.show();
		await sleep(3000);
		loading.hide();
	};
	const showToast = (type: 'error' | 'info' | 'success' | 'warning') => () => {
		message[type](demo.text.message);
	};

	return (
		<Box display={'flex'} height={'100%'}>
			<Box component={Paper} height={'100%'} elevation={10} width={300} borderRadius={0}>
				<List>
					<ListItem disablePadding>
						<MyListItemLink href="#form">
							<ListItemText primary="Form" />
						</MyListItemLink>
					</ListItem>
					<ListItem disablePadding>
						<MyListItemLink href="#loading">
							<ListItemText primary="Loading" />
						</MyListItemLink>
					</ListItem>
					<ListItem disablePadding>
						<MyListItemLink href="#message">
							<ListItemText primary="Message" />
						</MyListItemLink>
					</ListItem>
					<ListItem disablePadding>
						<MyListItemLink href="#table">
							<ListItemText primary="Table" />
						</MyListItemLink>
					</ListItem>
					<ListItem disablePadding>
						<MyListItemLink href="#code-render">
							<ListItemText primary="CodeRender" />
						</MyListItemLink>
					</ListItem>
					<ListItem disablePadding>
						<MyListItemLink href="#markdown-render">
							<ListItemText primary="Markdown" />
						</MyListItemLink>
					</ListItem>
				</List>
			</Box>
			<Box p={4} height={'100%'} overflow={'auto'}>
				<Box>
					<Box component={'a'} id="form" />
					<FormDemo />
				</Box>
				<Box>
					<Box component={'a'} id="loading" />
					<LoadingDemo />
				</Box>
				<Box>
					<Box component={'a'} id="message" />
					<MessageDemo />
				</Box>
				<Box>
					<Box component={'a'} id="table"/>
					<TableDemo />
				</Box>
				<Box>
					<Box component={'a'} id="code-render" />
					<CodeRenderDemo />
				</Box>
				<Box>
					<Box component={'a'} id="markdown-render" />
					<MDRenderDemo />
				</Box>
				<Box />
			</Box>
		</Box>
	);
};
export default DemoPage;

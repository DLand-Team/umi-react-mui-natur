import Close from '@mui/icons-material/Close';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import type { TextFieldProps } from '@mui/material';
import { Box, IconButton, Popover, TextField } from '@mui/material';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import type { BaseInputProps } from '../Form';
import type { DateRangePickerPanelProps } from './DateRangePickerPanel';
import { DateRangePickerPanel } from './DateRangePickerPanel';

export interface DateRangePickerProps
	extends BaseInputProps<Dayjs[]>,
		Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur'>,
		Pick<DateRangePickerPanelProps, 'shouldDisableDate'> {
	format?: string;
}

export const DateRangePicker = ({
	value,
	onBlur,
	onChange,
	format = 'YYYY-MM-DD',
	shouldDisableDate,
	...fieldProps
}: DateRangePickerProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	let textValue = '';

	if (anchorEl && !value?.length) {
		textValue = `${format} - ${format}`;
	}
	if (value?.length === 1) {
		textValue = `${value[0].format(format)} - ${format}`;
	}
	if (value?.length === 2) {
		textValue = `${value[0].format(format)} - ${value[1].format(format)}`;
	}

	return (
		<Box>
			<TextField
				onClick={handleClick}
				sx={{ width: 300 }}
				value={textValue}
				InputProps={{
					readOnly: true,
					placeholder: `Start Date - End Date`,
					endAdornment: (
						<>
							<IconButton>
								<InsertInvitationIcon />
							</IconButton>
							{!!value?.length && (
								<IconButton
									onClick={(e) => {
										e.stopPropagation();
										onChange?.([]);
									}}
								>
									<Close />
								</IconButton>
							)}
						</>
					),
					sx: { cursor: 'pointer' },
				}}
				{...fieldProps}
			/>
			<Popover
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<DateRangePickerPanel
					elevation={0}
					shouldDisableDate={shouldDisableDate}
					value={value || []}
					onChange={(v) => {
						onChange?.(v);
						if (v.length === 2) {
							handleClose();
							onBlur?.();
						}
					}}
				/>
			</Popover>
		</Box>
	);
};

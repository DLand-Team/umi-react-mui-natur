import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import type { PaperProps, TextFieldProps } from '@mui/material';
import { InputAdornment, Menu, TextField } from '@mui/material';
import { merge, omit } from 'lodash';
import type { ReactNode } from 'react';
import React, { useMemo, useState } from 'react';
import type { BaseInputProps } from '../Form';

export interface SelectProps<T> extends Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur'>, BaseInputProps<T> {
	children: ReactNode;
	PaperProps?: PaperProps;
}

export const Select = <T extends unknown>({ children, onChange, PaperProps, ...textFieldProps }: SelectProps<T>) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		textFieldProps.onBlur?.();
	};
	const options = useMemo(() => {
		return React.Children.map(children, (child) => ({
			// @ts-ignore
			value: child.props.value,
			// @ts-ignore
			label: child.props.children,
		}))?.filter((i) => i.value || i.label);
	}, [children]);
	return (
		<>
			<TextField
				onClick={handleClick}
				{...omit(textFieldProps, 'onBlur')}
				value={options?.find((o) => o.value === textFieldProps.value)?.label || ''}
				InputProps={merge(
					{
						style: {
							cursor: 'pointer !important',
						},
						readOnly: true,
						endAdornment: (
							<InputAdornment sx={{ ml: 0 }} position="end">
								{!anchorEl ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
							</InputAdornment>
						),
					},
					textFieldProps.InputProps,
				)}
				onChange={() => {}}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				PaperProps={{
					elevation: 20,
					...PaperProps,
					sx: {
						width: anchorEl?.clientWidth,
						...PaperProps?.sx,
					},
				}}
				onClose={handleClose}
			>
				{React.Children.map(children, (child) =>
					// @ts-ignore
					React.cloneElement(child, {
						onClick: () => {
							handleClose();
							// @ts-ignore
							onChange?.(child?.props?.value);
						},
					}),
				)}
			</Menu>
		</>
	);
};

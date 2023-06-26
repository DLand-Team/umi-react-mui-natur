import { Box, IconButton, styled } from '@mui/material';
import Color from 'color';

export interface StyledDateItemButtonBoxProps {
	isFirst?: boolean;
	isLast?: boolean;
	isInSelect?: boolean;
}

export const StyledDateItemButtonBox = styled(Box, {
	shouldForwardProp: (p: string) => !['isFirst', 'isLast', 'isInSelect'].includes(p),
})<StyledDateItemButtonBoxProps>(({ isFirst, isLast, isInSelect, theme }) => ({
	width: 40,
	height: 40,
	borderTopLeftRadius: isFirst ? '50%' : 0,
	borderBottomLeftRadius: isFirst ? '50%' : 0,
	borderTopRightRadius: isLast ? '50%' : 0,
	borderBottomRightRadius: isLast ? '50%' : 0,
	backgroundColor: isInSelect
		? new Color(theme.palette.primary.light).alpha(theme.palette.action.focusOpacity).toString()
		: undefined,
}));

export interface DateItemIconButtonProps {
	selected: boolean;
	isToday: boolean;
	isHover?: boolean;
	isInSelect?: boolean;
}

export const StyledDateItemButton = styled(IconButton, {
	shouldForwardProp: (p: string) => !['selected', 'isToday', 'isHover', 'isInSelect'].includes(p),
	name: 'StyledDateItemButton',
})<DateItemIconButtonProps>(({ selected, isHover, isToday, theme, isInSelect }) => ({
	width: 39,
	height: 39,
	display: 'flex',
	fontSize: 12,
	alignItems: 'center',
	justifyContent: 'center',
	// margin: '0 2px',
	fontWeight: selected ? 600 : 400,
	border: (isHover || isToday) && !selected ? `1px solid ${theme.palette.grey['700']}` : '',
	backgroundColor: selected ? theme.palette.primary.main : undefined,
	color: selected ? '#fff' : isInSelect ? undefined : theme.palette.text.primary,
	'&:hover': {
		backgroundColor: selected
			? theme.palette.primary.main
			: new Color(theme.palette.primary.main).alpha(theme.palette.action.hoverOpacity).toString(),
		color: selected ? '#fff' : theme.palette.text.primary,
	},
}));

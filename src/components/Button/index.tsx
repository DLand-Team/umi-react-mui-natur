import type { ButtonProps} from "@mui/material";
import { styled, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { omit } from "lodash";
import AuthHOC from "../AuthHOC";
import { SpiningLoadingSvg } from "../Loading/box";


export interface LoadingButtonProps extends ButtonProps {
	loading?: boolean;
	loadingIconSize?: number;
}

const LoadingButton = (props: LoadingButtonProps) => {
	const theme = useTheme();
	let defaultLoadingIconSize = theme.typography.button.fontSize || 14;
	const btnSo = theme.components?.MuiButton?.styleOverrides
	switch(props.size) {
		case 'large': {
			// @ts-ignore
			defaultLoadingIconSize = btnSo?.sizeLarge?.fontSize || '0.9375rem' || defaultLoadingIconSize;
		}
		case 'medium': {
			// @ts-ignore
			defaultLoadingIconSize = btnSo?.sizeMedium?.fontSize || '0.875rem' || defaultLoadingIconSize;
		}
		case 'small': {
			// @ts-ignore
			defaultLoadingIconSize = btnSo?.sizeSmall?.fontSize || '0.8125rem' || defaultLoadingIconSize;
		}
		default: {
			break;
		}
	}
	const {
		loading = false,
		loadingIconSize,
		...restProps
	} = props;
	return (
		<Button
			{...restProps}
			disabled={loading || props.disabled}
			startIcon={loading ? <SpiningLoadingSvg style={{width: defaultLoadingIconSize}}  /> : props.startIcon}
		/>
	)
}

export default AuthHOC(LoadingButton);

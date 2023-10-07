import type { MenuProps } from '@mui/material';
import { Menu } from '@mui/material';
import React, { useState } from 'react';

export interface EasyMenuProp<V extends any>
	extends Omit<MenuProps, 'value' | 'defaultValue' | 'onChange' | 'children' | 'open'> {
	/**
	 * element triggle menu options
	 */
	as: React.ReactElement<{ onClick: (event: React.MouseEvent<HTMLElement>) => any }>;
	/**
	 * menu item elements
	 */
	children: (JSX.Element | null | false | undefined)[];
	value?: V;
	defaultValue?: V;
	onChange?: (v: V) => any;
}

export const EasyMenu = <V extends any>({
	children,
	as,
	value,
	onChange,
	defaultValue,
	...menuProps
}: EasyMenuProp<V>) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [localValue, setLocalValue] = useState<V | void>(defaultValue);
	const openMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};

	const isMenuItemSelected = (menuItemValue: V) => {
		if (value !== undefined) {
			return menuItemValue === value;
		}
		if (localValue !== undefined) {
			return menuItemValue === localValue;
		}
		return false;
	};
	return (
		<>
			{React.cloneElement(as, {
				onClick: (event: React.MouseEvent<HTMLElement>) => {
					as.props?.onClick?.(event);
					openMenu(event);
				},
			})}
			<Menu {...menuProps} anchorEl={anchorEl} open={open} onClose={closeMenu}>
				{React.Children.map(children, (menuItem) => {
					if (menuItem) {
						return React.cloneElement(menuItem, {
							onClick: (...args: any) => {
								if (menuItem.props.value !== undefined) {
									setLocalValue(menuItem.props.value);
									onChange?.(menuItem.props.value);
								}
								menuItem.props?.onClick?.(...args);
								closeMenu();
							},
							selected: isMenuItemSelected(menuItem.props.value),
						});
					}
					return menuItem;
				})}
			</Menu>
		</>
	);
};

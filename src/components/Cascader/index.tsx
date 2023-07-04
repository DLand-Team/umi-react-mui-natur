import { Box, Menu, MenuItem, OutlinedInput, Radio } from '@mui/material';
import { cloneElement, useEffect, useState } from 'react';

import { useFn } from '@/utils/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { isEqual } from 'lodash';
import { CascaderOptions, CascaderProps } from './ts';
import { findOptionList, findSelectedOptionNodes } from './utils';

export { CascaderOptions, CascaderProps, findSelectedOptionNodes };

export const Cascader = <V extends any = any>({
	options,
	children,
	value = [],
	onChange,
	parentSelectable = false,
	showRadio = true,
	placeholder,
}: CascaderProps<V>) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const [selectedOptions, setSelectedOptions] = useState<CascaderOptions>(findSelectedOptionNodes(options, value));
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const optionList = findOptionList(
		options,
		selectedOptions.map((i) => i.value),
	);

	const onChangeProxy = useFn((currentOptionIndex: number, i: CascaderOptions[0]) => {
		if (i.disabled) {
			return;
		}
		const newValue = selectedOptions.map((i1) => i1.value).slice(0, currentOptionIndex + 1);
		newValue[currentOptionIndex] = i.value;
		const newSelectedOptions = findSelectedOptionNodes(options, newValue);
		setSelectedOptions(newSelectedOptions);
		if (parentSelectable) {
			onChange?.(newValue, newSelectedOptions);
		} else {
			if (!newSelectedOptions.at(-1)?.children?.length) {
				onChange?.(newValue, newSelectedOptions);
			}
		}
		if (!newSelectedOptions.at(-1)?.children?.length) {
			handleClose();
		}
	});

	useEffect(() => {
		if (!anchorEl) {
			return;
		}
		if (
			!isEqual(
				value,
				selectedOptions.map((i) => i.value),
			)
		) {
			setSelectedOptions(findSelectedOptionNodes(options, value));
		}
	}, [value, options, anchorEl]);

	return (
		<div>
			{children ? (
				cloneElement(children, {
					onClick: handleClick,
				})
			) : (
				<OutlinedInput
					onClick={handleClick}
					autoComplete={'off'}
					readOnly
					placeholder={placeholder}
					endAdornment={<ArrowDropDownIcon sx={{ transform: !!anchorEl ? 'rotate(180deg)' : undefined }} />}
					value={findSelectedOptionNodes(options, value)
						.map((i) => i.labelString || i.label)
						.join(',')}
				/>
			)}
			<Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose} variant="selectedMenu">
				<Box display={'flex'}>
					{optionList.map((currentOption, currentOptionIndex) => (
						<Box key={currentOptionIndex} maxHeight={'500px'} sx={{ overflowY: 'auto' }}>
							{currentOption.map((i, index) => (
								<Box
									component={MenuItem}
									display={'flex'}
									key={index}
									sx={{ cursor: i.disabled ? 'not-allowed' : undefined }}
									color={i.disabled ? '#ccc' : undefined}
									onClick={() => onChangeProxy(currentOptionIndex, i)}
									selected={i.value === selectedOptions[currentOptionIndex]?.value}
								>
									{showRadio && (
										<Radio
											disabled={i.disabled}
											checked={i.value === selectedOptions[currentOptionIndex]?.value}
											sx={{ p: 0, mr: 1 }}
										/>
									)}
									{i.label}
									{i.children?.length && <ChevronRightIcon sx={{ ml: 2, marginLeft: 'auto' }} />}
								</Box>
							))}
						</Box>
					))}
				</Box>
			</Menu>
		</div>
	);
};

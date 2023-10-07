import {
	Box,
	Checkbox,
	checkboxClasses,
	Chip,
	IconButton,
	inputBaseClasses,
	listItemIconClasses,
	Menu,
	MenuItem,
	Paper,
	Radio,
	radioClasses,
	svgIconClasses,
	TextField,
} from '@mui/material';
import React, { cloneElement, useEffect, useState } from 'react';

import { useFn } from '@/utils/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import { isEqual, merge } from 'lodash';
import { CascaderOptions, CascaderProps } from './ts';
import {
	doseIntersect,
	findAllChildren,
	findMultipleSelectedOptionNodes,
	findNodePathByNode,
	findSelectedOptionNodes,
	selectStatus,
} from './utils';
export type { CascaderBaseProps, CascaderMultipleProps, CascaderSingleProps } from './ts';
export { CascaderOptions, CascaderProps, findSelectedOptionNodes };

export const Cascader = <V extends any = any, M extends boolean | undefined = undefined>(
	props: CascaderProps<V, M>,
) => {
	const {
		options,
		children,
		value = [],
		onChange,
		parentSelectable = false,
		showRadio = true,
		placeholder,
		clearable = false,
		limitTags,
		TextFieldProps,
		...boxProps
	} = props;
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const [selectedOptions, setSelectedOptions] = useState<CascaderOptions<V>[]>(
		props.multiple
			? findMultipleSelectedOptionNodes(options, props.value)
			: [findSelectedOptionNodes(options, props.value)],
	);

	const [operatingOptions, setOperatingOptions] = useState<CascaderOptions<V>[]>([options]);
	const [focusIndexs, setFocusIndexs] = useState<number[]>([]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const clickOption = ({
		col,
		row,
		node,
	}: {
		col: number;
		row: number;
		node: CascaderOptions[0];
		checked?: boolean;
	}) => {
		if (node.disabled) {
			return;
		}
		const newOperatingOptions = operatingOptions.slice(0, col + 1);
		if (node.children) {
			newOperatingOptions[col + 1] = node.children;
		}
		setOperatingOptions(newOperatingOptions);
		setFocusIndexs((v) => {
			const newValue = v.slice(0, col);
			newValue[col] = row;
			return newValue;
		});
	};

	const onChangeProxy = useFn(
		({ col, row, node, checked }: { col: number; row: number; node: CascaderOptions[0]; checked?: boolean }) => {
			if (node.disabled) {
				return;
			}
			if (props.multiple) {
				const newSelectedNodePath = findNodePathByNode(options, node);

				let newValue = props.value?.slice() || [];
				const selectedValue = newSelectedNodePath.map((i) => i.value);
				const checkIntersect = doseIntersect(props.value, selectedValue);

				if (node.children?.length) {
					if (checked) {
						const newSelections = findAllChildren(options, node);
						newValue = newValue.filter((_, index) => !checkIntersect.containIndexs.includes(index));
						newValue.push(...newSelections.map((i) => i.map((i1) => i1.value)));
					} else {
						newValue = newValue.filter((_, index) => !checkIntersect.containIndexs.includes(index));
					}
				} else {
					if (checkIntersect.have) {
						newValue = newValue.filter((_, index) => checkIntersect.haveIndexs[0] !== index);
					} else {
						newValue.push(selectedValue);
					}
				}
				props.onChange?.(newValue, newSelectedNodePath);
			} else {
				const newValue = selectedOptions[0].map((i1) => i1.value).slice(0, col + 1);
				newValue[col] = node.value;
				const newSelectedOptions = findSelectedOptionNodes(options, newValue);
				setSelectedOptions([newSelectedOptions]);
				if (parentSelectable) {
					props.onChange?.(newValue, newSelectedOptions);
				} else {
					if (!newSelectedOptions.at(-1)?.children?.length) {
						props.onChange?.(newValue, newSelectedOptions);
					}
				}
				if (!newSelectedOptions.at(-1)?.children?.length) {
					handleClose();
				}
			}
		},
	);

	const deleteItemByClickChip = (i: CascaderOptions<V>) => {
		if (props.multiple) {
			let newValue = props.value?.slice() || [];
			const leafValue = i.at(-1)?.value;
			const nodeIndexInValue = newValue.map((i1) => i1.at(-1)).findIndex((i1) => i1 === leafValue);
			newValue = newValue.filter((_, index) => index !== nodeIndexInValue);
			props.onChange?.(newValue, []);
		}
	};

	useEffect(() => {
		if (
			!isEqual(
				value,
				selectedOptions.map((i) => i.map((i1) => i1.value)),
			)
		) {
			setSelectedOptions(
				findMultipleSelectedOptionNodes(options, props.multiple ? props.value : props.value ? [props.value] : []),
			);
		}
	}, [value, options, anchorEl]);

	const showOverNumber = props.multiple === true && props.limitTags && (props.value?.length || 0) > props.limitTags;

	return (
		<Box component={'span'} display={'inline-flex'} {...boxProps}>
			{children ? (
				cloneElement(children, {
					onClick: handleClick,
				})
			) : (
				<TextField
					onClick={handleClick}
					autoComplete={'off'}
					placeholder={placeholder}
					{...TextFieldProps}
					inputProps={merge(
						{
							style: { paddingLeft: 0, width: props.multiple && !!props.value?.length ? 0 : 'auto', minWidth: 1 },
						},
						TextFieldProps?.inputProps,
					)}
					InputProps={{
						readOnly: true,
						startAdornment: props.multiple && !!props.value?.length && (
							<InputAdornment position="start" sx={{ height: 'auto', maxHeight: 'none', maxWidth: 'none', py: 1 / 2 }}>
								<Box display={'flex'} gap={'2px'} maxWidth={'none'}>
									<Box flex={1} display={'flex'} flexWrap={'wrap'} gap={'2px'}>
										{selectedOptions?.slice(0, props.limitTags || undefined).map?.((i, index) => (
											<Chip
												key={String(i.map((i1) => i1.label).join('/'))}
												sx={{
													borderRadius: '6px',
													maxWidth: 200,
													height: 24,
													mr: 1,
													// display: 'flex',
													[`.${svgIconClasses.root}`]: {
														width: 16,
														height: 16,
													},
												}}
												label={String(i.map((i1) => i1.label).join('/'))}
												onDelete={() => deleteItemByClickChip(i)}
											/>
										))}
									</Box>
									{showOverNumber ? <Box flex={'none'}>{`+${props.value.length - props.limitTags!}`}</Box> : null}
								</Box>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment sx={{ ml: 0 }} position="end">
								{clearable && value[0] ? (
									<IconButton
										size="small"
										onClick={(e) => {
											e.stopPropagation();
											onChange?.([], []);
										}}
									>
										<CloseIcon sx={{ width: 16, height: 16 }} />
									</IconButton>
								) : null}
								<ArrowDropDownIcon sx={{ transform: anchorEl ? 'rotate(180deg)' : undefined }} />
							</InputAdornment>
						),
						sx: merge(
							{
								pl: 1,
								maxWidth: 400,
								maxHeight: 'none',
								height: 'auto',
								[`.${inputBaseClasses.input}`]: {
									alignSelf: 'flex-end',
								},
							},
							TextFieldProps?.InputProps?.sx,
						),
					}}
					value={
						props.multiple
							? ''
							: findSelectedOptionNodes(options, props.value)
									.map((i) => i.labelString || i.label)
									.join(' / ')
					}
				/>
			)}
			<Menu
				open={!!anchorEl}
				PaperProps={{
					sx: { boxShadow: 'none', overflow: 'visible', background: 'rgba(0,0,0,0)' },
					elevation: 0,
				}}
				MenuListProps={{
					sx: { pt: 0 },
				}}
				anchorEl={anchorEl}
				onClose={handleClose}
				variant="selectedMenu"
			>
				<Box display={'flex'}>
					{operatingOptions.map((currentOption, currentOptionIndex) => (
						<Box
							component={Paper}
							key={currentOptionIndex}
							ml={currentOptionIndex > 0 ? 1 : 0}
							maxHeight={'500px'}
							elevation={20}
							minWidth={200}
							sx={{ overflowY: 'auto', p: 0.5 }}
						>
							{currentOption.map((i, index) => (
								<Box
									component={MenuItem}
									display={'flex'}
									key={index}
									px={1}
									sx={(theme) => ({
										cursor: i.disabled ? 'not-allowed' : undefined,
										'&.Mui-selected': {
											color: `${theme.palette.text.primary}!important`,
											background: `${theme.palette.action.focus}!important`,
											borderRadius: 0.5,
											[`.${radioClasses.root}, .${checkboxClasses.root}`]: {
												color: `${theme.palette.text.primary}!important`,
											},
											[`.${radioClasses.checked},.${checkboxClasses.checked},.${checkboxClasses.indeterminate}`]: {
												color: `${theme.palette.primary.main}!important`,
											},
											'&:hover': {
												color: `${theme.palette.text.primary}!important`,
												background: `${theme.palette.action.focus}!important`,
											},
											[`& .${listItemIconClasses.root}`]: {
												color: `${theme.palette.text.primary}!important`,
											},
										},
									})}
									color={i.disabled ? '#ccc' : undefined}
									onClick={() => {
										clickOption({
											col: currentOptionIndex,
											row: index,
											node: i,
										});
										if (!props.multiple) {
											onChangeProxy({
												col: currentOptionIndex,
												row: index,
												node: i,
											});
										}
									}}
									selected={focusIndexs[currentOptionIndex] === index}
								>
									{showRadio && !props.multiple && (
										<Radio
											disabled={i.disabled}
											checked={selectedOptions
												.map((i1) => i1[currentOptionIndex]?.value)
												.filter((i2) => i2 !== undefined)
												.includes(i.value)}
											sx={{ p: 0, mr: 1 }}
										/>
									)}
									{props.multiple && (
										<Checkbox
											disabled={i.disabled}
											indeterminate={selectStatus(selectedOptions, i) === 1}
											checked={selectStatus(selectedOptions, i) === 2}
											sx={{ p: 0, mr: 1 }}
											onChange={(_, checked) => {
												onChangeProxy({
													col: currentOptionIndex,
													row: index,
													node: i,
													checked,
												});
											}}
										/>
									)}
									{i.label}
									{i.children?.length && <ChevronRightIcon sx={{ ml: 'auto' }} />}
								</Box>
							))}
						</Box>
					))}
				</Box>
			</Menu>
		</Box>
	);
};

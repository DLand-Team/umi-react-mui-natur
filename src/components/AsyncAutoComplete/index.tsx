import { useHttp } from '@/utils/hooks';
import type { ChipProps, TextFieldProps } from '@mui/material';
import {
	Box,
	Chip,
	ClickAwayListener,
	InputAdornment,
	inputBaseClasses,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Popper,
	svgIconClasses,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { merge } from 'lodash';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import type { BaseInputProps } from '../Form';
import { SpiningLoadingSvg } from '../Loading/box';

type CommonProps<V extends object> = {
	api: (params: { pageSize: number; pageNum: number; keyword: string }) => Promise<V[]>;
	pageSize?: number;
	idKey?: keyof V;
	labelKey?: keyof V;
	valueKey?: keyof V;
	placeholder?: string;
	renderLabel?: (v: V) => React.ReactNode;
	ChipProps?: ChipProps;
	TextFieldProps?: TextFieldProps;
	limitTags?: number;
};

export type AsyncAutoCompleteProps<V extends object> =
	| ({
			multiple?: false;
	  } & BaseInputProps<V> &
			CommonProps<V>)
	| ({
			multiple: true;
	  } & BaseInputProps<V[]> &
			CommonProps<V>);

export default function AsyncAutoComplete<V extends object>(props: AsyncAutoCompleteProps<V>) {
	const {
		api,
		pageSize = 10,
		idKey = 'id' as keyof V,
		labelKey = 'label' as keyof V,
		value,
		onBlur,
		placeholder,
		renderLabel = (v) => v[labelKey],
	} = props;
	const [state, setState] = useState({
		open: false,
		options: [] as V[],
		anchorEl: null as HTMLElement | null,
		inputed: false,
		hasMore: true,
	});

	const refState = React.useRef({
		focuing: false,
		seleting: false,
	});

	const [params, setParams] = useImmer({
		pageSize,
		pageNum: 1,
		keyword: '',
	});

	const fetchFn = async (next: boolean = false) => {
		if (!state.hasMore) {
			return;
		}
		const newPageNum = next ? params.pageNum + 1 : params.pageNum;
		const res = await api({
			...params,
			pageNum: newPageNum,
			keyword: state.inputed ? params.keyword : '',
		});
		if (newPageNum > 1) {
			setState((s) => ({
				...s,
				options: s.options.concat(res),
			}));
		} else {
			setState((s) => ({
				...s,
				options: res,
			}));
		}
		setParams((s) => {
			s.pageNum = newPageNum;
		});
		setState((s) => ({
			...s,
			hasMore: params.keyword ? true : res.length === params.pageSize,
		}));
	};

	const { loading, fn: fetchOptions } = useHttp(fetchFn, {
		auto: false,
		debounceTime: 300,
	});

	React.useEffect(() => {
		setParams((s) => {
			if (!props.multiple) {
				s.keyword = (props.value?.[labelKey] as string) || '';
			}
		});
	}, [labelKey, value]);

	const filtedOptions = useMemo(() => {
		if (state.inputed) {
			return state.options.filter((o) => (o[labelKey] as string).toLowerCase().includes(params.keyword.toLowerCase()));
		}
		return state.options;
	}, [state.inputed, state.options, labelKey, params.keyword]);

	const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const el = e.currentTarget;
		if (el.offsetHeight + el.scrollTop + 80 > el.scrollHeight && !loading) {
			fetchOptions(true);
		}
	};

	const targetIsSelected = (t: V) => {
		if (props.multiple === true) {
			return !!props?.value?.map((i) => i[idKey]).includes(t[idKey]);
		}
		return t[idKey] === props.value?.[idKey];
	};

	const onItemClick = (t: V) => {
		if (props.multiple === true) {
			if (props?.value?.find((i) => i[idKey] === t[idKey])) {
				props?.onChange?.(props.value.filter((i) => i[idKey] !== t[idKey]));
			} else {
				props?.onChange?.((props?.value || []).concat(t));
			}
		} else {
			props?.onChange?.(t);
		}
		if (params.keyword) {
			setParams((s) => {
				s.keyword = '';
			});
		}
	};

	const showOverNumber = props.multiple === true && props.limitTags && (props.value?.length || 0) > props.limitTags;

	return (
		<>
			<TextField
				placeholder={placeholder}
				value={params.keyword}
				{...props.TextFieldProps}
				onChange={(e) => {
					refState.current.focuing = true;
					setState((s) => ({
						...s,
						inputed: true,
						options: [],
					}));
					setParams((s) => {
						s.keyword = e.target.value;
						s.pageNum = 1;
					});
					fetchOptions();
				}}
				onFocus={(e) => {
					if (refState.current.focuing || refState.current.seleting) {
						return;
					}
					refState.current.focuing = true;
					setState((s) => ({
						...s,
						open: true,
						options: [],
						anchorEl: e.target.parentElement,
						hasMore: true,
					}));
					if (params.pageNum !== 1) {
						setParams((s) => {
							s.pageNum = 1;
						});
					}
					fetchOptions();
				}}
				onBlur={() => {
					setTimeout(() => {
						refState.current.focuing = false;
						if (refState.current.seleting) {
							return;
						}
						setState((s) => ({
							...s,
							open: false,
							inputed: false,
							anchorEl: null,
						}));
						onBlur?.();
					}, 30);
				}}
				inputProps={merge(
					{ style: { paddingLeft: 0, width: 'auto', minWidth: 100 } },
					props.TextFieldProps?.inputProps,
				)}
				InputProps={merge(
					{
						startAdornment:
							props.multiple === true && props.value?.length ? (
								<InputAdornment position="start" sx={{ height: 'auto', maxHeight: 'none', py: 1 / 2 }}>
									<Box display={'flex'} gap={'2px'} maxWidth={showOverNumber ? 230 : 210}>
										<Box flex={1} display={'flex'} flexWrap={'wrap'} gap={'2px'}>
											{props.value?.slice(0, props.limitTags || undefined).map?.((i) => (
												<Chip
													key={i[idKey] as string}
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
													{...props.ChipProps}
													label={renderLabel(i) as React.ReactNode}
													onDelete={() => {
														onItemClick(i);
													}}
												/>
											))}
										</Box>
										{showOverNumber ? <Box flex={'none'}>{`+${props.value.length - props.limitTags!}`}</Box> : null}
									</Box>
								</InputAdornment>
							) : undefined,
						sx: {
							pl: 1,
							maxWidth: 400,
							maxHeight: 'none',
							height: 'auto',
							[`.${inputBaseClasses.input}`]: {
								alignSelf: 'flex-end',
							},
						},
					},
					props.TextFieldProps?.InputProps,
				)}
			/>
			<Popper
				sx={{ zIndex: 1500 }}
				open={state.open && !!state.anchorEl}
				anchorEl={state.anchorEl}
				placement="bottom-start"
				modifiers={[
					{
						name: 'offset',
						options: {
							offset: [0, 10],
						},
					},
				]}
			>
				<ClickAwayListener
					onClickAway={() => {
						setTimeout(() => {
							if (refState.current.focuing) {
								return;
							}
							refState.current.seleting = false;
							setState((s) => ({
								...s,
								open: false,
								anchorEl: null,
							}));
						}, 30);
					}}
				>
					<Box
						component={Paper}
						elevation={24}
						minWidth={state.anchorEl?.offsetWidth}
						bgcolor={'#fff'}
						minHeight={50}
						sx={{ overflowY: 'auto' }}
						maxHeight={300}
						onScroll={onScroll}
					>
						<List sx={{ px: 1 }}>
							{filtedOptions.map((o) => (
								<ListItem key={o[idKey] as string} sx={{ mb: 0.5 }} disablePadding>
									<ListItemButton
										onClick={() => {
											refState.current.seleting = true;
											onItemClick(o);
											state.anchorEl?.querySelector('input')?.focus();
										}}
										selected={targetIsSelected(o)}
										sx={{ p: '2px 12px', borderRadius: 0.5 }}
									>
										<ListItemText primary={renderLabel(o) as React.ReactNode} />
									</ListItemButton>
								</ListItem>
							))}
						</List>

						{loading ? (
							<Box height={30} mb={1} display={'flex'} justifyContent={'center'}>
								<SpiningLoadingSvg width={30} height={30} />
							</Box>
						) : !filtedOptions.length ? (
							<Box height={50} color={'text.disabled'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
								No Data
							</Box>
						) : null}
					</Box>
				</ClickAwayListener>
			</Popper>
		</>
	);
}

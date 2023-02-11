import { TextField, Button } from "@mui/material";
import type { ChangeEvent, MouseEvent } from "react";


export interface SearchInputProps {
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
	onSearch?: (event: MouseEvent<any>) => any;
	loading?: boolean;
}

export function SearchInput({value, onChange, onSearch, loading}: SearchInputProps) {
	return (
		<div>
			<TextField size={'small'} sx={{pr: 1}} value={value} onChange={onChange} />
			<Button onClick={onSearch} disabled={loading}>Search</Button>
		</div>
	)
}
import type { DataGridProps, GridValidRowModel} from '@mui/x-data-grid';
import { useGridSelector } from '@mui/x-data-grid';
import { GridBody, GridContextProvider, GridFooterPlaceholder, GridHeader, GridRoot } from '@mui/x-data-grid';
import { useDataGridProps } from '@mui/x-data-grid/DataGrid/useDataGridProps';
import { DataGridVirtualScroller } from '@mui/x-data-grid/components/DataGridVirtualScroller'
import { useDataGridComponent } from '@mui/x-data-grid/DataGrid/useDataGridComponent'
import * as React from 'react';
import type { GridStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';


export const gridPinnedColumnsSelector = (state: GridStateCommunity) => state.pinnedColumns;


const DataGridRaw = React.forwardRef(function DataGrid<R extends GridValidRowModel>(
  inProps: DataGridProps<R>,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDataGridProps(inProps);
  const privateApiRef = useDataGridComponent(props.apiRef, props);
	const pinnedColumns = useGridSelector(privateApiRef, gridPinnedColumnsSelector);

  return (
    <GridContextProvider privateApiRef={privateApiRef} props={props}>
      <GridRoot className={props.className} style={props.style} sx={props.sx} ref={ref}>
        <GridHeader />
        <GridBody VirtualScrollerComponent={DataGridVirtualScroller} ColumnHeadersProps={{ pinnedColumns }} />
        <GridFooterPlaceholder />
      </GridRoot>
    </GridContextProvider>
  );
});


interface DataGridComponent {
  <R extends GridValidRowModel = any>(
    props: DataGridProps<R> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element;
  propTypes?: any;
}


export const MyDataGrid = React.memo(DataGridRaw) as DataGridComponent;

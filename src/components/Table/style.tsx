import { styled } from '@mui/material';
import { LoadingBox } from '../Loading/box';

const borderColor = 'rgba(224, 224, 224, 1)';
const fixShadowColor = 'rgba(5,5,5,.06)';

export const TableBox = styled(LoadingBox)`
	.mui-table {
		
		&-cell {
			&-fix-left,
			&-fix-right {
				z-index: 1;
				background-color: #fff;
			}

			&-fix-right:last-child:not(&-fix-sticky) {
				border-right-color: transparent;
			}
			.mui-table-rtl & {
				&-fix-right:last-child {
					border-right-color: ${borderColor};
				}
				&-fix-left:last-child {
					border-left-color: transparent;
				}
			}
			&-fix-left-first {
				.mui-table-rtl & {
					/* box-shadow: 1px 0 0 ${borderColor}; */
				}
			}

			&-fix-left-first::after,
			&-fix-left-last::after {
				position: absolute;
				top: 0;
				right: -1px;
				bottom: -1px;
				width: 20px;
				transform: translateX(100%);
				transition: box-shadow 0.3s;
				content: '';
				pointer-events: none;
			}

			&-fix-left-all::after {
				display: none;
			}

			&-fix-left-first,
			&-fix-left-last {
				/* box-shadow: 1px 0 0 ${borderColor}; */

			}

			&-fix-right-first,
			&-fix-right-last {
				/* box-shadow: -1px 0 0 ${borderColor}; */

				.mui-table-rtl & {
					box-shadow: none;
				}

				&::after {
					position: absolute;
					top: 0;
					bottom: -1px;
					left: -1px;
					width: 20px;
					transform: translateX(-100%);
					transition: box-shadow 0.3s;
					content: '';
					pointer-events: none;
				}
			}

			&-ellipsis {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				&.mui-table-cell-fix-left-first,
				&.mui-table-cell-fix-left-last,
				&.mui-table-cell-fix-right-first,
				&.mui-table-cell-fix-right-last {
					overflow: visible;

					.mui-table-cell-content {
						display: block;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				// Fixed first or last should special process
			}
			
			&&-row-hover {
				background: rgba(255, 0, 0, 0.05);
			}
		}

		&-ping-left {
			.mui-table-cell-fix-left-first::after,
			.mui-table-cell-fix-left-last::after {
				box-shadow: inset 10px 0 8px -8px ${fixShadowColor};
			}
		}

		&-ping-right {
			.mui-table-cell-fix-right-first::after,
			.mui-table-cell-fix-right-last::after {
				box-shadow: inset -10px 0 8px -8px ${fixShadowColor};
			}
		}
		&-has-fix-left {
			.mui-table-expanded-row {
				.mui-table-expanded-row-fixed {
					position: static !important;
				}
			}
		}
	}
`;

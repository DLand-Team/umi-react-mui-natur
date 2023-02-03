import type { ConfirmDialogProps } from '@/components/Dialog';
import { ConfirmDialog } from '@/components/Dialog';

export class Modal {
	static confirm(arg: ConfirmDialogProps) {
		return ConfirmDialog(arg);
	}
}

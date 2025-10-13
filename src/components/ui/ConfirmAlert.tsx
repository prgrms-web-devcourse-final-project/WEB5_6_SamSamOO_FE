'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from './AlertDialog';
import { useAlertStore } from '@/store/useAlertStore';

function ConfirmAlert() {
  const { title, open, message, onConfirm, close } = useAlertStore();

  return (
    <AlertDialog
      open={open}
      onOpenChange={(v) => {
        if (!v) close();
      }}
    >
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ConfirmAlert;

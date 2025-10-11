import { useState } from 'react';

export function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const showAlert = (msg: string, onConfirmAction?: () => void) => {
    setMessage(msg);
    setOnConfirm(() => onConfirmAction || (() => {}));
    setOpen(true);
  };

  return { open, setOpen, message, onConfirm, showAlert };
}

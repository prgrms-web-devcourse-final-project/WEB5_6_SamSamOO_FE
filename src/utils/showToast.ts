import { toast } from 'sonner';

export function showErrorToast(message: string) {
  toast.error(message, {
    duration: 2500,
    position: 'top-right',
    className: '!border-2 whitespace-pre-line',
    style: {
      '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
      '--normal-text': 'var(--destructive)',
      '--normal-border': 'var(--destructive)',
    } as React.CSSProperties,
  });
}

export function showSuccessToast(message: string) {
  toast.success(message, {
    duration: 2500,
    position: 'top-right',
    className: '!border-2 whitespace-pre-line',
    style: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
      '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
    } as React.CSSProperties,
  });
}

export function showInfoToast(message: string) {
  toast.info(message, {
    duration: 2500,
    position: 'top-right',
    className: '!border-2 whitespace-pre-line',
    style: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
      '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
    } as React.CSSProperties,
  });
}

export function showWarningToast(message: string) {
  toast.warning(message, {
    duration: 2500,
    position: 'top-right',
    className: '!border-2 whitespace-pre-line',
    style: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
      '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
    } as React.CSSProperties,
  });
}

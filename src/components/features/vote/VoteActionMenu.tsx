'use client';

import { useEffect, useState } from 'react';
import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import VoteMenu from '@/assets/icons/voteMenu.svg';
import { useVoteModalStore, type VoteDraft } from '@/store/voteModalStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/features/vote/Dropdown';

const LABEL_MENU = '\uD22C\uD45C \uBA54\uB274';
const LABEL_EDIT = '\uC218\uC815';
const LABEL_DELETE = '\uC0AD\uC81C';

interface VoteActionMenuProps {
  draft?: VoteDraft;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Vote card action menu (edit / delete)
 */
export default function VoteActionMenu({
  draft,
  onEdit,
  onDelete,
  className,
}: VoteActionMenuProps) {
  const { openEdit } = useVoteModalStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => setOpen(false);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [open]);

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={LABEL_MENU}
          className={`flex items-center justify-center rounded-full p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#333] transition-colors focus:outline-none ${className}`}
        >
          <VoteMenu className="scale-200 text-primary-gray1 dark:text-primary-white" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[140px] border border-primary-white"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              if (onEdit) {
                onEdit();
                return;
              }

              if (draft) {
                openEdit(draft);
              }
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <PencilLineIcon className="w-4 h-4 text-brand-primary dark:text-brand-accent" />
            <span>{LABEL_EDIT}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              onDelete?.();
            }}
            className="flex items-center gap-2 cursor-pointer text-[#d93a3a]"
          >
            <Trash2Icon className="w-4 h-4" />
            <span>{LABEL_DELETE}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

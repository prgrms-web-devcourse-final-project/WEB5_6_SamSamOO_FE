'use client';

import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import VoteMenu from '@/assets/icons/voteMenu.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/features/vote/Dropdown';

interface VoteActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * 투표 카드 우측 상단 메뉴 (수정 / 삭제)
 */
export default function VoteActionMenu({ onEdit, onDelete, className }: VoteActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="투표 메뉴"
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
            onSelect={(e) => {
              e.preventDefault();
              onEdit?.();
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <PencilLineIcon className="w-4 h-4 text-brand-primary dark:text-brand-accent" />
            <span>수정</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              onDelete?.();
            }}
            className="flex items-center gap-2 cursor-pointer text-[#d93a3a]"
          >
            <Trash2Icon className="w-4 h-4" />
            <span>삭제</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

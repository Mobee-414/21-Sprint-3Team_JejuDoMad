import { ReactNode, RefObject } from "react";

export interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  menuRef: RefObject<HTMLUListElement | null>;
  matchTriggerWidth?: boolean;
}

export interface DropdownProps {
  children: ReactNode;
  className?: string;
  matchTriggerWidth?: boolean;
}

export interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

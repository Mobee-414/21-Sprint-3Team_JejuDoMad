import type { ReactNode, Dispatch, SetStateAction } from "react";

export interface DialogContextValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export interface DialogTriggerProps {
  children: ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
}

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
  showOverlay?: boolean;
}
export interface DialogIconProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}
"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { DropdownContextValue, DropdownProps, ItemProps } from "./types";

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown 내부에서만 사용");
  return context;
};

const DropdownRoot = ({ children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        close();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, close]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef, menuRef }}>
      <div className={cn("relative inline-flex text-left", className)}>{children}</div>
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children, className }: DropdownProps) => {
  const { toggle, triggerRef, isOpen } = useDropdown();

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center outline-none transition-colors rounded cursor-pointer",
        className
      )}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
};

const Menu = ({ children, className }: DropdownProps) => {
  const { isOpen, triggerRef, menuRef } = useDropdown();

  useLayoutEffect(() => {
  if (!isOpen) return;

  const updatePosition = () => {
    if (!triggerRef.current || !menuRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = menuRef.current.offsetWidth || 130;
    const padding = 8;

    let left = rect.right - menuWidth;
    if (left < padding) left = rect.left;
    left = Math.max(padding, Math.min(left, window.innerWidth - menuWidth - padding));

    menuRef.current.style.top = `${rect.bottom + 4}px`;
    menuRef.current.style.left = `${left}px`;
    menuRef.current.style.visibility = 'visible';
  };

  updatePosition();
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);

  return () => {
    window.removeEventListener('resize', updatePosition);
    window.removeEventListener('scroll', updatePosition, true);
  };
}, [isOpen, triggerRef, menuRef]);


  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <ul
      ref={menuRef}
      role="menu"
      style={{ position: 'fixed', top: 0, left: 0, visibility: 'hidden' }}
     className={cn(
  "z-50 min-w-32 overflow-hidden rounded border border-border bg-popover text-popover-foreground shadow-md p-1",
  className
)}
    >
      {children}
    </ul>,
    document.body
  );
};
Menu.displayName = "Dropdown.Menu";

const Item = ({ children, onClick, className, isActive }: ItemProps) => {
  const { close } = useDropdown();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      style={{ cursor: 'pointer' }}
      className={cn(
        "rounded px-4 py-2.5 text-base text-foreground",
        "hover:bg-muted transition-colors text-center",
        isActive && "bg-muted",
        className
      )}
    >
      {children}
    </li>
  );
};
Item.displayName = "Dropdown.Item";

export { DropdownRoot, Trigger, Menu, Item };
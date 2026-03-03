import { useCallback, useState } from 'react';

interface UseDisclosureReturn {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
}

/**
 * Controls boolean open/close state for modals, drawers, dropdowns, etc.
 */
export const useDisclosure = (initialState = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => { setIsOpen(true); }, []);
  const close = useCallback(() => { setIsOpen(false); }, []);
  const toggle = useCallback(() => { setIsOpen((prev) => !prev); }, []);

  return { isOpen, open, close, toggle };
};

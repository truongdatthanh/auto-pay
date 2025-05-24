import { create } from 'zustand';

type FabStore = {
  isOpen: boolean;
  visible: boolean;
  setOpen: (open: boolean) => void;
  setVisible: (visible: boolean) => void;
};

export const useFabStore = create<FabStore>((set) => ({
  isOpen: false,
  visible: true, // mặc định là hiển thị
  setOpen: (open) => set({ isOpen: open }),
  setVisible: (visible) => set({ visible }),
}));
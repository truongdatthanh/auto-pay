import { create } from 'zustand';

type FabStore = {
  isOpen: boolean;
  visible: boolean;
  offsetX: number;
  offsetY: number;
  setOpen: ( open: boolean ) => void;
  setVisible: ( visible: boolean ) => void;
  setOffset: ( x: number, y: number ) => void;
};

export const useFabStore = create<FabStore>( ( set ) => ( {
  isOpen: false,
  visible: true,
  offsetX: 0, // thêm vị trí mặc định
  offsetY: 0,
  setOpen: ( open ) => set( { isOpen: open } ),
  setVisible: ( visible ) => set( { visible } ),
  setOffset: ( x, y ) => set( { offsetX: x, offsetY: y } ), // setter cho vị trí
} ) );

import { IBankingTransaction } from '@/interface/IBanking';
import { create } from 'zustand';


type CardStore = {
  selectedCard: IBankingTransaction | null;
  setSelectedCard: (card: IBankingTransaction) => void;
};

export const useCardStore = create<CardStore>((set) => ({
  selectedCard: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
}));
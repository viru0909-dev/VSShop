import { create } from 'zustand';

const useUIStore = create((set) => ({
    isAIChatOpen: false,
    toggleAIChat: () => set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),
    setAIChatOpen: (isOpen) => set({ isAIChatOpen: isOpen }),
}));

export default useUIStore;

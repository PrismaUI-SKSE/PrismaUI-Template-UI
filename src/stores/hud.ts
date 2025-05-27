import { create } from 'zustand';

export type HUDStore = {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  mana: number;
  maxMana: number;
};

export const useHUDStore = create<HUDStore>(() => ({
  health: 65,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  mana: 23,
  maxMana: 100,
}));

export const setHUDValue = (key: keyof HUDStore, value: number) =>
  useHUDStore.setState({ [key]: value });

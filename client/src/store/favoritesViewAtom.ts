import { atom } from 'jotai';

export const showFavoritesOnlyAtom = atom(false);

export const toggleFavoritesViewAtom = atom(
  null,
  (get, set) => {
    const current = get(showFavoritesOnlyAtom);
    set(showFavoritesOnlyAtom, !current);
  }
);

import { atom } from 'jotai';

// Atom to track whether we're showing favorites only
export const showFavoritesOnlyAtom = atom(false);

// Derived atom to toggle the favorites view
export const toggleFavoritesViewAtom = atom(
  null,
  (get, set) => {
    const current = get(showFavoritesOnlyAtom);
    set(showFavoritesOnlyAtom, !current);
  }
);

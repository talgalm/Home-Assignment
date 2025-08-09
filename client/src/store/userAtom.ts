import { atomWithStorage } from 'jotai/utils';

export interface User {
  id: number;
  username: string;
}

export const userAtom = atomWithStorage<User | null>('user', null);
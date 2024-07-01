import { atom } from 'recoil';

type todoStateType = {
  state: boolean;
  value: string;
};

export const todoState = atom<todoStateType[]>({
  key: 'todoState',
  default: [],
});

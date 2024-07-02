import { selector } from 'recoil';
import { todoState } from '../atoms/sampleAtoms';

export const todoSortState = selector({
  key: 'todoSortState',
  get: ({ get }) => {
    const data = get(todoState);
    const result = data.filter(v => v.state === true);
    return result;
  },
});

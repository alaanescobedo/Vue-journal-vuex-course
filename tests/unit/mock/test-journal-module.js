import { getEntriesByTerm } from '../../../src/modules/daybook/store/journal/getters';
import { journalState } from '../mock/test-journal-state';

const journalModule = {
  namespaced: true,
  getters: {
    getEntriesByTerm,
  },
  state: () => ({
    isLoading: false,
    entries: journalState.entries,
  }),
};

export default journalModule;

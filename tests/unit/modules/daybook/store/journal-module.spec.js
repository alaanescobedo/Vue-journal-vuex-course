import { createStore } from 'vuex';
import journalModule from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock/test-journal-state';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

describe('Vuex - Journal module', () => {
  //Basicas
  test('este es el estado inicial', () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBe(false);
    expect(entries).toEqual(journalState.entries);
  });
  //Mutations
  test('mutations: setEntries - Las entradas se colocan en el state', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit('journal/setEntries', journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBe(false);
  });
  test('mutations: updateEntry - Las entradas se actualizan correctamente', () => {
    // Create store
    const store = createVuexStore(journalState);
    // Create updated entry - mock
    const updatedEntry = {
      id: '-Mi023nECy35q-nhyISU',
      text: 'Angular - Actualizado ',
    };

    // Commit de la mutacion
    store.commit('journal/updateEntry', updatedEntry);

    // Expects
    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((e) => e.id === updatedEntry.id)).toEqual(updatedEntry);
  });
  test('mutations: addEntry', () => {
    const store = createVuexStore(journalState);

    const entryToBeAdded = {
      id: 'FGH456',
      text: 'Nueva Entrada - Vue ',
    };

    store.commit('journal/addEntry', entryToBeAdded);

    // Expect
    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(3);
    expect(storeEntries.find((entry) => entry.id === entryToBeAdded.id)).toEqual(entryToBeAdded);
  });
  test('mutations: deleteEntry', () => {
    const store = createVuexStore(journalState);

    const entryToBeDeleted = {
      id: '-Mi023nECy35q-nhyISU',
    };

    store.commit('journal/deleteEntry', entryToBeDeleted.id);

    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(1);
    expect(storeEntries.find((entry) => entry.id === entryToBeDeleted.id)).toBeFalsy();
  });
  //Getters
  test('getters: getEntriesByTerm', () => {
    const store = createVuexStore(journalState);
    const [entry1, entry2] = store.state.journal.entries;
    const entriesByTerm = store.getters['journal/getEntriesByTerm'];

    expect(entriesByTerm('').length).toBe(2);
    expect(entriesByTerm('Vue').length).toBe(1);
    expect(entriesByTerm('Angular')).toEqual([entry1]);
    expect(entriesByTerm('Vue')).toEqual([entry2]);
  });
  test('getters: getEntryByID', () => {
    const store = createVuexStore(journalState);
    const [entry1, entry2] = store.state.journal.entries;
    const entryById = store.getters['journal/getEntryById'];

    expect(entryById('-Mi023nECy35q-nhyISU')).toEqual(entry1);
    expect(entryById('-Mi02ma-Uz8SyYN81TYY')).toEqual(entry2);
  });
  //Actions
  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch('journal/loadEntries');

    expect(store.state.journal.entries.length).toBe(2);
  });
  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: '-Mi023nECy35q-nhyISU',
      date: 1629957662921,
      picture:
        'https://res.cloudinary.com/desxpqy6n/image/upload/v1629919238/Test-1/ui2zibpqlaxujasrl2vx.png',
      text: 'Angular -- Actualizado',
      campoAFiltar: true,
      esteCampoNoPasara: true,
    };

    await store.dispatch('journal/updateEntry', updatedEntry);
    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((entry) => entry.id === updatedEntry.id)).toEqual({
      id: '-Mi023nECy35q-nhyISU',
      date: 1629957662921,
      text: 'Angular -- Actualizado',
      picture:
        'https://res.cloudinary.com/desxpqy6n/image/upload/v1629919238/Test-1/ui2zibpqlaxujasrl2vx.png',
    });
  });
  test('actions: createEntry', async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: 1629859868351,
      text: 'Test -- Created',
    };

    const newEntryId = await store.dispatch('journal/createEntry', newEntry);

    const storeEntries = store.state.journal.entries;

    expect(typeof newEntryId).toBe('string');
    expect(storeEntries.find((entry) => entry.id === newEntryId)).toBeTruthy();
    expect(storeEntries.length).toBe(3);
  });
  test('actions: deleteEntry', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch('journal/loadEntries');
    const journalStore = store.state.journal;

    const entryToBeDeleted = journalStore.entries.find((entry) => entry.text === 'Test -- Created');

    await store.dispatch('journal/deleteEntry', entryToBeDeleted.id);

    expect(journalStore.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((entry) => entry.id === entryToBeDeleted.id)
    ).toBeFalsy();
  });
});

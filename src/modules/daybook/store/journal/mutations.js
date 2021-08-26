// const myMutation = (state) => {
//     return
// }

export const setEntries = (state, entries) => {
  state.entries = [];
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
  console.log('Entradas cargadas');
};
export const updateEntry = (state, entryUpdated) => {
  const index = state.entries.map((entry) => entry.id).indexOf(entryUpdated.id);

  state.entries[index] = entryUpdated;
  console.log('Entrada Actualizada');
};
export const addEntry = (state, entryCreated) => {
  state.entries = [entryCreated, ...state.entries];
  console.log('Entrada agregada');
};
export const deleteEntry = (state, deleteEntryID) => {
  const newEntries = state.entries.filter((entry) => entry.id !== deleteEntryID);

  state.entries = newEntries;

  console.log('Entrada borrada');
};

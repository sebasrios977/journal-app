import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Note {
    title: string,
    body: string,
    date: number,
    id?: string,
    imageUrls?: string[],
}

export interface JournalState {
  isSaving: boolean,
  savedMessage: string,
  notes: Note[],
  active: Note | null,
}

const initialState: JournalState = {
  isSaving: false,
  savedMessage: '',
  notes: [],
  active: null,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<any>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<any>) => {
      state.active = action.payload;
      state.savedMessage = '';
    },
    setNotes: (state, action: PayloadAction<any>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = '';
    },
    noteUpdated: (state, action: PayloadAction<any>) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if(note.id === action.payload.id) return action.payload;
        return note;
      });
      state.savedMessage = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action: PayloadAction<any>) => {
      state.active?.imageUrls?.push(...action.payload);
      state.isSaving = false;
    },
    clearNotesLogOut: (state) => {
      state.isSaving = false;
      state.savedMessage = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action: PayloadAction<any>) => {
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
})

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, clearNotesLogOut, deleteNoteById } = journalSlice.actions

export default journalSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  modalType: null,
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { modalType, id } = payload;
      state.isOpened = true;
      state.modalType = modalType;
      state.id = id ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.modalType = null;
      state.id = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;

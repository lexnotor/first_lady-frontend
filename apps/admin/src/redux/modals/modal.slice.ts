import { createSlice } from "@reduxjs/toolkit";

enum ModalID {
    SHOW_MAP,
}

type ModalData = { modal_id: ModalID; payload?: any };

type ModalState = ModalData & { thread: ModalData[] };

const initialState: ModalState = { modal_id: null, thread: [], payload: null };

const modalSlice = createSlice({
    initialState,
    name: "modalmanager",
    reducers: {
        openModal: (state, { payload }: { payload: ModalData }) => {
            if (state.modal_id) state.thread.push(payload);
            else {
                state.modal_id = payload.modal_id;
                state.payload = payload.payload;
            }
        },
        closeModal: (state) => {
            const current = state.thread.shift();
            state.modal_id = null;
            state.payload = null;
            if (current) {
                state.modal_id = current.modal_id;
                state.payload = current.payload;
            }
        },
    },
});

// sync actions
export const { closeModal, openModal } = modalSlice.actions;
// types
export { ModalID };
// reducer
export default modalSlice.reducer;

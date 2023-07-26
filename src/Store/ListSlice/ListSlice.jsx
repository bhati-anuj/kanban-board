import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "list",
  initialState: [],
  reducers: {
    
    addMainList(state, action) {
      state.push(action.payload);
    },

    addCard(state, action) {
      const data = {
        cardName: action.payload.name,
        cardID: action.payload.cardId,
        listId: action.payload.listID,
      };
      const value = state.find((e) => e.ID === data.listId);
      if (value) {
        value.innerCard.push(data);
        value.newCardInputField = true;
      }
    },

    newCardInsert(state, action) {
      const value = state.find((e) => e.ID === action.payload);
      value.newCardInputField = false;
    },

    
  },
});

export { ListSlice };
export const { addMainList, addCard, newCardInsert, addActiveCard } =
  ListSlice.actions;

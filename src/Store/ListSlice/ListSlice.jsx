import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "list",
  initialState: [],
  reducers: {
    addMainList(state, action) {
      state.push(action.payload);
    },

    addCard(state, action) {
      const { listID } =
        action.payload;
      const value = state.find((e) => e.ID === listID);
      if (value) {
        value.innerCard.push(action.payload);
        value.newCardInputField = true;
      }
    },

    newCardInsert(state, action) {
      const value = state.find((e) => e.ID === action.payload);
      if(value){

        value.newCardInputField = !value.newCardInputField;
      }
    },

    addDescription(state, action) {
      const descData = {
        descText: action.payload.text,
        descListID: action.payload.descListId,
        descCardID: action.payload.descCardId,
      };

      const value = state.find((e) => e.ID === descData.descListID);

      if (value) {
        const cardValue = value.innerCard.find(
          (item) => item.cardID === descData.descCardID
        );

        if (cardValue) {
          cardValue.descriptionData.text = descData.descText;
        }
      }
    },

    deleteList(state, action) {
      const { deleteListID } = action.payload;
      state = state.filter((e) => e.ID !== deleteListID);
      return state;
    },

    deleteCard(state, action) {
      const { deleteCardID, deleteListID } = action.payload;

      const value = state.find((e) => e.ID === deleteListID);

      if (value) {
        value.innerCard = value.innerCard.filter(
          (item) => item.cardID !== deleteCardID
        );
      }
    },

    updateListTitle(state, action) {
      const { item, title } = action.payload;
      const value = state.find((e) => e.ID === item);

      if (value) {
        value.listtitle = title;
        value.toggleListTitle = true;
      }
    },

    toggleList(state, action) {
      const value = state.find((e) => e.ID === action.payload);

      value && (value.toggleListTitle = !value.toggleListTitle);
    },

    toggleCard(state, action) {
      const reqList = state.find((e) => e.ID === action.payload.listID);

      if (reqList) {
        const reqCard = reqList.innerCard.find(
          (e) => e.cardID === action.payload.cardID
        );

        if (reqCard) {
          reqCard.toggleCardTitle = !reqCard.toggleCardTitle;
        }
      }
    },

    updateCard(state, action) {
      const { cardData, updatedCardTitle } = action.payload;
      const reqList = state.find((e) => e.ID === cardData.listID);

      if (reqList) {
        const reqCard = reqList.innerCard.find(
          (e) => e.cardID === cardData.cardID
        );

        if (reqCard) {
          reqCard.cardName = updatedCardTitle;
          reqCard.toggleCardTitle = true;
        }
      }
    },
  },
});

export { ListSlice };
export const {
  addMainList,
  addCard,
  newCardInsert,
  addActiveCard,
  addDescription,
  deleteList,
  deleteCard,
  updateListTitle,
  toggleList,
  toggleCard,
  updateCard,
} = ListSlice.actions;

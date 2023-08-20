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
        descriptionData: action.payload.description,
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
      state = state.filter((e) => e.ID != deleteListID);
      return state;
    },

    deleteCard(state, action) {
      const { deleteCardID, deleteListID } = action.payload;

      const value = state.find((e) => e.ID === deleteListID);

      if (value) {
        value.innerCard = value.innerCard.filter(
          (item) => item.cardID != deleteCardID
        );
      }
    },

    cutCardBtn(state, action) {
      const value = state.find((e) => e.ID === action.payload);
      value.newCardInputField = true;
    },

    updateListTitle(state,action){
      
      const {item,title} = action.payload
      const value = state.find((e) => e.ID === item);
  
      value && (value.listtitle = title);
    }
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
  cutCardBtn,
  updateListTitle,
} = ListSlice.actions;

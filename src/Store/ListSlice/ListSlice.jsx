import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "list",
  initialState: [],
  reducers: {
    addMainList(state, action) {
      state.push(action.payload);
    },

    addCard(state, action) {
      const { listID } = action.payload;
      const value = state.find((e) => e.ID === listID);
      if (value) {
        value.innerCard.push(action.payload);
        value.newCardInputField = true;
      }
    },

    newCardInsert(state, action) {
      const value = state.find((e) => e.ID === action.payload);
      if (value) {
        value.newCardInputField = !value.newCardInputField;
      }
    },

    addDescription(state, action) {
      const { descText, descListID, descCardID } = action.payload;

      const value = state.find((e) => e.ID === descListID);

      if (value) {
        const cardValue = value.innerCard.find(
          (item) => item.cardID === descCardID
        );

        if (cardValue) {
          cardValue.descriptionData.text = descText;
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
    /****************************** Activity Section ***************************** */

    addComment(state, action) {
      const { comment, descListID, descCardID, commentTime, commentBy } =
        action.payload;
      const value = state.find((e) => e.ID === descListID);

      if (value) {
        const cardValue = value.innerCard.find(
          (item) => item.cardID === descCardID
        );

        if (cardValue) {
          cardValue.descriptionData.activityArray.unshift({
            comment,
            commentTime,
            commentBy,
          });
        }
      }
    },

    deleteComments(state, action) {
      const { refFilteredCard, event } = action.payload;
      const value = state.find((e) => e.ID === refFilteredCard.listID);

      if (value) {
        const cardValue = value.innerCard.find(
          (item) => item.cardID === refFilteredCard.cardID
        );

        if (cardValue) {
          cardValue.descriptionData.activityArray =
            cardValue.descriptionData.activityArray.filter(
              (e, index) => index != event
            );
        }
      }
    },

    /************************************** Drag and Drop Reducers**************************** */
    cardDnd(state, action) {
   
      const sourceData = action.payload.source;
      const destiData = action.payload.destination;
      const dragCardID = action.payload.draggableId;

      const value = state.find((e) => e.ID === destiData.droppableId);

      if (value) {
        const cardValue = value.innerCard.find(
          (item) => item.cardID === dragCardID
        );
        if (cardValue) {
          const items = Array.from(value.innerCard);
          const [reorderedItem] = items.splice(sourceData.index, 1);       
          items.splice(destiData.index, 0, reorderedItem);
          value.innerCard = items.slice();
  

        } 
        else {
          const dragList = state.find((e)=>e.ID === sourceData.droppableId );
          if(dragList){
            const dragCard = dragList.innerCard.find((item) => item.cardID ===dragCardID )
      
            if(dragCard){
              value.innerCard.splice(destiData.index, 0,dragCard);
              dragList.innerCard.splice(sourceData.index, 1)
            }
          }
     
        }

        /*************************************Alternative Method ********************************** */
        // const copyArr = JSON.parse(JSON.stringify(value.innerCard));
        // const [removed] = JSON.parse(
        //   JSON.stringify(copyArr.splice(sourceData.index, 1))
        // );
        // copyArr.splice(destiData.index, 0, removed);
        // value.innerCard = JSON.parse(JSON.stringify(copyArr));
        /********************************************************************************************** */
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
  addComment,
  deleteComments,
  cardDnd,
} = ListSlice.actions;

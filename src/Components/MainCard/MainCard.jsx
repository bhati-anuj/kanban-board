import React, { useEffect, useState } from "react";
import "./MainCard.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import {
  addCard,
  addMainList,
  cardDnd,
  deleteCard,
  deleteList,
  newCardInsert,
  toggleList,
  updateListTitle,
} from "../../Store/ListSlice/ListSlice";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const MainCard = () => {
  const [listTitle, setListTitle] = useState();
  const [clicked, setClicked] = useState(false);
  const [cardText, setCardText] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainListDiv = useSelector((state) => {
    return state.mainList;
  });

  const logedUserKey = useSelector((state) => {
    return state.userList.loginKey;
  });

  useEffect(() => {
    if (logedUserKey === false) {
      navigate("/signin");
    }
  });

  console.log(mainListDiv);

  // ********************************** Main List Div******************************************

  function handleListSubmit() {
    dispatch(
      addMainList({
        listtitle: listTitle,
        ID: v4(),
        innerCard: [],
        newCardInputField: true,
        toggleListTitle: true,
      })
    );
    setClicked(!clicked);
  }

  function updateList(item) {
    dispatch(
      updateListTitle({
        item: item,
        title: listTitle,
      })
    );
  }

  function handleListTitle(event) {
    dispatch(toggleList(event));
  }

  // *********************************** Working on Card *****************************************

  const handleCardText = (text) => {
    setCardText(text);
  };

  const handleAddCardTitle = (e) => {
    dispatch(
      addCard({
        cardName: cardText,
        cardID: v4(),
        listID: e.target.id,
        toggleCardTitle: true,
        descriptionData: {
          text: "Description goes here...",
          activityArray: [],
        },
      })
    );
  };

  const handleAddCard = (event) => {
    dispatch(newCardInsert(event.target.id));
  };

  // *****************************************Working on Description Box***************************************************

  function handleDialog(event, ID) {
    setModalShow(true);
    setId({ listId: ID, cardId: event });
  }

  const handleListDelete = (e) => {
    dispatch(deleteList({ deleteListID: e }));
  };

  const handleCardDelete = (idCard, idList) => {
    dispatch(deleteCard({ deleteCardID: idCard, deleteListID: idList }));
  };

  /*************************************** Drag and Drop ************************************* */
  function handleDragEnd(event) {
    if (!event.destination) return;
    dispatch(cardDnd(event));
  }

  return (
    <div className="mainCardContainer">
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex"}} >
          <Droppable droppableId="mainDiv">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <ul style={{ display: "flex", listStyle: "none",border:"2px solid red",width:"100rem" }}>
                  {/*  ****************************************** Main List Map ************************************** */}

                  {mainListDiv.map((e, index) => (
                    <Draggable key={e.ID} draggableId={e.ID} index={index}>
                      {(provided) => (
                        <div
                          key={e.ID}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div id={e.ID} key={index} className="mainListDiv">
                            <div className="list-header">
                              {e.toggleListTitle ? (
                                <h4
                                  id={e.ID}
                                  onClick={(e) =>
                                    handleListTitle(e.currentTarget.id)
                                  }
                                >
                                  {e.listtitle}{" "}{index}
                                </h4>
                              ) : (
                                <form>
                                  <input
                                    type="text"
                                    style={{
                                      width: "100%",
                                      marginBottom: "5px",
                                    }}
                                    onChange={(e) =>
                                      setListTitle(e.currentTarget.value)
                                    }
                                  />
                                  <Button
                                    id={e.ID}
                                    onClick={(e) =>
                                      updateList(e.currentTarget.id)
                                    }
                                    className="btn me-2"
                                  >
                                    Update
                                  </Button>
                                  <svg
                                    id={e.ID}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    className="bi bi-x-circle ms-3 "
                                    viewBox="0 0 16 16"
                                    onClick={(e) =>
                                      handleListTitle(e.currentTarget.id)
                                    }
                                  >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                  </svg>
                                </form>
                              )}

                              <svg
                                id="list-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3-fill list-delete-icon"
                                viewBox="0 0 16 16"
                                onClick={() => handleListDelete(e.ID)}
                              >
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                              </svg>
                            </div>
                            {/**********************************************  Inner Card Map ********************************* */}
                            <Droppable droppableId={e.ID}>
                              {(provided) => (
                                <div
                                  className="outerCardDiv"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {e.innerCard &&
                                    e.innerCard.map((item, index) => (
                                      <Draggable
                                        key={item.cardID}
                                        draggableId={item.cardID}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            key={item.cardID}
                                          >
                                            <div
                                              className="innerCardDiv"
                                              key={item.cardID}
                                            >
                                              <div
                                                id={item.cardID}
                                                className="cardTitleDiv"
                                                onClick={(event) =>
                                                  handleDialog(
                                                    event.currentTarget.id,
                                                    e.ID
                                                  )
                                                }
                                              >
                                                {item.cardName}
                                              </div>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3-fill card-delete-icon"
                                                viewBox="0 0 16 16"
                                                onClick={() =>
                                                  handleCardDelete(
                                                    item.cardID,
                                                    e.ID
                                                  )
                                                }
                                              >
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                              </svg>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}

                                  {e.newCardInputField ? (
                                    <>
                                      <Button
                                        id={e.ID}
                                        onClick={(e) => handleAddCard(e)}
                                        style={{ marginBottom: "8px" }}
                                      >
                                        Add card
                                      </Button>
                                      {/* ************************** Modal ************* */}
                                    </>
                                  ) : (
                                    <form action="submit">
                                      <input
                                        type="text"
                                        onChange={(e) =>
                                          handleCardText(e.currentTarget.value)
                                        }
                                        style={{
                                          width: "90%",
                                          borderRadius: "5px",
                                          marginBottom: "8px",
                                          height: "2.5rem",
                                        }}
                                      />
                                      <Button
                                        id={e.ID}
                                        onClick={(e) => handleAddCardTitle(e)}
                                        style={{ marginBottom: "8px" }}
                                      >
                                        Add Card Title
                                      </Button>

                                      <svg
                                        id={e.ID}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill="currentColor"
                                        className="bi bi-x-circle ms-3 mb-2"
                                        viewBox="0 0 16 16"
                                        onClick={(e) => handleAddCard(e)}
                                      >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                      </svg>
                                    </form>
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                          {/* {provided.placeholder} */}
                        </div>
                        
                      )}    
                    </Draggable>
                  ))}
                  {/* {provided.placeholder} */}
                </ul>

                {!clicked ? (
                  <Button
                    className="m-5"
                    onClick={() => setClicked(!clicked)}
                    style={{ height: "2.5rem" }}
                  >
                    {" "}
                    Add New List{" "}
                  </Button>
                ) : (
                  <div className="listInputDiv">
                    <form action="submit">
                      <input
                        type="text"
                        onChange={(e) => setListTitle(e.currentTarget.value)}
                      />
                      <Button
                        onClick={handleListSubmit}
                        style={{ height: "2.5rem", marginLeft: "10px" }}
                      >
                        Add List
                      </Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-x-circle ms-3 mb-2"
                        viewBox="0 0 16 16"
                        onClick={() => setClicked(!clicked)}
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </form>
                  </div>
                )}

                  {provided.placeholder}  
              </div>
            )}
          </Droppable>
      
        </div>
      </DragDropContext>
      <DescriptionBox
        ids={id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default MainCard;

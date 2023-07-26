import React, { useState } from "react";
import "./MainCard.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import {
  addActiveCard,
  addCard,
  addMainList,
  newCardInsert,
} from "../../Store/ListSlice/ListSlice";
import DescriptionBox from "../DescriptionBox/DescriptionBox";

const MainCard = () => {
  const [listTitle, setListTitle] = useState();
  const [clicked, setClicked] = useState(false);
  const [cardText, setCardText] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [filteredCard, setFilteredCard] = useState({});
  // const [filteredList, setFilteredList] = useState({});

  const dispatch = useDispatch();

  const mainListDiv = useSelector((state) => {
    return state.mainList;
  }); 
  console.log(mainListDiv);

  // ********************************** Main List Div******************************************

  const handleAddList = () => {
    setClicked(!clicked);
  };

  const hadleListTitle = (e) => {
    setListTitle(e);
  };

  function handleListSubmit() {
    dispatch(
      addMainList({
        listtitle: listTitle,
        ID: v4(),
        innerCard: [],
        newCardInputField: true,
      })
    );
    setClicked(!clicked);
  }

  // *********************************** Working on Card *****************************************

  const handleCardText = (text) => {
    setCardText(text);
  };

  const handleAddCardTitle = (e) => {
    dispatch(
      addCard({
        name: cardText,
        cardId: v4(),
        listID: e.target.id,
      })
    );
  };

  const handleAddCard = (event) => {
    dispatch(newCardInsert(event.target.id));
  };

  // *****************************************Working on Description Box***************************************************

  function handleDialog(event, ID) {
    setModalShow(true);
    
    const filteredList = mainListDiv.find((item) => item.ID === ID);
    setFilteredCard(
      filteredList.innerCard.filter((item) => item.cardID === event)
    );
  }

  return (
    <div className="mainCardContainer">
      <div style={{ display: "flex" }}>
        <ul style={{ display: "flex", listStyle: "none" }}>
          {/*  ****************************************** Main Div Map ************************************** */}

          {mainListDiv.map((e) => (
            <li key={e.ID}>
              <div id={e.ID} className="mainListDiv">
                <h4>{e.listtitle}</h4>

                {/**********************************************  Inner Card Map ********************************* */}
                <div className="outerCardDiv">
                  {e.innerCard.map((item) => (
                    <>
                      <div
                        id={item.cardID}
                        className="innerCardDiv"
                        onClick={(event) => handleDialog(event.target.id, e.ID)}
                      >
                        {item.cardName}
                      </div>
                    </>
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
                        onChange={(e) => handleCardText(e.target.value)}
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
                    </form>
                  )}
                </div>
              </div>{" "}
            </li>
          ))}
        </ul>
        {!clicked ? (
          <Button
            className="m-5"
            onClick={handleAddList}
            style={{ height: "2.5rem" }}
          >
            {" "}
            Add New List{" "}
          </Button>
        ) : (
          <form action="submit" style={{ marginTop: "30px" }}>
            <input
              type="text"
              onChange={(e) => hadleListTitle(e.target.value)}
            />
            <Button
              onClick={handleListSubmit}
              style={{ height: "2.5rem", marginLeft: "10px" }}
            >
              Add List
            </Button>
          </form>
        )}
        <DescriptionBox
          // listData={filteredList}
          cardData={filteredCard}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default MainCard;

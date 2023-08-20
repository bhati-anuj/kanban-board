import { htmlToText } from "html-to-text";
import JoditEditor from "jodit-react";
import React, { useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addDescription } from "../../Store/ListSlice/ListSlice";

const DescriptionBox = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState("Description goes here...");
  const [showEditor, setShowEditor] = useState(false);

  const plainText = htmlToText(content);
  const dispatch = useDispatch();

  const listData = useSelector((state) => {
    return state.mainList;
  });



  const activeCard = props.ids;

  let refFilteredList = useRef();
  let refFilteredCard = useRef();
  let refDescriptionText = useRef(); 


  if (props.ids) {
    refFilteredList = listData.find((item) => item.ID === activeCard.listId);
    refFilteredCard = refFilteredList.innerCard.find(
      (item) => item.cardID === activeCard.cardId

    );
    refDescriptionText = refFilteredCard.descriptionData.text;
  }


  const handleSaveBtn = () => {
    const desc = {
      text: plainText,
      descListId : activeCard.listId,
      descCardId:activeCard.cardId,

    };
    dispatch(addDescription(desc)); 
    setShowEditor(!showEditor)
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#212A3E", color: "white" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-window"
            viewBox="0 0 16 16"
            style={{ marginRight: "10px" }}
          >
            <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
            <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z" />
          </svg>
          {refFilteredCard.cardName}
          <p
            style={{ fontWeight: "400", fontSize: "18px", marginLeft: "35px" }}
          >
            {" "}
            from list {refFilteredList.listtitle}{" "}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#394867", color: "white" }}>
        <div className="descriptionDiv" style={{ display: "flex" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-justify-left"
            viewBox="0 0 16 16"
            style={{ marginRight: "10px" }}
          >
            <path
              fillRule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <h5>Description</h5>
        </div>
        {!showEditor ? (
          <p
            onClick={() => setShowEditor(!showEditor)}
            style={{ marginLeft: "35px" }}
          >
           {refDescriptionText}
           
          </p>
        ) : (
          <>
            <div
              className="editorDiv"
              style={{ color: "black", width: "100%" }}
            >
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(e) => setContent(e)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent:"end",
                  marginTop: "10px",
                }}
              >
                <Button
                  className="btn btn-success"
                  style={{ marginRight: "10px" }}
                  onClick={handleSaveBtn}
                >
                  Save
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => setShowEditor(!showEditor)}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}

        <div
          className="activityDiv"
          style={{ display: "flex", marginTop: "25px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-list-ul"
            viewBox="0 0 16 16"
            style={{ marginRight: "10px" }}
          >
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
          <h5>Activity</h5>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#212A3E" }}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DescriptionBox;

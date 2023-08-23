import style from "./DescriptionBox.module.css";
import { htmlToText } from "html-to-text";
import JoditEditor from "jodit-react";
import React, { useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  addDescription,
  deleteComments,
  toggleCard,
  updateCard,
} from "../../Store/ListSlice/ListSlice";
import Avatar from "react-avatar";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)



const DescriptionBox = (props) => {
  const activeCard = props.ids;
  const date = new Date();
  const editor = useRef(null);
  const commentRef = useRef();

  const [content, setContent] = useState("Description goes here...");
  const [showEditor, setShowEditor] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState();
  const [commentBox, setCommentBox] = useState(false);

  const plainText = htmlToText(content);
  const dispatch = useDispatch();

  const listData = useSelector((state) => {
    return state.mainList;
  });

  const userData = useSelector((state) => {
    return state.userList.loginUser;
  });
  console.log(userData);

  let refFilteredList = useRef();
  let refFilteredCard = useRef();
  let refDescriptionText = useRef();
  let allCommentsRef = useRef();

  if (props.ids) {
    refFilteredList = listData.find((item) => item.ID === activeCard.listId);
    if (refFilteredList) {
      refFilteredCard = refFilteredList.innerCard.find(
        (item) => item.cardID === activeCard.cardId
      );
      allCommentsRef = refFilteredCard.descriptionData.activityArray;
    }
    refDescriptionText = refFilteredCard.descriptionData.text;
  }

  const handleSaveBtn = () => {
    const desc = {
      descText: plainText,
      descListID: activeCard.listId,
      descCardID: activeCard.cardId,
    };
    dispatch(addDescription(desc));
    setShowEditor(!showEditor);
  };

  /************************************** Update Card  ************************************************/

  function handleToggleCardTitle(event) {
    dispatch(toggleCard(event));
  }

  function updateCardTitle(event) {
    dispatch(
      updateCard({
        cardData: event,
        updatedCardTitle: newCardTitle,
      })
    );
  }
  /********************************** Acitivity & Comments************************ */

  function handleComment() {
    const commentText = htmlToText(commentRef.current.value);
    const commentData = {
      descListID: activeCard.listId,
      descCardID: activeCard.cardId,
      comment: commentText,
      commentTime : date,
      commentBy : userData.userName,
    };
    dispatch(addComment(commentData));
    setCommentBox(!commentBox);
  }

  function handleDeleteComment(event) {
    dispatch(deleteComments({ refFilteredCard, event }));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
       
        style={{ backgroundColor: "#212A3E", color: "rgb(208, 203, 203)" }}
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
          {refFilteredCard.toggleCardTitle ? (
            <>
              <span onClick={() => handleToggleCardTitle(refFilteredCard)}>
                {refFilteredCard.cardName}
              </span>
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  marginLeft: "35px",
                }}
              >
                {" "}
                <em> from list</em> <u>{refFilteredList.listtitle}</u>{" "}
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                onChange={(e) => setNewCardTitle(e.currentTarget.value)}
              />
              <Button onClick={() => updateCardTitle(refFilteredCard)} className="ms-2">
                Update
              </Button>
              <Button
                className="btn-danger mx-2"
                onClick={() => handleToggleCardTitle(refFilteredCard)}
              >
                Cancel
              </Button>
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#394867", color: "rgb(208, 203, 203)" }}>
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
            style={{ marginLeft: "35px",backgroundColor:"#212a3e",width:"85%",padding:"5px" }}
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
                  justifyContent: "end",
                  marginTop: "10px",
                }}
              >
                <Button
                  className="btn btn-secondary"
                  style={{ marginRight: "10px" }}
                  onClick={handleSaveBtn}
                >
                  Save
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => setShowEditor(!showEditor)}
                >
                  Cancel
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
        <div>
          {!commentBox ? (
            <input
              className={style.commentInput}
              type="text"
              placeholder="Write a comment..."
              onClick={() => setCommentBox(!commentBox)}
            />
          ) : (
            <div style={{ color: "black", width: "100%" }}>
              <JoditEditor ref={commentRef}  />
              <Button className="mx-2 my-2 btn-secondary" onClick={handleComment}>
                Comment
              </Button>
              <Button
                onClick={() => setCommentBox(!commentBox)}
                className="btn-danger"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        {allCommentsRef.length > 0 ? (
          <>
            {allCommentsRef.map((e, index) => {
              return (
                <div className={style.commentList} key={index}>
                  <span>
                    <Avatar
                      className="me-2"
                      name={e.commentBy}
                      round
                      size="40px"
                    />
                    <b>{e.commentBy}</b>
                    <i><ReactTimeAgo date={e.commentTime} locale="en-US" className="ms-2"/></i>
                  </span>
                  <p className={style.commentText}>
                    <i>{e.comment}</i>
                    <span>
                    {/* <i className="bi bi-pencil-square"></i> */}
                    <i
                      className="bi bi-trash mx-3"
                      id={index}
                      onClick={(e) => handleDeleteComment(e.currentTarget.id)}
                    ></i>
                    </span>
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#212A3E" }}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DescriptionBox;

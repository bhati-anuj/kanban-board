import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useSelector } from "react-redux";

const DescriptionBox = (props) => {

  // const listData =useSelector((state) =>{
  //   return state.mainList
  // }) 

  // console.log("data", listData);

  // const activeCard  = props.cardData[0];
  // console.log(activeCard.cardName);

  // const filteredList = listData.find((item) => item.ID === activeCard.listID);
  // console.log("new list",filteredList);
  // const filteredCard = filteredList.innerCard.filter(item =>item.cardID === activeCard.cardID)
  // console.log("new card",filteredCard);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* {activeCard.cardName} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> from list </h4>
        <p>
          Cras mattis consectetur purus sit
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DescriptionBox;

import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const DescriptionBox = (props) => {


  const listData =useSelector((state) =>{
    return state.mainList
  }) 

  console.log("data", listData);

  const activeCard  = props.ids;


     let refFilteredList=useRef()
     let refFilteredCard=useRef()

 
  if(props.ids){
     refFilteredList = listData.find((item) => item.ID === activeCard.listId);
    refFilteredCard = refFilteredList.innerCard.find(item =>item.cardID === activeCard.cardId)
 
  }
console.log(refFilteredCard,refFilteredList);

  return (
    <Modal
    
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {refFilteredCard.cardName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> from list  {refFilteredList.listtitle} </h4>
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

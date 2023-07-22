import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import { v4 } from 'uuid';

const MainCard = () => {
    const [initialState, setInitialState] = useState("List Title");
    const [task, setTask] = useState([]);
    
    

    

    const handleTaskList = () => {
      setTask([...task,initialState]);
      
   
    };

  return (
    <div>
          <h1>Main Card</h1>  
          <div style={{ display: "flex" }}>
        <ul style={{ display: "flex", listStyle: "none" }}>
          {task.map((e) => (
            <li key={v4()}>

              <div
     
              
                id={v4()}
                style={{
                  width: "10rem",
                  height: "10rem",
                  backgroundColor: "red",
                  margin: "1.5rem",
                  textAlign:"center",
                  fontSize:"1.5rem"
                }}
            
              >
                {e}
                
              </div>{" "}
            </li>
          ))}
        </ul>
        <Button className="m-5" onClick={handleTaskList}>
          {" "}
          Add New List{" "}
        </Button>
      </div>
        
    </div>
  )
}

export default MainCard;

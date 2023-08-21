import React from "react";
import style from "../Signup/Signup.module.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUser } from "../../Store/ListSlice/UserSlice";

const Signin = () => {
  const userData = useSelector((state)=>{
    return state.userList.users;
  })


  console.log(userData);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

function handleLogin() {

  const userObj = userData.find((e) =>e.userEmail === emailRef.current.value && e.userPassword === passwordRef.current.value);

  if(userObj){
 
    dispatch(addLoginUser(userObj));
    navigate("/");
  }
  else{
    alert("User not found!")
  }
  
}

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog className={style.modalDialog} size="xl">
        <div className={style.modalDialog}>
          <div className={style.signupDiv}>
            <h1
              className="ms-5"
              style={{
                fontFamily: "'Signika Negative', 'sans-serif'",
                textDecoration: "underline",
              }}
            >
              Sign In
            </h1>

            <div className={style.detailDiv}>
              <label className="position-relative d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-envelope-fill position-absolute h-100 text-muted ml-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
                <input
                  required
                  ref={emailRef}
                  type="email"
                  style={{ paddingLeft: "30px", borderStyle: "none" }}
                  placeholder="Email"
                ></input>
              </label>

              <label className="position-relative d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-key-fill  position-absolute h-100 text-muted ml-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <input
                  required
                  ref={passwordRef}
                  type="password"
                  style={{ paddingLeft: "30px", borderStyle: "none" }}
                  placeholder="Password"
                ></input>
              </label>

              <Button onClick={handleLogin} >Log in</Button>
            </div>

            <span className="ms-5">
              Don't have an account?{" "}
              <Link className="ms-1" to={"/signup"}>
                Sign Up
              </Link>{" "}
            </span>
          </div>

          <div className={style.sideDiv}>
            {" "}
            <h1>Back Ground image</h1>
          </div>
        </div>
      </Modal.Dialog>
    </div>
  );
};

export default Signin;

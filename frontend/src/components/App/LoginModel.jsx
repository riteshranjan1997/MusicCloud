import React from "react";
import axios from "axios"
import Styles from "./LoginModel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/Auth/Action";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Checkbox, Button } from "@material-ui/core";


const useStyles = makeStyles({
  google:{
      textAlign:"center"
  }
});

export default function LoginModel() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);
  const [user_data, setAddData] = React.useState({});

  const handleLogin = () => {
    let payload = {
      email: user_data.email,
      password: user_data.password,
    };
    dispatch(loginRequest(payload));
  };

  

  return (
    <>
      <div className={`card ${Styles.main}`}>
        <h5 className={Styles.title}>Sign in with your Seamless account</h5>

        <div className="row my-2">
          <div className="col">
            <div class="form-group">
              <label>Email</label>
              <br />
              <input
                className={Styles.input}
                id="email"
                type="text"
                required
                onChange={(e) =>
                  setAddData({ ...user_data, email: e.target.value })
                }
              />
              {/* <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Password</label>
            <br />
            <input
              className={Styles.input}
              id="password"
              type="password"
              required
              onChange={(e) =>
                setAddData({ ...user_data, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row my-1">
          <div className="col">
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label" for="exampleCheck1">
                Keep me signed in
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button type="button" class="btn btn-danger" onClick={handleLogin}>
              Sign in
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: "10px" }}>or</p>

        
      </div>
      

    </>
  );
}

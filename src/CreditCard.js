import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bg from "./bg.svg";

const CreditCard = (props) => {
  const [state, setState] = useState({
    cardNumber: "",
    name: "",
    date: "",
    cvv: ""
  });

  const inputProps = {
    maxLength: 12
  };

  const styles = {
    background: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    padding: 10
  };

  const loadEncrypted = (data) => {
    if (data) {
      return [...data].map((data, index) => (index < 8 ? "*" : data)).join("");
    }
    return "";
  };

  const changeHandler = (event) => {
    const numberFormat = /^[0-9]+$/;
    const dateFormat = /^[0-9/]+$/;
    switch (event.target.id) {
      case "cardNumber":
        if (!event.target.value || numberFormat.test(event.target.value)) {
          setState({ ...state, cardNumber: event.target.value });
        }
        break;

      case "name":
        setState({ ...state, name: event.target.value });
        break;

      case "date":
        if (!event.target.value || dateFormat.test(event.target.value)) {
          let dateValue = state.date;
          if (
            event.target.value.length === 3 &&
            !event.target.value.includes("/")
          ) {
            dateValue = `${dateValue}/${
              event.target.value[event.target.value.length - 1]
            }`;
          } else {
            dateValue = event.target.value;
          }
          setState({ ...state, date: dateValue });
        }
        break;

      case "cvv":
        if (!event.target.value || numberFormat.test(event.target.value)) {
          setState({ ...state, cvv: event.target.value });
        }
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", paddingBottom: 40 }}
      >
        <div class="f1_container">
          <div class="shadow f1_card">
            <div class="front face">
              <div style={styles}>
                <div className="cardNum">
                  <label>{state.cardNumber}</label>
                </div>
                <div className="tap">
                  <label>Tap to view the information</label>
                </div>
              </div>
              {/* <img src={bg} alt="hoge" style={{ height: 281, width: 450 }} /> */}
            </div>
            <div class="back face center">
              <div style={styles}>
                <div className="cardNum">
                  <label>{loadEncrypted(state.cardNumber)}</label>
                </div>
                <div className="cardName">
                  <label>{state.name}</label>
                </div>
                <div className="cardDate">
                  <label>{state.date}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomStyle">
        <TextField
          id="cardNumber"
          value={state.cardNumber}
          placeholder="Credit Card"
          onChange={changeHandler}
          fullWidth
          inputProps={inputProps}
        />
      </div>
      <div className="bottomStyle">
        <TextField
          id="name"
          onChange={changeHandler}
          fullWidth
          value={state.name}
          placeholder="Name"
        />
      </div>
      <div
        className="bottomStyle"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          id="date"
          onChange={changeHandler}
          value={state.date}
          placeholder="Date"
          inputProps={{
            maxLength: 5
          }}
        />
        <TextField
          id="cvv"
          onChange={changeHandler}
          value={state.cvv}
          placeholder="CVV"
          inputProps={{
            maxLength: 3
          }}
        />
      </div>
      <div>
        <Button fullWidth variant="contained">
          PAY
        </Button>
      </div>
    </div>
  );
};

export default CreditCard;

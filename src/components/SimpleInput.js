import React, { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnterNameIsValid] = useState(false);
  const [enterNameIsTouched, setEnterNameIsTouched] = useState(false);

  const nameInputIsInvalid = !enteredNameIsValid && enterNameIsTouched;

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name input is valid");
    }
  }, [enteredNameIsValid]);

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const enterNameHandler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value !== "") {
      setEnterNameIsValid(true);
      return;
    }
  };

  const nameInputBlurHandler = () => {
    setEnterNameIsTouched(true);
    if (enteredName === "") {
      setEnterNameIsValid(false);
      return;
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // this if statement is to check that function will be stopped if empty string is submitted
    setEnterNameIsTouched(true);
    if (enteredName === "") {
      setEnterNameIsValid(false);
      return;
    }
    setEnterNameIsValid(true);
    console.log("Entered Name", enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    setEnteredName("");
  };
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={enterNameHandler}
          onBlur={nameInputBlurHandler}
          ref={nameInputRef}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Entered Name is not valid</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

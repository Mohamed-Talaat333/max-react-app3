import React, { useState, useRef } from "react";
import Card from "../UI/Card"
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredUserAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const userNameInputRef = useRef();
  const userAgeInputRef = useRef();
  const enteredName = userNameInputRef.current.value;
  const enteredAge = userAgeInputRef.current.value;

  const addUserHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim().length === 0 ||
      enteredAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });

      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age ( > 0)",
      });

      return;
    }

    console.log(enteredName, enteredAge);

    props.onAddUser(enteredName, enteredAge);

    // userNameInput.current.value = "";
    // userAgeInput.current.value = "";
  };

  // const userNameChangeHandler = (event) => {
  //   setEnteredUserName(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const dismissModalHandler = () => {
    setError(null);
  }

  return (
    <div>
      {error && (
        <ErrorModal title={error.title} message={error.message} onDismiss={dismissModalHandler} />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            ref={userNameInputRef}
          />

          <label htmlFor="age">User Age</label>
          <input
            id="age"
            type="number"
            ref={userAgeInputRef}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

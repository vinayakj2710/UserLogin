import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import AuthContext from '../Store/Auth-context';

const emailReducer = (state, action) => {
  if(action.type === 'USER_ID'){
    return {value: action.value, isValid: action.value.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return {value: "", isValid: false}
}

const passReducer = (state, action) => {
  if(action.type === 'USER_PASS'){
    return {value: action.value, isValid: action.value.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value:'', isValid: null})
  const [passState, dispatchPass] = useReducer(passReducer, { value:'', isValid: null})

  const { isValid: emailIsValid} = emailState;
  const { isValid: passwordIsValid} = passState;


  // useContext Hook
  const authCtx = useContext(AuthContext);

  useEffect(()=>{
    const Identifier = setTimeout(()=>{
      console.log("Checking for Validity")
      setFormIsValid(
        emailState.isValid && passState.isValid
      );
    },500);

    return ()=> {
      console.log("CleanUp!!")
      clearTimeout(Identifier);
    }
  },[emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_ID', value: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: 'USER_PASS', value: event.target.value})
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPass({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailIsValid}
          id="email"
          label="Email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordIsValid}
          id="pass"
          label="Password"
          type="password"
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

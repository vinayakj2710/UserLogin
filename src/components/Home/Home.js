import React,{useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button'
import AuthContext from '../Store/Auth-context';

const Home = (props) => {

  const ctx = useContext(AuthContext)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button className={classes.btn} onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;

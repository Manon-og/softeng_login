import React, { useContext } from 'react';
import UserContext from '../UserContext';


function Main() {
  const { userId } = useContext(UserContext);
  return (
    <div> HELLO, USER ID IS: {userId}
    </div>
  )
}

export default Main;
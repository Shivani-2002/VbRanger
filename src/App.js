import React, { useEffect, useState } from 'react';
import { Route , Routes , useNavigate } from 'react-router-dom';
import Home from './Container/Home';
import Login from './Container/Login';
import { fetchUserInfo, userAccessToken } from './utils/fetchUser';

const App = () => {
  const[user,setUser] = useState(null);
  const navigate = useNavigate();

  //Takes place only once at the starting
  useEffect(()=> {
    const accessToken = userAccessToken();

    if(!accessToken) {
      navigate('/login' , {replace : true});
    }
    else{
      //destructuring it as its an array
      const [userInfo] = fetchUserInfo();
      setUser(userInfo);
      // console.log(user);
    }

  }, []);
  return (
    <Routes>
        <Route path="login" element = {<Login/>} />
        <Route path="/*" element = {<Home user = {user}/>} />
    </Routes>
  );
};

export default App;
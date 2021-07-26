//LOGIN PAGE

import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Container } from "./styled-components";
import globalStyles from "./style.js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import {User} from "../../models/user";

const LoginPageTemplate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginClicked, setIsClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoginClicked) {
      getUser(username, password)
      setIsClicked(false)
    }
  }, [isLoginClicked])


  const getUserInfo = async (auth) => {
    const response = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${auth}`
      }
    };
    try {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/info`, response);
      if(fetchResponse.status==200){
        const data = await fetchResponse.json();
        console.log(data);
        const userInfo: User = {
          email:data.email,
          first_name:data.first_name,
          id:data.id,
          last_name:data.last_name,
          phone_number:data.phone_number,
          username:data.username,
          access_token:auth
        }

        localStorage.setItem("userInfo",JSON.stringify(userInfo));
      }
    } catch (e) {
      return e;
    }
  }

  const getUser = async (username, password) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    };
    try {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, settings);
      if(fetchResponse.status==200){
        const data = await fetchResponse.json();
        console.log(data);
        await getUserInfo(data.access_token);
        alert('login success');
        await router.push('/');



      }
    } catch (e) {
      return e;
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsClicked(true);
  };
  const toSignUp = () => {
    router.push('/signup')
  }



  return (
    <>
      <Header />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>
          <h2 onClick={toSignUp} className="inactive underlineHover" >Sign Up </h2>
          <div className="fadeIn first">
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="username"
              defaultValue=''
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              defaultValue=''
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
      <style jsx>{globalStyles}</style>
      <Footer />
    </>
  );
};

export default LoginPageTemplate;

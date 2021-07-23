//LOGIN PAGE

import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Container } from "./styled-components";
import globalStyles from "./style.js";
import {useRouter} from "next/router";
import { useState } from "react";


const LoginPageTemplate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password)
    console.log("login");
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

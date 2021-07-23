//SIGN UP PAGE


import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import globalStyles from "./style.js";
import {router} from 'next/client'
import { useState } from "react";

const SignUpPageTemplate = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email,username,password,repass)
  };
  const toLogin = () => {
    router.push('/login')
  }
  return (
    <>
      <Header />
    
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 onClick={toLogin} className="inactive underlineHover"> Sign In </h2>
          <h2 className="active" >Sign Up </h2>
          <div className="fadeIn first">
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              className="fadeIn first"
              name="signup"
              placeholder="email"
              defaultValue=''
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              id="username"
              className="fadeIn second"
              name="signup"
              placeholder="username"
              defaultValue=''
              onChange={(e) => setUsername(e.target.value)}
              required

            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="signup"
              placeholder="password"
              defaultValue=''
              onChange={(e) => setPassword(e.target.value)}
              required

            />
            <input
              type="password"
              id="repassword"
              className="fadeIn third"
              name="signup"
              placeholder="re-password"
              defaultValue=''
              onChange={(e) => setRepassword(e.target.value)}
              required

            />
            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">
              Have fun :)))
            </a>
          </div>
        </div>
      </div>
    <style jsx>{globalStyles}</style>
      <Footer />
    </>
  );
};

export default SignUpPageTemplate;

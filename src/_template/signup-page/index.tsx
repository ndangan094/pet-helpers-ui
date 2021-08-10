//SIGN UP PAGE


import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import globalStyles from "./style.js";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import md5 from 'md5';

const SignUpPageTemplate = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepassword] = useState('');

  const [isSignUpClicked, setIsClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSignUpClicked) {
      regUser(email, username, password)
      setIsClicked(false)
    }
  }, [isSignUpClicked])

  const regUser = async (email, username, password) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:3000',
        'Access-Control-Allow-Credentials' : true,
      },
      body: JSON.stringify({
        "username": username,
        "password": md5(password),
        "first_name": "",
        "last_name": "",
        "email": email,
        "phone_number": ""
      })
    };
    try {
      // @ts-ignore
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, settings);
      
      const data = await fetchResponse.json();
      if(fetchResponse.status==200){
        router.push('/login')
      }
      else {
        alert(data.detail)
      }
    } catch (e) {
      return e;
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(password === repass)
      setIsClicked(true)
    else alert('Mật khẩu nhập lại phải giống mật khẩu trước')
  };
  const toLogin = () => {
    router.push('/login')
  }
  return (
    <>
      <Header />

      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 onClick={toLogin} className="inactive underlineHover"> Đăng nhập </h2>
          <h2 className="active" >Đăng ký </h2>
          <div className="fadeIn first">
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              className="fadeIn first"
              name="signup"
              placeholder="Email"
              defaultValue=''
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              id="username"
              className="fadeIn second"
              name="signup"
              placeholder="Tên đăng nhập"
              defaultValue=''
              onChange={(e) => setUsername(e.target.value)}
              required

            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="signup"
              placeholder="Mật khẩu"
              defaultValue=''
              onChange={(e) => setPassword(e.target.value)}
              required

            />
            <input
              type="password"
              id="repassword"
              className="fadeIn third"
              name="signup"
              placeholder="Mật khẩu xác nhận"
              defaultValue=''
              onChange={(e) => setRepassword(e.target.value)}
              required

            />
            <input type="submit" className="fadeIn fourth" value="Đăng ký" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">
              Quên mật khẩu?
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

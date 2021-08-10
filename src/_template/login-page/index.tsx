//LOGIN PAGE

import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Container } from "./styled-components";
import globalStyles from "./style.js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import {User} from "../../models/user";
import md5 from 'md5';

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


  const getUserInfo = async (auth,password) => {
    const response = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${auth}`
      }
    };
    try {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, response);
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
          access_token:auth,
          role:data.role,
          password:password
        }
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        router.push('/');
      }
      else{
        const data = await fetchResponse.json()
        console.log(data)
      }
    } catch (e) {
      return e;
    }
  }

  const getUser = async (username, password) => {
    const settings = {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
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
        await getUserInfo(data.access_token,password);

      }else{
        const data = await fetchResponse.json()
        alert(data.detail)
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
          <h2 className="active"> Đăng nhập </h2>
          <h2 onClick={toSignUp} className="inactive underlineHover" >Đăng ký </h2>
          <div className="fadeIn first">
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="Tên đăng nhập"
              defaultValue=''
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="Mật khẩu"
              defaultValue=''
              onChange={(event) => setPassword(md5(event.target.value))}
              required
            />
            <input type="submit" className="fadeIn fourth" value="Đăng nhập" />
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

export default LoginPageTemplate;

//SIGN UP PAGE


import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import globalStyles from "./style.js";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";


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
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "first_name": "",
        "last_name": "",
        "email": email,
        "phone_number": ""
      })
    };
    try {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, settings);
      const data = await fetchResponse.json();
      console.log(data);
      router.push('/login')
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

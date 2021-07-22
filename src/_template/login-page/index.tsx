import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
// import {ContainerCompopnent, FormComponent} from './styled-components';

const LoginPageTemplate = () => {
    return (
        <>
            <Header/>
            <div>
              <form>
                <label htmlFor="username">Username or Email</label>
                <input name='username' type='text' placeholder='username or email'/>
                <label htmlFor="password">Password</label>
                <input name='password' type='password' placeholder='password' />
              </form>
            </div> 
           
            <Footer/>
        </>
    )
}

export default LoginPageTemplate;
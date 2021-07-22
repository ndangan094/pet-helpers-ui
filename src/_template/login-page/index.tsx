import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import {ContainerCompopnent, FormComponent} from './styled-components';

const LoginPageTemplate = () => {
    return (
        <>
            <Header/>
            <ContainerCompopnent>
              <FormComponent>
                <label htmlFor="username">Username or Email</label>
                <input name='username' type='text' placeholder='username or email'/>
                <label htmlFor="password">Password</label>
                <input name='password' type='password' placeholder='password' />
              </FormComponent>
            </ContainerCompopnent> 
           
            <Footer/>
        </>
    )
}

export default LoginPageTemplate;
import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import {Container} from './styled-components';

const LoginPageTemplate = () => {
    return (
        <>
            <Header/>
            <Container>
                <label htmlFor="username">Username or Email</label>
                <input name='username' type='text' placeholder='username or email'/>
                <label htmlFor="password">Password</label>
                <input name='password' type='password' placeholder='password' />
            </Container>
            <Footer/>
        </>
    )
}

export default LoginPageTemplate;
import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {useRouter} from 'next/router';

const VeterinaryCreateTemplate = () => {
    const router = useRouter();
    return <>
        <Header/>
        <Footer/>
    </>
}

export default VeterinaryCreateTemplate;
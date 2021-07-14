import HomePageTemplate from "../_template/home-page";
import Head from "next/head";


const Home = () => {
  return (
    <>
        <Head>
           <title>Pet Secure</title>
        </Head>
      <HomePageTemplate/>
    </>
  )
}


export default Home;
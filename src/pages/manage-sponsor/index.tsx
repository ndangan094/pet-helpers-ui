import ManageSponsorPageTemplate from "../../_template/manage-sponsor-page";
import Head from "next/head";


const Home = () => {
  return (
    <>
        <Head>
           <title>Sponsor management</title>
        </Head>
      <ManageSponsorPageTemplate/>
    </>
  )
}


export default Home;
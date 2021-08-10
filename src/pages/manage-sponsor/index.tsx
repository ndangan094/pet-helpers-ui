import ManageSponsorPageTemplate from "../../_template/manage-sponsor-page";
import Head from "next/head";


const Home = () => {
  return (
    <>
        <Head>
           <title>Quản lý người ủng hộ</title>
        </Head>
      <ManageSponsorPageTemplate/>
    </>
  )
}


export default Home;
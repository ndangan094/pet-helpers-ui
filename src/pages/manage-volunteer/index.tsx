import ManageVolunteerPageTemplate from "../../_template/manage-volunteer-page";
import Head from "next/head";


const Home = () => {
  return (
    <>
        <Head>
           <title>Volunteer management</title>
        </Head>
      <ManageVolunteerPageTemplate/>
    </>
  )
}


export default Home;
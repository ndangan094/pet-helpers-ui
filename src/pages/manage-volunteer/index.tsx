import ManageVolunteerPageTemplate from "../../_template/manage-volunteer-page";
import Head from "next/head";


const Home = () => {
  return (
    <>
        <Head>
           <title>Quản lý tình nguyện viên</title>
        </Head>
      <ManageVolunteerPageTemplate/>
    </>
  )
}


export default Home;
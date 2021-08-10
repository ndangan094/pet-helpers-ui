import Head from "next/head";
import UserInfoPage from "../../_template/user-information-page";

const UserPage = () => {
    return (
        <>
            <Head>
                <title>Thông tin của bạn</title>
            </Head>
            <UserInfoPage/>

        </>
    )
}


export default UserPage;
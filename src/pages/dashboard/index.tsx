import Head from "next/head";
import DashboardTemplate from "../../_template/dashboard-page"

const DashBoard = () => {
    return (
        <>
            <Head>
                <title>Bảng điều khiển</title>
            </Head>
            <DashboardTemplate/>
        </>
    )
}


export default DashBoard;
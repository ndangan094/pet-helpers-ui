import Head from "next/head";
import HealthReportCreateTemplate from "../../../../_template/health-report-create-page/index"
const HealthReportCreate = () => {
    return (
        <>
            <Head>
                <title>Tạo báo cáo sức khoẻ</title>
            </Head>
            <HealthReportCreateTemplate/>
        </>
    )
}


export default HealthReportCreate;
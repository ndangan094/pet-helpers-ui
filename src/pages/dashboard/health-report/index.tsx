import Head from "next/head";
import HeathReportTemplate from "../../../_template/health-report-page/index"
const HealthReport = () => {
    return (
        <>
            <Head>
                <title>Báo cáo sức khoẻ</title>
            </Head>
            <HeathReportTemplate/>
        </>
    )
}


export default HealthReport;
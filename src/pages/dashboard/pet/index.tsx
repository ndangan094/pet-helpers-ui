import Head from "next/head";
import PetTemplate  from  '../../../_template/pet-page/index'

const DashBoard = () => {
    return (
        <>
            <Head>
                <title>Pet Manager</title>
            </Head>
            <PetTemplate/>
        </>
    )
}


export default DashBoard;
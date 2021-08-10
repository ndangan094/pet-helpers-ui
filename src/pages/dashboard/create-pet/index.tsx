import Head from "next/head";
import CreatePetTempalte  from  '../../../_template/create-pet-page/index'

const PetDetail = () => {
    return (
        <>
            <Head>
                <title>Thêm thú cưng mới</title>
            </Head>
            <CreatePetTempalte/>
        </>
    )
}


export default PetDetail;
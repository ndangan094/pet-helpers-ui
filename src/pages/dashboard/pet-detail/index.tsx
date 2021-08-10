import styled from "styled-components";
import Head from "next/head";
import PetDetailTempalte  from  '../../../_template/pet-detail/index'

const PetDetail = () => {
    return (
        <>
            <Head>
                <title>Chi tiết thú cưng</title>
            </Head>
            <PetDetailTempalte/>
        </>
    )
}


export default PetDetail;
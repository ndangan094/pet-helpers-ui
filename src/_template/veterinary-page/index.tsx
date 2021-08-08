import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {useRouter} from 'next/router';

import {ActionButton, ActionContainer, ActionRow, BoxPet, DashBoardContainer, Left,ListPetContainer,PetList,Right} from "../pet-page/styled-components";


const VeterinaryTemplate = () => {
    const router = useRouter();
    return <>
        <Header/>
            <ListPetContainer>
                <PetList>
                    <div style={{width:"50%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                        <div style={{fontWeight: "bold", fontSize: "30px",paddingRight:"30px"}}>Danh sách phòng khám</div>
                        <ActionButton onClick={()=>{router.push("/dashboard/veterinary-clinic/create")}}>Thêm phòng khám</ActionButton>
                    </div>
                    <div style={{height:"100px"}}/>
                </PetList>
            </ListPetContainer>
        <Footer/>
    </>
}

export default VeterinaryTemplate;
import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {useRouter} from 'next/router';
import {ActionButton, BoxPet, ListPetContainer, PetList} from "../pet-page/styled-components";
import {useEffect, useState} from "react";
import {User} from "../../models/user";
import {Veter} from "../../models/veterinary";
import {Modal} from 'antd';
import axios from "axios";


const VeterinaryTemplate = () => {
    const router = useRouter();
    const [listVeterinary, setListVeterinary] = useState<Veter[]>()
    const [user, setUser] = useState<User>(undefined);
    const [veterID, setVeterID] = useState(undefined);
    const [veterName, setVeterName] = useState(undefined);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const getVeterinary = async () => {
        const settings = {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.access_token}`
            },
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/veterinary_clinic`, settings);
            if (fetchResponse.status == 200) {
                const data = await fetchResponse.json();
                console.log(data);
                const _item: Veter[] = data.veterinary_clinics.map((veter) => {
                    return ({
                        id: veter.id,
                        name: veter.name,
                        address: veter.address,
                        phone_number: veter.phone_number,
                        email: veter.email
                    })
                })
                setListVeterinary(_item);
                console.log(listVeterinary)
            }
        } catch (e) {
            return e;
        }
    }

    const deleteVeterinary = async () => {
        const response = {
            method: 'DETELE',
            headers: {
                "Authorization": `Bearer ${user.access_token}`,
            },
        };
        try {
            axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/veterinary_clinic/` + veterID, {
                headers: {
                    "Authorization": `Bearer ${user.access_token}`
                }
            }).then(res => {
                if(res.status == 200){
                    alert("Xo?? ph??ng kh??m th??nh c??ng");
                    location.reload();
                }else{
                    alert("???? c?? l???i x???y ra");
                }
            })
        } catch (e) {
            alert("???? c?? l???i x???y ra");
            return e;
        }
    }

    useEffect(() => {
        if (user?.access_token)
            getVeterinary()
    }, [user?.access_token])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await deleteVeterinary();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const ModalConfirm = () => {
        return <Modal title="Xo?? th?? c??ng" visible={isModalVisible} onOk={() => {
            handleOk()
        }} onCancel={handleCancel}>
            {`B???n c?? mu???n xo?? ph??ng kh??m ${veterName} ?`}
        </Modal>
    }

    return <>
        <Header/>
        <ListPetContainer>
            <PetList>
                <div style={{width: "50%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <div style={{fontWeight: "bold", fontSize: "30px", paddingRight: "30px"}}>Danh s??ch ph??ng kh??m</div>
                    <ActionButton onClick={() => {
                        router.push("/dashboard/veterinary-clinic/create")
                    }}>Th??m ph??ng kh??m</ActionButton>
                </div>
                {listVeterinary?.map((veter) => {
                    return <>
                        <BoxPet>
                            <div style={{display: "flex", flexDirection: "row", height: "100%", alignItems: 'center'}}>
                                <div style={{
                                    marginLeft: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: 'space-evenly',
                                    height: "100%"
                                }}>
                                    <div style={{fontSize: "18px", fontWeight: "bold"}}>{veter?.name}</div>
                                    <div style={{fontSize: "16px"}}>?????a ch???: {veter?.address}</div>
                                    <div style={{fontSize: "16px"}}>S??? ??i???n tho???i: {veter?.phone_number}</div>
                                    <div style={{fontSize: "16px"}}>Email: {veter?.email}</div>
                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",height:"100%"}}>
                                <div style={{display:"flex",flexDirection:"column",height:"100%",justifyContent:'space-evenly'}}>
                                </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                justifyContent: 'space-evenly'
                            }}>
                                <ActionButton onClick={() => {
                                    router.push({pathname:"/dashboard/veterinary-clinic/detail",query:{id:veter.id}})
                                }}>{"Chi ti???t"}</ActionButton>
                                <ActionButton color={"#FF4848"} onClick={() => {
                                    setVeterID(veter.id);
                                    setVeterName(veter.name);
                                    showModal();
                                }}>Xo??</ActionButton>
                                <ActionButton onClick={()=>{router.push({pathname:"/dashboard/health-report",query:{veterinary_clinic_id:veter.id}})}}>Danh s??ch b??o c??o</ActionButton>

                                <ModalConfirm/>
                            </div>
                            </div>
                        </BoxPet>
                    </>
                })}
                <div style={{height: "100px"}}/>
            </PetList>
        </ListPetContainer>
        <Footer/>
    </>
}

export default VeterinaryTemplate;
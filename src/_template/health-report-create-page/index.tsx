import Footer from '../../_layout/footer';
import Header from '../../_layout/header';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import { RowLine, SubmitButton} from '../user-information-page/styled-components';
import {ActionButton, ActionContainer, ActionRow, BoxPet, DashBoardContainer, Left,ListPetContainer,PetList,Right} from "../create-pet-page/styled-components";
import { User } from '../../models/user';
import { Veter } from '../../models/veterinary';
import axios from 'axios';

const HealthReportCreateTemplate = () => {
    const router = useRouter();
    const [listVeterinary, setListVeterinary] = useState<Veter[]>()
    const [user, setUser] = useState<User>(undefined);
    const [veterinary,setVeterinary] = useState(undefined);
    const [weight,setWeight] = useState(undefined);
    const [health,setHealth] = useState(undefined);
    const [description,setDescription] = useState(undefined);

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
                setVeterinary(_item[0].id);
                setListVeterinary(_item);
            }
        } catch (e) {
            return e;
        }
    }

    const createHealthReport = async () => {
        try {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/health_report`, {
                "pet_id": router.query.id,
                "veterinary_clinic_id": veterinary,
                "weight": parseFloat(weight),
                "health_condition": health,
                "description": description
                }, {
                    headers: {
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
            ).then(res => {
                if (res.status == 200) {
                    alert("T???o b??o c??o th??nh c??ng");
                    // router.push("/dashboard/veterinary-clinic")
                } else {
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


    return <>
        <Header/>
        <DashBoardContainer>
            <ActionContainer>
                <div style={{height: "100px"}}/>
                <div style={{fontWeight:"bold",fontSize:"30px"}}>T???o b??o c??o s???c kho???</div>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        T??n th?? c??ng:
                    </Left>
                    <div style={{fontSize:"18px",fontWeight:600}}>{router.query.name}</div>
                </RowLine>
                <RowLine>
                    <Left>
                        Ph??ng kh??m:
                    </Left>
                    <select onChange={(e)=>{setVeterinary(parseFloat(e.target.value))}} style={{fontSize:'16px', padding:"5px"}}>
                        {listVeterinary?.map((data)=>{
                            return <option  style={{fontSize:'16px',padding:"5px"}} value={data.id}>{data.name}</option>
                        })}
                    </select>
                </RowLine>
                <RowLine>
                    <Left>
                        C??n n???ng:
                    </Left>
                    <Right type={"number"} onChange={(e) => {
                        setWeight(parseFloat(e.target.value));
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        T??nh tr???ng s???c kho???:
                    </Left>
                    <Right onChange={(e) => {
                        setHealth(e.target.value)
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        M?? t??? chi ti???t:
                    </Left>
                    <textarea onChange={(e)=>{
                        setDescription(e.target.value);
                    }} style={{borderRadius:"10px"}} rows={4} cols={50}>
                    </textarea>
                </RowLine>

                {/*<div>{error}</div>*/}
                <SubmitButton onClick={async () => {
                    console.log({
                        "pet_id": router.query.id,
                        "veterinary_clinic_id": veterinary,
                        "weight": parseFloat(weight),
                        "health_condition": health,
                        "description": description
                    })
                    await createHealthReport();
                    // check();
                    // console.log(pet);
                    // if (error == "") {
                    //     await createPet();
                    // }
                }}>
                    Submit
                </SubmitButton>
            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}

export default HealthReportCreateTemplate;
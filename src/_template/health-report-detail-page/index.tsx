import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import axios from "axios";
import { User } from "../../models/user";
import { HealthReport } from "../../models/health-report";
import { RowLine, SubmitButton} from '../user-information-page/styled-components';
import {ActionButton, ActionContainer, ActionRow, BoxPet, DashBoardContainer, Left,ListPetContainer,PetList,Right} from "../create-pet-page/styled-components";

const HealthReportDetailTemplate = () => {

    const router = useRouter();
    const [user, setUser] = useState<User>(undefined);
    const [report, setReport] = useState<HealthReport>(undefined);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const updateReport = async () => {
        try {
            axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/health_report/` + router.query.id, {
                    "pet_id": report.pet.id,
                    "veterinary_clinic_id": report.veterinary_clinic.id,
                    "weight": report.weight,
                    "health_condition": report.health_condition,
                    "description": report.description
                }, {
                    headers: {
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
            ).then(res => {
                if (res.status == 200) {
                    alert("Cập nhật báo cáo thành công");
                    window.history.back();
                } else {
                    alert("Đã có lỗi xảy ra");
                }
            })
        } catch (e) {
            alert("Đã có lỗi xảy ra");
            return e;
        }
    }


    const getReport = async () => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/health_report/` + router.query.id, {
                headers: {
                    "Authorization": `Bearer ${user.access_token}`
                },
            }).then(res => {
                if (res.status == 200) {
                    const data= res.data;
                    const _item:HealthReport = {
                        created_at:data.created_at,
                        description:data.description,
                        health_condition:data.health_condition,
                        id:data.id,
                        weight:data.weight,
                        pet:{
                            id:data.pet.id,
                            name:data.pet.name,
                            image:data.pet.images
                        },
                        veterinary_clinic:{
                            id:data.veterinary_clinic.id,
                            name:data.veterinary_clinic.name,
                        }
                    }
                    console.log(_item)
                    setReport(_item)
                } else {
                    console.log("aa")
                    alert("Đã có lỗi xảy ra");
                }
            })
        } catch (e) {
            alert("Đã có lỗi xảy ra");
            console.log(e)
        }
    }

    useEffect(() => {
        if (user?.access_token && router.query.id)
            getReport()
    }, [user?.access_token,router.query.id])


    return <>
        <Header/>
        <DashBoardContainer>
            <ActionContainer>
                <div style={{height: "100px"}}/>
                <div style={{fontWeight:"bold",fontSize:"30px"}}>Chi tiết báo cáo</div>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        Tên thú cưng:
                    </Left>
                    <div style={{fontSize:"18px",fontWeight:600}}>{report?.pet.name}</div>
                </RowLine>
                <RowLine>
                    <Left>
                        Phòng khám:
                    </Left>
                    <div style={{fontSize:"18px",fontWeight:600}}>{report?.veterinary_clinic.name}</div>

                </RowLine>
                <RowLine>
                    <Left>
                        Cân nặng:
                    </Left>
                    <Right type={"number"} value={report?.weight} onChange={(e) => {
                        const temp = {...report};
                        temp.weight = parseFloat(e.target.value);
                        setReport(temp)
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Tình trạng sức khoẻ:
                    </Left>
                    <Right value={report?.health_condition} onChange={(e) => {
                        const temp = {...report};
                        temp.health_condition =e.target.value;
                        setReport(temp)
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Mô tả chi tiết:
                    </Left>
                    <textarea value={report?.description} onChange={(e)=>{
                        const temp = {...report};
                        temp.description = e.target.value;
                        setReport(temp)
                    }} style={{borderRadius:"10px",outline:'none',resize:"none",fontSize:"16px"}} rows={4} cols={50}>
                    </textarea>
                </RowLine>

                {/*<div>{error}</div>*/}
                <SubmitButton onClick={async () => {
                    await updateReport();
                }}>
                    Cập nhật
                </SubmitButton>
            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}

export default HealthReportDetailTemplate;
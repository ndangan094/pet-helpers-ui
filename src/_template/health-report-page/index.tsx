import Footer from '../../_layout/footer';
import Header from '../../_layout/header';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import { RowLine, SubmitButton} from '../user-information-page/styled-components';
import axios from 'axios';
import { User } from '../../models/user';
import {HealthReport} from '../../models/health-report';
import {Input, Modal } from 'antd';

import {ActionButton, ActionContainer, ActionRow, BoxPet, DashBoardContainer, Left,ListPetContainer,PetList,Right} from "../pet-page/styled-components";



const HeathReportTemplate = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>(undefined);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const [listReport,setListReport] = useState<HealthReport[]>();
    const [id,setId] = useState(undefined)

    const deleteVeterinary = async () => {
        try {
            axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/health_report/` + id, {
                headers: {
                    "Authorization": `Bearer ${user.access_token}`
                }
            }).then(res => {
                if(res.status == 200){
                    alert("Xoá báo thành công");
                    location.reload();
                }else{
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
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/health_report?${router.query.veterinary_clinic_id?`veterinary_clinic_id=${router.query.veterinary_clinic_id}`:""}&${router.query.id?`pet_id=${router.query.id}`:""}`, {
                headers: {
                    "Authorization": `Bearer ${user.access_token}`
                },
            }).then(res => {
                if (res.status == 200) {
                    const _item : HealthReport[] = res.data.health_reports.map((data)=>{
                        return({
                            created_at:data.created_at,
                            description:data.description,
                            health_condition:data.health_condition,
                            id:data.id,
                            pet:{
                                id:data.pet.id,
                                name:data.pet.name,
                                image:data.pet.images
                            },
                            veterinary_clinic:{
                                id:data.veterinary_clinic.id,
                                name:data.veterinary_clinic.name,
                            }
                        })
                    })
                    setListReport(_item);
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user?.access_token )
            getReport()
    }, [ user?.access_token])

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
        return <Modal title="Xoá thú cưng" visible={isModalVisible} onOk={()=>{handleOk()}} onCancel={handleCancel}>
            {"Bạn có muốn xoá báo cáo này?"}
        </Modal>
    }


    return <>
        <Header/>
        <ListPetContainer>
            <PetList>
                <div style={{width:"50%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <div style={{fontWeight: "bold", fontSize: "30px",paddingRight:"30px"}}>Báo cáo sức khoẻ</div>
                    {/*<ActionButton onClick={()=>{router.push("/dashboard/health-report/create")}}>Thêm báo cáo</ActionButton>*/}
                </div>
                {listReport?.map((report)=>{
                    console.log(listReport);
                    return <>
                        <BoxPet>
                            <div style={{display:"flex",flexDirection:"row",height:"100%",alignItems:'center'}}>
                                <img style={{marginLeft:"5px",height:"120px",width:"120px",objectFit:"cover",borderRadius:"5px"}} src={report.pet.image[0].url?report.pet.image[0].url:"https://i.vimeocdn.com/portrait/1274237_300x300.jpg"}/>
                                <div style={{marginLeft:"10px",display:"flex",flexDirection:"column",justifyContent:'space-evenly',height:"100%"}}>
                                    <div style={{fontSize:"18px",fontWeight:"bold"}}>{report.pet.name}</div>
                                    <div style={{fontSize:"16px"}}>Phòng khám: {report.veterinary_clinic.name}</div>
                                    <div style={{fontSize:"16px"}}>Ngày tạo đánh giá: {report.created_at}</div>
                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",height:"100%"}}>
                                <div style={{display:"flex",flexDirection:"column",height:"100%",justifyContent:'space-evenly'}}>
                                    <ActionButton onClick={()=>{router.push({pathname:"/dashboard/health-report/detail",query:{id:report.id}})}}>{"Chi tiết"}</ActionButton>
                                    <ActionButton onClick={()=>{setId(report.id);showModal();}} color={"#FF4848"}>Xoá</ActionButton>
                                    <ModalConfirm />
                                </div>
                            </div>

                        </BoxPet>
                    </>
                })}
                <div style={{height:"100px"}}/>
            </PetList>
        </ListPetContainer>
        <Footer/>
    </>
}

export default HeathReportTemplate;
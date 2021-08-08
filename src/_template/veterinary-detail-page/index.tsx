import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {validateEmail} from "../../hooks/ultis.hook";
import {User} from "../../models/user";
import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {ActionContainer, DashBoardContainer, Left, Right} from "../create-pet-page/styled-components";
import {RowLine, SubmitButton} from '../user-information-page/styled-components';


const VeterinaryDetailTemplate = () => {

    const router = useRouter();
    const [id, setID] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [user, setUser] = useState<User>(undefined);
    const [error, setError] = useState(undefined)
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const getVeterinary = async () => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/veterinary_clinic/` + router.query.id, {
                headers: {
                    "Authorization": `Bearer ${user.access_token}`
                },
            }).then(res => {
                if (res.status == 200) {
                    console.log(res);
                    setName(res.data.name);
                    setAddress(res.data.address);
                    setPhoneNumber(res.data.phone_number);
                    setEmail(res.data.email);
                    setID(res.data.id);
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
            getVeterinary()
    }, [router.query.id, user?.access_token])

    const check = () => {
        if (name === undefined || name === "") {
            setError("Tên không được để trống");
            return false;
        } else if (address === undefined || address === "") {
            setError("Địa chỉ không được để trống");
            return false;
        } else if (phoneNumber === undefined || phoneNumber === "") {
            setError("Số điện thoại không được để trống");
            return false;
        } else if (email === undefined || email === "") {
            setError("Tên không được để trống");
            return false;
        } else if (!validateEmail(email)) {
            setError("Email sai định dạng");
            return false;
        }
        return true;
    }

    const updateVeterinary = async () => {
        try {
            axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/veterinary_clinic/` + router.query.id, {
                    "name": name,
                    "address": address,
                    "phone_number": phoneNumber,
                    "email": email
                }, {
                    headers: {
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
            ).then(res => {
                if (res.status == 200) {
                    alert("Cập nhật phòng khám thành công");
                    router.push("/dashboard/veterinary-clinic")
                } else {
                    alert("Đã có lỗi xảy ra");
                }
            })
        } catch (e) {
            alert("Đã có lỗi xảy ra");
            return e;
        }
    }

    return <>
        <Header/>
        <DashBoardContainer>
            <ActionContainer>
                <div style={{height: "100px"}}/>
                <div style={{fontWeight: "bold", fontSize: "30px"}}>Chi tiết phòng khám</div>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        Tên phòng khám:
                    </Left>
                    <Right value={name} onChange={(e) => {
                        setError("");
                        setName(e.target.value);
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Địa chỉ:
                    </Left>
                    <Right value={address} onChange={(e) => {
                        setError("");
                        setAddress(e.target.value)
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Số điện thoại:
                    </Left>
                    <Right type={"number"} value={phoneNumber} onChange={(e) => {
                        setError("");
                        setPhoneNumber(e.target.value);
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Email:
                    </Left>
                    <Right value={email} onChange={(e) => {
                        setError("");
                        setEmail(e.target.value)
                    }}/>
                </RowLine>
                <div style={{color:"red",fontSize:"16px"}}>{error}</div>
                <SubmitButton onClick={async () => {
                    const a = check();
                    if (a){
                        setError("");
                        await updateVeterinary();}
                }}>
                    Cập nhật
                </SubmitButton>
            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}

export default VeterinaryDetailTemplate;
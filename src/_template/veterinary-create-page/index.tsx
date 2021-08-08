import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {ActionContainer, DashBoardContainer, Left, Right} from "../create-pet-page/styled-components";
import {RowLine, SubmitButton} from '../user-information-page/styled-components';

import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {User} from "../../models/user";
import {validateEmail} from "../../hooks/ultis.hook";

const VeterinaryCreateTemplate = () => {
    const router = useRouter();
    const [name, setName] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [error, setError] = useState(undefined)

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<User>(undefined);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

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


    const createVeterinary = async () => {
        const settings = {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.access_token}`
            },
            body: JSON.stringify({
                "name": name,
                "address": address,
                "phone_number": phoneNumber,
                "email": email
            })
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/veterinary_clinic`, settings);
            if (fetchResponse.status == 200) {
                alert("Tạo phòng khám thành công")
                router.push("/dashboard/veterinary-clinic")
            } else {
                alert("Đã có lỗi xảy ra")
            }
        } catch (e) {
            return e;
        }
    }


    return <>
        <Header/>
        <DashBoardContainer>
            <ActionContainer>
                <div style={{height: "100px"}}/>
                <div style={{fontWeight: "bold", fontSize: "30px"}}>Thêm phòng khám</div>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        Tên phòng khám:
                    </Left>
                    <Right onChange={(e) => {
                        setError("");
                        setName(e.target.value);
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Địa chỉ:
                    </Left>
                    <Right onChange={(e) => {
                        setError("");
                        setAddress(e.target.value)
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Số điện thoại:
                    </Left>
                    <Right type={"number"} onChange={(e) => {
                        setError("");
                        setPhoneNumber(e.target.value);
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Email:
                    </Left>
                    <Right onChange={(e) => {
                        setError("");
                        setEmail(e.target.value)
                    }}/>
                </RowLine>
                <div style={{color: "red", fontSize: "16px"}}>{error}</div>
                {isLoading ? <>
                        <SubmitButton> <img src={"/images/loading.gif"} width={20}/></SubmitButton>
                    </> :
                    <SubmitButton onClick={async () => {
                        const a = check();
                        if (a) {
                            setError("");
                            setIsLoading(true);
                            await createVeterinary();
                            setIsLoading(false);
                        }
                    }}>
                        Tạo
                    </SubmitButton>
                }
            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}

export default VeterinaryCreateTemplate;
import {useEffect, useState} from "react";
import {User} from "../../models/user";
import {InfoContainer, InfoRoot, Left, Right, RowLine, SubmitButton, Text} from "./styled-components";
import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { useRouter } from "next/router";

const UserInfoPage = () => {

    const router = useRouter();
    const [user, setUser] = useState<User>(undefined);
    const [userFromServer, setUserFromServer] = useState<User>(undefined);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])
    console.log(user);

    useEffect(() => {
        getUserInfo(user?.access_token);
    }, [user]);


    const changeUserInfo = async () =>{
        const response = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.access_token}`
            },
            body:JSON.stringify({
                "first_name": userFromServer.first_name,
                "last_name": userFromServer.last_name,
                "email": userFromServer.email,
                "phone_number": userFromServer.phone_number,
            })
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, response);
            if (fetchResponse.status == 200) {
                localStorage.setItem("userInfo",JSON.stringify(userFromServer));
                alert("Change successfully!!")
                window.location.reload();
            }
        } catch (e) {
            return e;
        }
    }

    const getUserInfo = async (auth) => {
        const response = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${auth}`
            }
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, response);
            if (fetchResponse.status == 200) {
                const data = await fetchResponse.json();
                console.log("---->", data);
                const userInfo: User = {
                    email: data.email,
                    first_name: data.first_name,
                    id: data.id,
                    last_name: data.last_name,
                    phone_number: data.phone_number,
                    username: data.username,
                    role:data.role,
                    access_token: auth
                }
                setUserFromServer(userInfo);
            }
        } catch (e) {
            return e;
        }
    }


    return (<>
        <Header/>
        <InfoRoot>
            <InfoContainer>
                <Text>
                    Th??ng tin c?? nh??n
                </Text>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        H???:
                    </Left>
                    <Right onChange={(e) => {
                        userFromServer.first_name = e.target.value;
                        setUserFromServer(userFromServer);
                    }} defaultValue={userFromServer?.first_name}/>
                </RowLine>
                <RowLine>
                    <Left>
                        T??n:
                    </Left>
                    <Right onChange={(e) => {
                        userFromServer.last_name = e.target.value;
                        setUserFromServer(userFromServer);
                    }} defaultValue={userFromServer?.last_name}/>
                </RowLine>
                <RowLine>
                    <Left>
                        T??n ????ng nh???p:
                    </Left>
                    <Right defaultValue={userFromServer?.username} readOnly/>
                </RowLine>
                <RowLine>
                    <Left>
                        Email:
                    </Left>
                    <Right onChange={(e) => {
                        userFromServer.email = e.target.value;
                        setUserFromServer(userFromServer);
                    }} defaultValue={userFromServer?.email}/>
                </RowLine>
                <RowLine>
                    <Left>
                        S??? ??i???n tho???i:
                    </Left>
                    <Right onChange={(e) => {
                        userFromServer.phone_number = e.target.value;
                        setUserFromServer(userFromServer);
                    }} defaultValue={userFromServer?.phone_number}/>
                </RowLine>
                <RowLine>
                    <Left>
                    </Left>
                    <div onClick={()=>{router.push("/user/password")}} style={{fontSize:"16px",color:"#3D7CF7",textDecoration:"underline",cursor:"pointer"}}>C???p nh???t m???t kh???u</div>
                </RowLine>
                <SubmitButton onClick={async () => {
                    await changeUserInfo();
                }}>
                    C???p nh???t
                </SubmitButton>
            </InfoContainer>
        </InfoRoot>
        <Footer/>
    </>);
}

export default UserInfoPage
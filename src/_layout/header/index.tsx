import Link from "next/link";

import {
    Action,
    ActionButton,
    Category,
    CategoryButton,
    HeaderComponent,
    Logo,
    Text,
    Welcome
} from "./styled-components";
import {useEffect, useState} from "react";
import {User} from "../../models/user";
import {router} from "next/client";
import {useRouter} from "next/router";


const Header: React.FC = () => {


    const router = useRouter();
    const [user, setUser] = useState<User>(undefined);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])
    // console.log(user);

    const logout = () => {
        localStorage.removeItem('userInfo');
        if (router.pathname === "/")
            window.location.reload();
        else
            router.push("/");
    }
    return (
        <>
            <HeaderComponent>
                <Category>
                    <CategoryButton onClick={() => {
                        router.push('/adobt')
                    }}>Nhận nuôi</CategoryButton>
                    <CategoryButton onClick={() => {
                        router.push('/donate')
                    }}>Ủng hộ</CategoryButton>
                    <CategoryButton onClick={() => {
                        router.push('/volunteer')
                    }}>Tình nguyện viên</CategoryButton>
                </Category>
                <Logo onClick={() => {
                    if (router.pathname === "/")
                        window.location.reload();
                    else
                        router.push("/");
                }}>
                    <img alt="logo" src={"/images/logo.png"} width={100}/>
                    <Text>PET SECURE</Text>
                </Logo>

                <Action>
                    {user == undefined ?
                        (<>
                                <ActionButton>
                                    <Link href={`/login`}>Đăng nhập</Link>
                                </ActionButton>
                                <ActionButton> <Link href={`/signup`}>Đăng ký</Link>
                                </ActionButton>
                            </>
                        ) : (<>
                            <Welcome>{"Xin chào, " + ((!user.first_name)?user.username : (user.first_name + " " + user.last_name))}</Welcome>
                            {user.role === "admin" || user.role === 'volunteer' ? <ActionButton onClick={() => router.push("/dashboard")} >Quản lý</ActionButton> : null}
                            <ActionButton onClick={() => router.push("/user")}>
                                Thông tin
                            </ActionButton>
                            <ActionButton onClick={() => logout()}>
                                Đăng xuất
                            </ActionButton>
                        </>)
                    }
                </Action>
            </HeaderComponent>
        </>
    );
}
;

export default Header;

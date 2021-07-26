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
    console.log(user);

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
                    <CategoryButton>Dog</CategoryButton>
                    <CategoryButton>Cat</CategoryButton>
                    <CategoryButton>Bread</CategoryButton>
                </Category>
                <Logo onClick={()=>{
                    if (router.pathname === "/")
                        window.location.reload();
                    else
                        router.push("/");
                }}>
                    <img alt="logo" src={"images/logo.png"} width={100}/>
                    <Text>PET SECURE</Text>
                </Logo>

                <Action>
                    {user == undefined ?
                        (<>
                                <ActionButton>
                                    <Link href={`/login`}>Login</Link>
                                </ActionButton>
                                <ActionButton> <Link href={`/signup`}>Sign Up</Link>
                                </ActionButton>
                            </>
                        ) : (<>
                            <Welcome>{"Welcome, " + user.first_name + " " + user.last_name}</Welcome>
                            <ActionButton onClick={() =>router.push("/user")}>
                                Info
                            </ActionButton>
                            <ActionButton onClick={() => logout()}>
                                Log out
                            </ActionButton>
                        </>)
                    }
                </Action>
            </HeaderComponent>
        </>
    );
};

export default Header;

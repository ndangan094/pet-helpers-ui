import Link from "next/link";

import {Action, ActionButton, Category, CategoryButton, HeaderComponent, Logo, Text} from "./styled-components";


const Header: React.FC = () => {
    return (
        <>
            <HeaderComponent>
                <Logo>
                    <img alt="logo" src={"images/logo.png"} width={100}/>
                    <Text>PET SECURE</Text>
                </Logo>
                <Category>
                    <CategoryButton>Dog</CategoryButton>
                    <CategoryButton>Cat</CategoryButton>
                    <CategoryButton>Bread</CategoryButton>
                </Category>
                <Action>
                    <ActionButton>
                        <Link href={`/login`}>Login</Link>
                    </ActionButton>
                    <ActionButton> <Link href={`/sign-up`}>Sign Up</Link>
                    </ActionButton>
                </Action>
            </HeaderComponent>
        </>
    );
};

export default Header;

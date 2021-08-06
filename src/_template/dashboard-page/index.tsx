import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {getUser} from '../../helpers/utils';
import {Pet} from '../../models/pet';
import {User} from '../../models/user';
import Footer from '../../_layout/footer';
import Header from '../../_layout/header';
import {Left, Right, RowLine, SubmitButton} from '../user-information-page/styled-components';
import {ActionButton, ActionRow, DashBoardContainer, ActionContainer, PetTag} from "./styled-components";

const DashboardTemplate = () => {

    const router = useRouter();
    const [pet, setPet] = useState<Pet>({name: "",});
    const [user, setUser] = useState<User>(undefined);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])




    const handleVolunteer = () => {
        router.push('/manage-volunteer');
    }

    return <>
        <Header/>
            <DashBoardContainer>
                <PetTag onClick={()=>{router.push("/dashboard/pet")}}>Quản lý pet</PetTag>
                <ActionButton onClick={handleVolunteer}>
                    Tình nguyện viên
                </ActionButton>
            </DashBoardContainer>
        <Footer/>
    </>
}

export default DashboardTemplate;
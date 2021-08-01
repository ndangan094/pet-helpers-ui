import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {getUser} from '../../helpers/utils';
import {Pet} from '../../models/pet';
import {User} from '../../models/user';
import Footer from '../../_layout/footer';
import Header from '../../_layout/header';
import {Left, Right, RowLine, SubmitButton} from '../user-information-page/styled-components';
import {ActionButton, ActionRow, DashBoardContainer, ActionContainer, ImagePreview} from "./styled-components";

const DashboardTemplate = () => {

    const router = useRouter();
    const [pet, setPet] = useState<Pet>({name: "",});
    const [user, setUser] = useState<User>(undefined);
    const [isLoading, setLoading] = useState(false);
    let formData;


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])


    const createPet = async () => {
        setLoading(true);
        const response = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.access_token}`
            },
            body: JSON.stringify({
                "name": pet.name,
                "age": pet.age,
                "color": pet.color,
                "health_condition": pet.health_condition,
                "weight": pet.weight,
                "description": pet.description,
                "species": pet.species
            })
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets`, response);
            if (fetchResponse.status == 200) {
                const data = await fetchResponse.json();
                await addImages(data.pet_id);

            } else{
                setLoading(false)
                alert("Đã có lỗi xảy ra")

            }

        } catch (e) {
            setLoading(false)

            alert("Đã có lỗi xảy ra")
        }
    }

    const addImages = async (id) => {
        const response = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.access_token}`,
            },
            body: formData
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets/${id}/images`, response,);
            console.log(fetchResponse)
            if (fetchResponse.status != 200) {
                throw Error()
            }else{
                setLoading(false)
                alert("Thêm thú nuôi thành công")
                router.push("/");
            }
        } catch (e) {
            throw Error()
        }
    }

    return <>
        <Header/>
        <DashBoardContainer>
            <ActionRow>
                <ActionButton>
                    Thêm pet
                </ActionButton>
                <ActionButton>
                    Tình nguyện viên
                </ActionButton>
            </ActionRow>

            <ActionContainer>
                <div>Thêm pet</div>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        Tên:
                    </Left>
                    <Right onChange={(e) => {
                        pet.name = e.target.value;
                        setPet(pet);
                    }}/>
                </RowLine><RowLine>
                <Left>
                    Tuổi:
                </Left>
                <Right onChange={(e) => {
                    pet.age = e.target.value;
                    setPet(pet);
                }}/>
            </RowLine><RowLine>
                <Left>
                    Màu lông:
                </Left>
                <Right onChange={(e) => {
                    pet.color = e.target.value;
                    setPet(pet);
                }}/>
            </RowLine><RowLine>
                <Left>
                    Tình trạng sức khoẻ:
                </Left>
                <Right onChange={(e) => {
                    pet.health_condition = e.target.value;
                    setPet(pet);
                }}/>
            </RowLine><RowLine>
                <Left>
                    Cân nặng:
                </Left>
                <Right onChange={(e) => {
                    pet.weight = parseFloat(e.target.value);
                    setPet(pet);
                }}/>
            </RowLine><RowLine>
                <Left>
                    Mô tả chi tiết:
                </Left>
                <Right onChange={(e) => {
                    pet.description = e.target.value;
                    setPet(pet);
                }}/>
            </RowLine>
                <RowLine>
                    <Left>
                        Loại:
                    </Left>
                    <Right onChange={(e) => {
                        pet.species = e.target.value;
                        setPet(pet);
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Ảnh:
                    </Left>
                    <ImagePreview>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple={true}
                            onChange={(e) => {
                                const temp = new FormData();

                                const files = e.target.files;

                                for (let i = 0; i < files.length; i++) {
                                    temp.append(`images`, files[i])
                                }
                                formData = temp;
                                console.log(formData)

                            }}
                            name="image"
                            type="file"
                        />
                    </ImagePreview>
                </RowLine>
                {isLoading ? <>
                        <SubmitButton> <img src={"images/loading.gif" } width={20}/></SubmitButton>
                    </> :
                    <SubmitButton onClick={async () => {
                        await createPet();
                    }}>
                        Submit
                    </SubmitButton>
                }
            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}

export default DashboardTemplate;
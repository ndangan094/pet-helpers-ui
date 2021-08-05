import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import { getGender } from '../../hooks/ultis.hook';
import {Pet} from '../../models/pet';
import {User} from '../../models/user';
import Footer from '../../_layout/footer';
import Header from '../../_layout/header';
import { RowLine, SubmitButton} from '../user-information-page/styled-components';
import {ActionButton, ActionContainer, ActionRow, BoxPet, DashBoardContainer, Left,ListPetContainer,PetList,Right} from "./styled-components";
import { Modal } from 'antd';

const PetTemplate = () => {

    const router = useRouter();
    const [pet, setPet] = useState<Pet>({name: "", sex: "male", species: "dog",age:"young"});
    const [user, setUser] = useState<User>(undefined);
    const [isLoading, setLoading] = useState(false);
    const [a, seta] = useState(true);
    const [error, setError] = useState("");
    const [mode,setMode] = useState("listpet")
    let formData;


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const ModalConfirm = () => {
        return <Modal title="Xoá thú cưng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            Bạn có muốn xoá thú cưng này?
        </Modal>
    }


    const check = () => {
        console.log(pet.age)
        if (pet.age === "" || pet.age === undefined) {
            setError("Vui lòng nhập tuổi");
        } else if (pet.name === "" || pet.name === undefined) {
            setError("Vui lòng nhập tên");
        } else if (pet.weight === 0 || pet.weight === undefined) {
            setError("Vui lòng nhập cân nặng");
        } else if (pet.description === "" || pet.description === undefined) {
            setError("Vui lòng nhập mô tả");
        } else if (pet.health_condition === "" || pet.health_condition === undefined) {
            setError("Vui lòng nhập tình trạng sức khoẻ");
        } else if (pet.color === "" || pet.color === undefined) {
            setError("Vui lòng nhập tình màu lông");
        } else if (formData === undefined || formData.length <= 0) {
            console.log(formData)
            setError("Vui lòng chọn ảnh");
        } else
            setError("");
        console.log(error)
    }


    const createPet = async () => {
        setLoading(true);
        console.log("ấdas")
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
                "gender":pet.sex,
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

            } else {
                setLoading(false)
                alert("Đã có lỗi xảy ra")

            }

        } catch (e) {
            setLoading(false)

            alert("Đã có lỗi xảy ra")
        }


    }

    const [listPet,setListPet] = useState<Pet[]>();


    const getPet = async () => {
        const response = {
            method: 'GET',
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets`, response);
            if(fetchResponse.status==200){
                const data = await fetchResponse.json();
                console.log(data.pets);
                const _item: Pet[] = data.pets.map((item)=>{
                    return({
                        name: item.name,
                        age: item.age,
                        color: item.color,
                        health_condition: item.health_condition,
                        weight: item.weight,
                        description: item.description,
                        species: item.species,
                        image: item.images
                    })
                })
                console.log("item---->",_item)
                setListPet(_item);
                console.log("pet----->",pet)
            }
        } catch (e) {
            return e;
        }
    }

    useEffect(()=>{
        getPet();
    },[])

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
            } else {
                setLoading(false)
                alert("Thêm thú nuôi thành công")
                router.push("/");
            }
        } catch (e) {
            throw Error()
        }
    }



    const AddPet = () =>{
        return <>
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
                <div style={{display: 'flex', flexDirection: "row",width:"55%"}}>
                    <div style={{display: "flex", flexDirection: "row", paddingRight: "20px"}}>
                        {pet.age == "young" ? <img onClick={() => {
                                pet.age = "young";
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                pet.age = "young";
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                        <div>Còn nhỏ</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", paddingRight: "20px"}}>
                        {pet.age == "mature" ? <img onClick={() => {
                                pet.age = "mature";
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                pet.age = "mature";
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                        <div>Trưởng thành</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {pet.age == "old" ? <img onClick={() => {
                                pet.age = "old";
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                pet.age = "old";
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                        <div>Đã già</div>
                    </div>
                </div>
            </RowLine><RowLine>
                <Left>
                    Màu lông:
                </Left>
                <Right onChange={(e) => {
                    pet.color = e.target.value;
                    setPet(pet);
                }}/>
            </RowLine>
                <RowLine>
                    <Left >
                        Giới tính:
                    </Left>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                        <div style={{display: "flex", flexDirection: "row", marginRight: "20px"}}>
                            {pet.sex == "male" ? <img onClick={() => {
                                    pet.sex = "male";
                                    setPet(pet);
                                    seta(!a);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    pet.sex = "male";
                                    setPet(pet);
                                    seta(!a);

                                    console.log(pet.sex)
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Đực</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {pet.sex == "female" ? <img onClick={() => {
                                    pet.sex = "female";
                                    setPet(pet);
                                    seta(!a);

                                    console.log(pet.sex)

                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    pet.sex = "female";
                                    setPet(pet);
                                    seta(!a);

                                    console.log(pet.sex)
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Cái</div>
                        </div>
                    </div>
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
                <Right type={"number"} onChange={(e) => {
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
                    <Left >
                        Loại:
                    </Left>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                        <div style={{display: "flex", flexDirection: "row", marginRight: "20px"}}>
                            {pet.species == "dog" ? <img onClick={() => {
                                    pet.species = "dog";
                                    setPet(pet);
                                    seta(!a);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    pet.species = "dog";
                                    setPet(pet);
                                    seta(!a);
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Chó</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {pet.species == "cat" ? <img onClick={() => {
                                    pet.species = "cat";
                                    setPet(pet);
                                    seta(!a);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    pet.species = "cat";
                                    setPet(pet);
                                    seta(!a);
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Mèo</div>
                        </div>
                    </div>
                </RowLine>
                <RowLine>
                    <Left>
                        Ảnh:
                    </Left>
                    <div>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple={true}
                            onChange={(e) => {
                                const temp = new FormData();

                                const files = e.target.files;

                                for (let i = 0; i < files.length; i++) {
                                    console.log(files.length)
                                    temp.append(`images`, files[i])
                                }
                                formData = temp;
                                console.log(formData)

                            }}
                            name="image"
                            type="file"
                        />
                    </div>
                </RowLine>
                <div>{error}</div>
                {isLoading ? <>
                        <SubmitButton> <img src={"/images/loading.gif"} width={20}/></SubmitButton>
                    </> :
                    <SubmitButton onClick={async () => {
                        check();
                        console.log(pet);
                        if (error == "") {
                            await createPet();
                        }
                    }}>
                        Submit
                    </SubmitButton>
                }
            </ActionContainer></>
    }

    const ListPet = () =>{
        return <>
            <ListPetContainer>
                <PetList>
                    {listPet?.map((pet)=>{
                        return <>
                            <BoxPet>
                                <div style={{display:"flex",flexDirection:"row",height:"100%",alignItems:'center'}}>
                                    <img style={{marginLeft:"5px",height:"120px",width:"120px",objectFit:"cover",borderRadius:"5px"}} src={pet?.image[0]?.url?pet.image[0].url:"https://i.vimeocdn.com/portrait/1274237_300x300.jpg"}/>
                                    <div style={{marginLeft:"10px",display:"flex",flexDirection:"column",justifyContent:'space-evenly',height:"100%"}}>
                                        <div style={{fontSize:"18px",fontWeight:"bold"}}>{pet?.name}</div>
                                        <div style={{fontSize:"16px"}}>Giới tính: {getGender(pet?.age)}</div>
                                        <div style={{fontSize:"16px"}}>Sức khoẻ: {pet?.health_condition}</div>
                                    </div>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",height:"100%",justifyContent:'space-evenly'}}>
                                    <ActionButton>Chi tiết</ActionButton>
                                    <ActionButton onClick={()=>{showModal()}} color={"#FF4848"}>Xoá</ActionButton>
                                    <ModalConfirm/>
                                </div>
                            </BoxPet>
                        </>
                    })}
                </PetList>
            </ListPetContainer>
        </>
    }

    return <>
        <Header/>
        <DashBoardContainer>
            {
                mode==="listpet"?<ListPet/>:<AddPet/>
            }
        </DashBoardContainer>
        <Footer/>
    </>
}


export default PetTemplate;
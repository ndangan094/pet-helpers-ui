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

const CreatePetTempalte = () => {

    const router = useRouter();
    const [pet, setPet] = useState<Pet>({name: "", sex: "male", species: "dog",age:"young"});
    const [user, setUser] = useState<User>(undefined);
    const [isLoading, setLoading] = useState(false);
    const [a, seta] = useState(true);
    const [error, setError] = useState("");
    const [mode,setMode] = useState("listpet");
    const [idPet,setIdPet] = useState(undefined);
    let formData ;

    const [name,setName] = useState("");



    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await deletePet();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const ModalConfirm = () => {
        return <Modal title="Xoá thú cưng" visible={isModalVisible} onOk={()=>{handleOk()}} onCancel={handleCancel}>
            {"Bạn có muốn xoá thú cưng này?"}
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
        formData.append("name",pet.name);
        formData.append("age", pet.age);
        formData.append("color", pet.color);
        formData.append("gender",pet.sex);
        formData.append("health_condition", pet.health_condition);
        formData.append("weight", pet.weight);
        formData.append("description", pet.description);
        formData.append("species", pet.species);
        const response = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.access_token}`
            },
            body: formData
        };
        try {
            let response = await new Promise(async resolve => {
                let request = new XMLHttpRequest();
                request.open('POST', `${process.env.NEXT_PUBLIC_BASE_URL}/pets`);
                request.setRequestHeader('Authorization', `Bearer ${user.access_token}`);
                request.onreadystatechange = function() { // Call a function when the state changes.
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        // Request finished. Do processing here.
                        setLoading(false)
                        alert("Thêm thú nuôi thành công")
                        router.push("/dashboard/pet");
                    }
                }
                request.send(formData);
            })


        } catch (e) {
            console.log(e)
            setLoading(false)
            alert("Đã có lỗi xảy ra")
        }


    }

    const [listPet,setListPet] = useState<Pet[]>();

    const deletePet = async () =>{

        const response = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.access_token}`
            },
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets/${idPet}`, response);
            if(fetchResponse.status==200){
                location.reload();
            }else{
                alert("Đã có lỗi xảy ra");
            }
        }catch (e) {
            alert("Đã có lỗi xảy ra");
        }
    }


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
                        id:item.id,
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
            </>
    }

    return <>
        <Header/>
        <DashBoardContainer>
            <ActionContainer>
                <div style={{height: "100px"}}/>
                <div style={{fontWeight:"bold",fontSize:"30px"}}>Thêm pet</div>
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
                                console.log(pet)
                                setPet(pet);
                                seta(!a);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                pet.age = "young";
                                console.log(pet)
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
            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}


export default CreatePetTempalte;
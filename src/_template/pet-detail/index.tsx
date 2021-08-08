import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react"
import {Pet} from '../../models/pet';
import {User} from "../../models/user"
import Footer from "../../_layout/footer"
import Header from "../../_layout/header"
import {ActionContainer, DashBoardContainer, Left, Right} from '../create-pet-page/styled-components';
import {RowLine, SubmitButton} from '../user-information-page/styled-components';

const PetDetailTemplate = () => {

    const router = useRouter();
    const [user, setUser] = useState<User>(undefined);
    const [pet, setPet] = useState<Pet>(undefined);
    const [a, seta] = useState(true);
    const [imageDelete, setImageDelete] = useState([])
    const [formData, setFormdata] = useState(undefined);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [])

    const updatePet = async () => {

        const response = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token}`
            },
            body: JSON.stringify({
                "name": pet.name,
                "age": pet.age,
                "color": pet.color,
                "health_condition": pet.health_condition,
                "weight": pet.weight,
                "description": pet.description,
                "species": pet.species,
                "gender": pet.sex
            }),
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets/${router.query.id}`, response);
            if (fetchResponse.status == 200) {
                return true;
            } else {
                return false;
                alert("Đã có lỗi xảy ra");
            }
        } catch (e) {
            return e;
        }


    }

    const deleteImage = async () => {
        const response = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token}`
            },
            body: JSON.stringify({urls: imageDelete}),
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets/${router.query.id}/images`, response);
            if (fetchResponse.status == 200) {
                return true;
            } else {
                return false;
                alert("Đã có lỗi xảy ra");
            }
        } catch (e) {
            return e;
        }
    }
    const addImage = async () => {
        try {
            let response = await new Promise(async resolve => {
                let request = new XMLHttpRequest();
                request.open('POST', `${process.env.NEXT_PUBLIC_BASE_URL}/pets/${router.query.id}/images`);
                request.setRequestHeader('Authorization', `Bearer ${user.access_token}`);
                // request.setRequestHeader('Content-Type', 'application/json');
                // request.setRequestHeader('Accept', 'application/json');
                request.onreadystatechange = function () { // Call a function when the state changes.
                    if (request.readyState == 4 && request.status === 200) {
                        setLoading(false);
                        alert("Cập nhật thú nuôi thành công")
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


    const getPet = async () => {
        const response = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        try {
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets/${router.query.id}`, response);
            if (fetchResponse.status == 200) {
                const data = await fetchResponse.json();
                console.log(data);
                const _item: Pet = {
                    id: data.id,
                    name: data.name,
                    age: data.age,
                    color: data.color,
                    health_condition: data.health_condition,
                    weight: data.weight,
                    description: data.description,
                    species: data.species,
                    image: data.images,
                    sex: data.gender
                }

                setPet(_item);

                console.log("---->", pet)
            }
        } catch (e) {
            return e;
        }
    }

    useEffect(() => {
        if (router.query.id)
            getPet()
    }, [router.query.id])


    return <>
        <Header/>
        <DashBoardContainer>
            <ActionContainer>
                <div style={{paddingBottom: "100px"}}/>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        Tên:
                    </Left>
                    <Right value={pet?.name} onChange={(e) => {
                        const temp = {...pet}
                        temp.name = e.target.value;
                        setPet(temp);
                    }}/>
                </RowLine><RowLine>
                <Left>
                    Tuổi:
                </Left>
                <div style={{display: 'flex', flexDirection: "row", width: "55%"}}>
                    <div style={{display: "flex", flexDirection: "row", paddingRight: "20px"}}>
                        {pet?.age == "young" ? <img onClick={() => {
                                const temp = {...pet}
                                temp.age = "young";
                                setPet(temp);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                const temp = {...pet}
                                temp.age = "young";
                                setPet(temp);
                            }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                        <div>Còn nhỏ</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", paddingRight: "20px"}}>
                        {pet?.age == "mature" ? <img onClick={() => {
                                const temp = {...pet}
                                temp.age = "mature";
                                setPet(temp);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                const temp = {...pet}
                                temp.age = "mature";
                                setPet(temp);
                            }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                        <div>Trưởng thành</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {pet?.age == "old" ? <img onClick={() => {
                                const temp = {...pet}
                                temp.age = "old";
                                setPet(temp);
                            }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                            <img onClick={() => {
                                const temp = {...pet}
                                temp.age = "old";
                                setPet(temp);
                            }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                        <div>Đã già</div>
                    </div>
                </div>
            </RowLine><RowLine>
                <Left>
                    Màu lông:
                </Left>
                <Right value={pet?.color} onChange={(e) => {
                    const temp = {...pet}
                    temp.color = e.target.value;
                    setPet(temp);
                }}/>
            </RowLine>
                <RowLine>
                    <Left>
                        Giới tính:
                    </Left>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                        <div style={{display: "flex", flexDirection: "row", marginRight: "20px"}}>
                            {pet?.sex == "male" ? <img onClick={() => {
                                    const temp = {...pet}
                                    temp.sex = "male";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    const temp = {...pet}
                                    temp.sex = "male";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Đực</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {pet?.sex == "female" ? <img onClick={() => {
                                    const temp = {...pet}
                                    temp.sex = "female";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    const temp = {...pet}
                                    temp.sex = "female";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Cái</div>
                        </div>
                    </div>
                </RowLine><RowLine>
                <Left>
                    Tình trạng sức khoẻ:
                </Left>
                <Right value={pet?.health_condition} onChange={(e) => {
                    const temp = {...pet}
                    temp.health_condition = e.target.value;
                    setPet(temp);
                }}/>
            </RowLine><RowLine>
                <Left>
                    Cân nặng:
                </Left>
                <Right value={pet?.weight} type={"number"} onChange={(e) => {
                    const temp = {...pet}
                    temp.weight = parseFloat(e.target.value);
                    setPet(temp);
                }}/>
            </RowLine><RowLine>
                <Left>
                    Mô tả chi tiết:
                </Left>
                <Right value={pet?.description} onChange={(e) => {
                    const temp = {...pet}
                    temp.description = e.target.value;
                    setPet(temp);
                }}/>
            </RowLine>
                <RowLine>
                    <Left>
                        Loại:
                    </Left>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                        <div style={{display: "flex", flexDirection: "row", marginRight: "20px"}}>
                            {pet?.species == "dog" ? <img onClick={() => {
                                    const temp = {...pet}
                                    temp.species = "dog";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    const temp = {...pet}
                                    temp.species = "dog";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/unchoose.svg"}/>}
                            <div>Chó</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {pet?.species == "cat" ? <img onClick={() => {
                                    const temp = {...pet}
                                    temp.species = "cat";
                                    setPet(temp);
                                }} style={{marginRight: "5px"}} src={"/images/choose.svg"}/> :
                                <img onClick={() => {
                                    const temp = {...pet}
                                    temp.species = "cat";
                                    setPet(temp);
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
                                setFormdata(temp);
                                console.log(formData)
                            }}
                            name="image"
                            type="file"
                        />
                    </div>
                </RowLine>
                <RowLine>
                    <Left>

                    </Left>
                    <div style={{
                        borderRadius: "10px",
                        justifyContent: "start",
                        flexWrap: "wrap",
                        display: "flex",
                        maxWidth: "500px",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        backgroundImage: "url(" + "https://hanoipetadoption.com/Images/patterns/pattern2.png" + ")"
                    }}>
                        {pet?.image.map((image) => {
                            return <>
                                <div style={{width: "250px", height: "250px", position: "relative"}}>
                                    <img style={{objectFit: 'cover', padding: "5px 5px 5px 5px", zIndex: 0}}
                                         src={image.url} width={"250px"} height={"250px"}></img>
                                    <img onClick={() => {
                                        const temp = {...pet}
                                        const index = temp.image.indexOf(image);
                                        if (temp.image.length > 1) {
                                            if (index > -1) {
                                                setImageDelete([...imageDelete, image.url]);
                                                temp.image.splice(index, 1);
                                            }
                                        } else
                                            alert("Phải có ít nhất 1 ảnh");
                                        setPet(temp);
                                        console.log(imageDelete);

                                    }} style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        zIndex: 1,
                                        cursor: "pointer"
                                    }} src={"/images/delete.png"} width={"25px"} height={"25px"}/>
                                </div>
                            </>
                        })}
                    </div>
                </RowLine>

                {isLoading ? <>
                        <SubmitButton> <img src={"/images/loading.gif"} width={20}/></SubmitButton>
                    </> :
                    <SubmitButton onClick={async () => {
                        setLoading(true);
                        const c = await deleteImage();
                        const d = await updatePet();
                        if (c && d) {
                            if (formData === undefined) {
                                setLoading(false);
                                alert("Cập nhật thú nuôi thành công")
                                router.push("/dashboard/pet");
                            } else {
                                addImage();
                            }
                        } else {
                            setLoading(false);
                            alert("Đã có lỗi xảy ra");
                        }
                    }}>
                        Cập nhật
                    </SubmitButton>
                }
                <div style={{paddingBottom: "200px"}}/>

            </ActionContainer>
        </DashBoardContainer>
        <Footer/>
    </>
}

export default PetDetailTemplate;
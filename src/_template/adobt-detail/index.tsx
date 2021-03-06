import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import {AdobtDetailComponent, HeadPet, InfoPet, RowDetail} from "./styled-component";
import {Pet} from "../../models/pet";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getGender} from "../../hooks/ultis.hook";


const AdobtDetailTempalte = () => {

    const router = useRouter();
    const [pet, setPet] = useState<Pet>(undefined);


    const getPet = async () => {
        const response = {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
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
            }
        } catch (e) {
            return e;
        }
    }

    useEffect(() => {
        if (router.query.id)
            getPet()
    }, [router.query.id])

    const RowLine = (props) => {
        return <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <div style={{fontSize: "16px", fontWeight: "bold", marginRight: "5px"}}>{props.tag}</div>
                    <div style={{fontSize: "16px", marginRight: "5px"}}>{props.value}</div>
                </div>
                {props.isHide === true ? <div/> :
                    <div style={{height: "1px", width: "400px", background: "gray", marginTop: "5px"}}/>}
            </div>
        </>
    }

    const Title = (props) => {
        return <>
            <div style={{
                paddingLeft: "350px",
                paddingTop: "30px",
                fontSize: "2.8125rem",
                fontWeight: "bold"
            }}>{props.title}</div>
            <div style={{marginLeft: "350px", height: "3px", width: "70px", background: "gray", marginBottom: "10px"}}/>
        </>
    }


    return <>
        <Header/>
        <AdobtDetailComponent>
            <HeadPet>
                <div style={{paddingLeft: "350px", fontSize: "2.8125rem", fontWeight: "bold"}}>Th??ng Tin T???ng Boss</div>
            </HeadPet>
            <RowDetail>
                <img style={{marginLeft: "350px", objectFit: "cover", borderRadius: "10px"}} src={pet?.image[0].url}
                     width={"400px"} height={"400px"}/>
                <InfoPet>
                    <div style={{fontSize: "2.125rem", fontWeight: "bold"}}>{pet?.name}</div>
                    <RowLine tag={"Tu???i:"} value={getGender(pet?.age)}/>
                    <RowLine tag={"M??u s???c:"} value={pet?.color}/>
                    <RowLine tag={"T??nh tr???ng s???c kho???:"} value={pet?.health_condition}/>
                    <RowLine tag={"C??n n???ng:"} value={pet?.weight}/>
                    <RowLine isHide={true} tag={"Gi???i t??nh:"} value={pet?.sex === "male" ? "?????c" : "C??i"}/>
                </InfoPet>
            </RowDetail>
            <Title title={"Th??ng tin chi ti???t"}/>
            <div style={{paddingLeft: "350px", fontSize: "14px", color: "#6f6f6f"}}>{pet?.description}</div>
            <Title title={"H??nh ???nh"}/>
            <div style={{
                marginLeft: "350px",
                marginRight: "300px",
                justifyContent: "start",
                flexWrap: "wrap",
                display: "flex",
                alignItems: "center",
            }}>
                {pet?.image.map((image)=>{
                    return <>
                        <img style={{objectFit:"cover",padding:"5px",borderRadius:"10px"}} src={image.url} width={"250px"} height={"250px"}/>
                    </>
                })}
            </div>
        </AdobtDetailComponent>
        <Footer/>
    </>
}

export default AdobtDetailTempalte;
import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Carousel, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { AdobtPageComponent ,FindPetComponent,PetCategory,PetTag,ListPet,PetBox} from "./styled-conponents";
import Icon from '@ant-design/icons';
import CatPng from '../../../public/pawprint.png'
import { useState } from "react";
import { useEffect } from "react";
import { Pet } from "../../models/pet";
import { getGender } from "../../hooks/ultis.hook";


const AdobtPageTemplate = () => {
 
  const CatIcon = () => <img src={CatPng} />;
  const router = useRouter();
  const handleDonateClick = () => {
    router.push("/donation");
  };
  const handleVolunteerClick = () => {
    router.push("/volunteer");
  };
  const handleAdobtClick = () => {
    router.push("/adobt");
  };

  const [petCategory,setPetCategory] = useState("");
  const [pet,setPet] = useState<Pet[]>();

  const chooseCategory = (category) => {
    setPetCategory(category);
  }

  useEffect(() => {
    getPet();
  }, [petCategory])


  const getPet = async () => {
    const response = {
      method: 'GET',
    };
    try {
      const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pets` + (petCategory === ""?"":`?species=${petCategory}`), response);
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
            image: item.images,
            sex:item.gender
          })
        })
        console.log("item---->",_item)
        setPet(_item);
        console.log("pet----->",pet)
      }
    } catch (e) {
      return e;
    }
  }

  const Tag = ({tag,value,isHide}) => {
    return <>
        <div style={{display:"flex",flexDirection:"row", borderBottom:`${!isHide?"1":"0"}px dashed #cecece`,margin:"5px 0 5px 0"}}>
          <div style={{marginRight:"5px",fontWeight:"bold"}}>{tag}</div>
          <div>{value}</div>
        </div>
    </>
  }

  return (
    <>
      <Header />
      <AdobtPageComponent className="home-page-container">
        <Row className="adobt-page-header">
          <div data-aos="fade-up" data-aos-duration="1500" className="adobt-heading-container">
            <h1>Nhận Nuôi</h1>
            <div className="breadcrumb">
              <span
                className="breadcrumb-item"
                onClick={() => {
                  router.push("/");
                }}
              >
                Trang chủ
              </span>

              <span className="breadcrumb-active"> / Nhận Nuôi</span>
            </div>
          </div>
        </Row>
        <Row style={{backgroundColor:"white"}} className="adobt-page-content" data-aos="zoom-in" data-aos-duration="1500" >
          <Col span={5}></Col>
          <Col span={14}>
            <Row>
              <Col className="process" span={16}>
                <h3>quy trình nhận nuôi</h3>
                <hr />
                <p>
                  Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự
                  hỏi bản thân rằng mình đã sẵn sàng để chịu trách nhiệm cả đời
                  cho bé chưa, cả về tài chính, nơi ở cũng như tinh thần. Việc
                  nhận nuôi cần được sự đồng thuận lớn từ bản thân bạn cũng như
                  gia đình và những người liên quan. Xin cân nhắc kỹ trước khi
                  liên hệ với HPA về việc nhận nuôi.
                  <br />
                  <br />
                  Bạn đã sẵn sàng? Hãy thực hiện các bước sau đây nhé:
                  <br />
                  <br />
                  1️⃣ Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web của
                  HPA.
                  <br />
                  2️⃣ Liên hệ với Tình nguyện viên phụ trách bé để tìm hiểu thêm
                  về bé.
                  <br />
                  3️⃣ Tham gia phỏng vấn nhận nuôi.
                  <br />
                  4️⃣ Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền
                  vía để đón bé về.
                  <br />
                  5️⃣ Thường xuyên cập nhật về tình hình của bé, đặc biệt là khi
                  có sự cố để được tư vấn kịp thời.
                  <br />
                  <br />
                  ❗ Lưu ý:
                  <br />
                  - Chỉ inbox 01 Tình nguyện viên phỏng vấn, KHÔNG NÊN inbox tất
                  cả danh sách. Trường hợp TNV chưa phản hồi lại trong vòng 1
                  ngày, vui lòng inbox cho Page.
                  <br />- Phần phỏng vấn có thể có nhiều câu hỏi mang tính chất
                  riêng tư, vì vậy mong bạn hãy kiên nhẫn nhé!
                  <br></br>
                  - Trường hợp không nuôi được tiếp cần trả lại cho Nhóm, không
                  tự ý đem cho người khác.
                  <br />
                  <br />
                  🐕‍🦺 Nếu bạn chỉ có thể chăm sóc tạm thời (foster), tham khảo
                  thông tin tại mục Tình nguyện.
                  <br />
                  <br />
                  🐈 Tìm hiểu thêm về chương trình Nhận nuôi Ảo ở banner cuối
                  trang này.
                </p>
              </Col>
              <Col span={8}>
                <div className="condition">
                  <h5>điều kiện nhận nuôi</h5>
                  <ul>
                    <li><CatIcon /><span>Tài chính tự chủ và ổn định</span></li>
                    <li><CatIcon /><span>Chỗ ở cố định, ưu tiên tại Hà Nội</span></li>
                    <li><CatIcon /><span>Cam kết tiêm phòng và triệt sản</span></li>
                  </ul>
                </div>
              </Col>
            </Row>
          <FindPetComponent>
            <div style={{fontSize:"30px",fontWeight:"bold",textAlign:'center'}}>TÌM THÚ CƯNG</div>
            <PetCategory>
              <PetTag style={{backgroundColor:(petCategory === "")?"#018ae0":"#fc0"}} onClick={()=>{chooseCategory("")}}>Tất cả</PetTag>
              <PetTag style={{backgroundColor:(petCategory === "dog")?"#018ae0":"#fc0"}} onClick={()=>{chooseCategory("dog")}}>Chó</PetTag>
              <PetTag style={{backgroundColor:(petCategory === "cat")?"#018ae0":"#fc0"}} onClick={()=>{chooseCategory("cat")}}>Mèo</PetTag>
            </PetCategory>
          </FindPetComponent>
            <ListPet>
              {pet?.map((item)=>{
                return <>
                <PetBox onClick={()=>{router.push({pathname:"/adobt/pet-detail",query:{id:item.id}})}}>
                  <img style={{width:"100%",height:"219px",objectFit:"cover"}} src={item?.image[0]?.url?item?.image[0]?.url:"https://i.vimeocdn.com/portrait/1274237_300x300.jpg"} />
                  <div style={{fontSize: "1.3125rem",
                    fontWeight: "bold"}}>{item.name}</div>
                  <div style={{width:"50px",height:"2px",backgroundColor:"#cecece"}}>
                  </div>
                  <Tag isHide={false} tag={"Giới tính:"} value={item.sex ==="male"?"Đực":"Cái"}/>
                  <Tag isHide={false} tag={"Tuổi:"} value={getGender(item.age)}/>
                  <Tag isHide={true} tag={"Sức khoẻ:"} value={item.health_condition}/>
                </PetBox>
                </>
              })}
            </ListPet>
          </Col>
          <Col span={5}></Col>
        </Row>
      </AdobtPageComponent>
      <Footer />
    </>
  );
};

export default AdobtPageTemplate;

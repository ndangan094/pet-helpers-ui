import {Button, Input, Modal} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {validateEmail} from "../../hooks/ultis.hook";
import {Pet} from "../../models/pet";
import { User } from "../../models/user";
import Footer from "../../_layout/footer";
import Header from "../../_layout/header";
import {DashBoardContainer, PetTag,} from "./styled-components";

const DashboardTemplate = () => {
  const router = useRouter();
  const [pet, setPet] = useState<Pet>({name: ""});
  const [user, setUser] = useState<User>(undefined);
  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [listEmail,setListEmail] = useState([])
  const [isLoading,setIsloading] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const handleVolunteer = () => {
    router.push("/manage-volunteer");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const sendMail = async () => {
    setIsloading(true);
    const notSpace = mail.replace(/\s/g, '');
    const listMail = notSpace.split(",");
    try {
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/email`, {
            "email": listMail,
            "body_mail": {
              "subject": subject,
              "body": content
            }
          }, {
            headers: {
              "Authorization": `Bearer ${user.access_token}`
            }
          }
      ).then(res => {
        if (res.status == 200) {
          setIsloading(false);
          alert("Gửi mail thành công thành công");
          setIsModalVisible(false);
        } else {
          setIsloading(false);

          alert("Đã có lỗi xảy ra");
        }
      })
    } catch (e) {
      setIsloading(false);
      alert("Đã có lỗi xảy ra");
      return e;
    }
  }


  const showModal = () => {
    setMail("")
    setContent("")
    setSubject("")
    setError("")
    setIsModalVisible(true);
  };

  const check = () => {
    setError("");
    if (mail === "")
      setError("Vui lòng nhập mail");
    else if (subject === "")
      setError("Vui lòng nhập chủ đề");
    else if (content === "")
      setError("Vui lòng nhập nội dung");
    else {
      const notSpace = mail.replace(/\s/g, '');
      const listMail = notSpace.split(",");
      for (let i = 0; i < listMail.length; i++) {
        if (!(listMail[i] === "")) {
          if (!validateEmail(listMail[i])) {
            setError("Danh sách mail không phù hợp");
            break;
          }
        }
      }
      if(error===""){
        console.log(listMail);
        setListEmail(listMail);
        console.log(listEmail);
      }
    }
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const DashBoardAdmin = () => {
    return (
        <>
          {(user?.role === "admin" || user?.role == "volunteer") ? <PetTag
              onClick={() => {
                router.push("/dashboard/pet");
              }}
          >
            Quản lý pet
          </PetTag> : null}

          {(user?.role === "admin") ? <PetTag onClick={handleVolunteer}>Tình nguyện viên</PetTag> : null}
        </>
    );
  };

  const DashBoardVolunteer = () => {
    return (
      <>
        <PetTag onClick={()=>{router.push('/dashboard/workschedule')}}>Lịch làm việc</PetTag>
      </>
    );
  };


  return (
    <>
      <Header/>
      <DashBoardContainer>
        <DashBoardAdmin/>
        {user?.role === 'volunteer' ? <DashBoardVolunteer/> : <></>}
        <PetTag onClick={() => {
          router.push('/dashboard/veterinary-clinic')
        }}>Quản lý phòng khám</PetTag>
        {((user?.role === "admin" || user?.role == "volunteer")) ? <PetTag onClick={() => {
          router.push('/dashboard/health-report')
        }}>Báo cáo sức khoẻ</PetTag> : null}
        <PetTag onClick={() => {
          showModal();
        }}>Gửi mail</PetTag>

        {/* <DashBoardAdmin/> */}
        <Modal maskClosable = {false} title={"Gửi mail"} style={{width: "500px", height: "400px"}} footer={null}
               visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div style={{flexDirection: "row", display: "flex", alignItems: "center"}}>
            <Input value={mail} onChange={(e) => {
              setError("")

              setMail(e.target.value)
            }} placeholder={"Đến"}/>
          </div>
          <div style={{height: "10px"}}/>
          <div style={{flexDirection: "row", display: "flex", alignItems: "center"}}>
            <Input value={subject} onChange={(e) => {
              setError("")

              setSubject(e.target.value)
            }} placeholder={"Chủ đề"}/>
          </div>
          <div style={{height: "10px"}}/>
          <TextArea value={content} onChange={(e) => {
            setError("")
            setContent(e.target.value)
          }} placeholder={"Nội dung"} style={{resize: "none", height: "300px"}} rows={4}/>
          <div style={{height: "10px"}}/>
          <div style={{flexDirection: "row", display: "flex", alignItems: "center"}}>
            {isLoading?<img src={"images/loading.gif"} height={"32px"}/>:<Button type="primary" onClick={async () => {
              check();
              if (error === "") {
                console.log(listEmail)
                await sendMail();
              }
            }}>Gửi</Button>}
            <div style={{paddingLeft: "10px", color: "red"}}>{error}</div>
          </div>

        </Modal>
      </DashBoardContainer>
      <Footer/>
    </>
  );
};

export default DashboardTemplate;

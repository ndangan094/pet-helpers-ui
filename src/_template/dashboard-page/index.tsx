import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../helpers/utils";
import { Pet } from "../../models/pet";
import { User } from "../../models/user";
import Footer from "../../_layout/footer";
import Header from "../../_layout/header";
import {
  Left,
  Right,
  RowLine,
  SubmitButton,
} from "../user-information-page/styled-components";
import {
  ActionButton,
  ActionRow,
  DashBoardContainer,
  ActionContainer,
  PetTag,
} from "./styled-components";

const DashboardTemplate = () => {
  const router = useRouter();
  const [pet, setPet] = useState<Pet>({ name: "" });
  const [user, setUser] = useState({role: 'guest'});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const handleVolunteer = () => {
    router.push("/manage-volunteer");
  };

  const DashBoardAdmin = () => {
    return (
      <>
          {(user.role==="admin"||user.role=="volunteer")?<PetTag
              onClick={() => {
                  router.push("/dashboard/pet");
              }}
          >
              Quản lý pet
          </PetTag>:null}

        {(user.role==="admin")?<PetTag onClick={handleVolunteer}>Tình nguyện viên</PetTag>:null}
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
      <Header />
      <DashBoardContainer>
          <DashBoardAdmin/>
          {user.role==='volunteer'?<DashBoardVolunteer/>:<></>}
          <PetTag onClick={()=>{router.push('/dashboard/veterinary-clinic')}}>Quản lý phòng khám</PetTag>
        {((user.role==="admin"||user.role=="volunteer"))?<PetTag onClick={()=>{router.push('/dashboard/health-report')}}>Báo cáo sức khoẻ</PetTag>:null}


        {/* <DashBoardAdmin/> */}
      </DashBoardContainer>
      <Footer />
    </>
  );
};

export default DashboardTemplate;

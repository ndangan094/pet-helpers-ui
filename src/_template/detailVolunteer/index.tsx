import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Button, Calendar, Badge } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { DetailVolunteerPageComponent } from "./styled-conponents";
import { WORK_SHIFT } from "../../constants/index";

const DetailVolunteerPageTemplate = () => {
  const [workDayList, setList] = useState([]);
  const [viewMonth, setViewMonth] = useState();
  const [viewYear, setViewYear] = useState();

  useEffect(() => {}, [workDayList]);
  useEffect(() => {
    getWorkSchedule()
  }, [viewMonth, viewYear]);

  const getWorkSchedule = () => {
    let date: any;
    if (viewYear) {
      date = new Date(`${viewYear}-${appendLeadingZeroes(viewMonth)}-05`);
    } else date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let start = getDateBackend(firstDay)
      
    let end = getDateBackend(lastDay)
    // console.log(start,end)
    getWorkDayList(start, end);
  }
  const getDateBackend = (date) => {
    return date.getFullYear() +
      "-" +
      appendLeadingZeroes(date.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(date.getDate());
  }
  function appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
 
  const getWorkDayList = async (start, end) => {
    try {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo.access_token)
      const settings = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access_token}`,
        },
      };

      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/work_schedule/${getUserDetail().id}?start_at=${start}&end_at=${end}`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        setList(data.work_schedule);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function getListData(value) {
    let listData = [];
    workDayList.forEach((ele) => {
      if (
        value.date() == parseInt(ele.working_day.slice(-2)) &&
        value.month() + 1 == parseInt(ele.working_day.slice(5, 7))
      ) {
        
        // console.log(value.month() + 1);
        switch (ele.working_shift) {
          case 0:
            listData = [
              { type: "warning", content: WORK_SHIFT.morning },
              { type: "success", content: WORK_SHIFT.afternoon },
            ];
            break;
          case 1:
            listData = [{ type: "warning", content: WORK_SHIFT.morning }];
            break;

          case 2:
            listData = [{ type: "success", content: WORK_SHIFT.afternoon }];
            break;

          default:
            break;
        }
      }
    });
    // console.log(value.date() == )

    return listData;
  }
  function dateCellRender(value) {
    // console.log(value);
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  const getUserDetail = () => {
    let info = JSON.parse(localStorage.getItem('detailVolunteerId'))
    console.log(info)
    return info;
  }
  const onPanelChange = (date, mode) => {
    setViewMonth(date._d.getMonth() + 1);
    setViewYear(date._d.getFullYear());
  };


  return (
    <>
      <Header />
      <DetailVolunteerPageComponent
        style={{ backgroundColor: "#f6f6f6" }}
        className="home-page-container"
      >
        <Row style={{ margin: "50px" }} align="middle" justify="center">
          <Col span={5}>
            <h1 style={{textAlign: 'center'}}>Lịch làm việc của {getUserDetail().name} </h1>
          </Col>

        </Row>
        <Row justify="center">
          <Col span={20}>
            <Calendar
              dateCellRender={dateCellRender}
              onPanelChange={onPanelChange}
            />
            ,
          </Col>
        </Row>
      </DetailVolunteerPageComponent>
      <Footer />
    </>
  );
};

export default DetailVolunteerPageTemplate;

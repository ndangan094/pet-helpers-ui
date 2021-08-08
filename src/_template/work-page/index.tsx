import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Button, Calendar, Badge, Modal, Select, Form } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { WorkPageComponent } from "./styled-conponents";
import { WORK_SHIFT } from "../../constants/index";
import { isBuffer } from "util";
import { useForm } from "antd/lib/form/Form";
const WorkPageTemplate = () => {
  const [workDayList, setList] = useState([]);
  const [viewMonth, setViewMonth] = useState();
  const [viewYear, setViewYear] = useState();
  const [updateWork, setUpdateWork] = useState();
  const [openModal, setOpenModal] = useState(false);
  const form = useForm();
  // useEffect(() => {
  //   var date = new Date();
  //   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //   var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  //   let start= firstDay.getFullYear() + "-" + appendLeadingZeroes(firstDay.getMonth() + 1) + "-" + appendLeadingZeroes(firstDay.getDate())
  //   let end = lastDay.getFullYear() + "-" + appendLeadingZeroes(lastDay.getMonth() + 1) + "-" + appendLeadingZeroes(lastDay.getDate())

  //   getWorkDayList(start, end);
  // }, []);
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
  function nextweek(){
    var today = new Date();
    if(today.getDay() == 0) return today;
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
  }
  const onFinish = (values: any) => {
    let nextWeek = [];
    let sunday = nextweek();
    for(let i = 1; i <= 6; i++) {
      let tempDate = new Date(sunday);
      nextWeek.push(getDateBackend(new Date(tempDate.setDate(sunday.getDate() + i ))))
    }
    // console.log(nextWeek)   
    updateNextWeek(nextWeek, values);
    setOpenModal(false);
  };

  const updateNextWeek = async (nextWeek, values) => {
    let work_schedule = [];
    for(let i = 0; i < 6; i++) {
      if(values[i] === -1) values[i] = null;
      let obj = {
        working_day: nextWeek[i],
        working_shift: values[i]
      }
      work_schedule.push(obj)
    }
     
    try {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo.access_token)
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access_token}`,
        },
        body: JSON.stringify({
          "work_schedule" : work_schedule
        })
      };

      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/work_schedule/me`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        getWorkSchedule()
      }
    } catch (e) {
      console.log(e);
    }

    
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/work_schedule/${userInfo.id}?start_at=${start}&end_at=${end}`,
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

  const handleCancel = () => {
    setOpenModal(false);
  };

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

  const onPanelChange = (date, mode) => {
    setViewMonth(date._d.getMonth() + 1);
    setViewYear(date._d.getFullYear());
  };

  const renderSelections = () => {
    return (
      <>
        <Select.Option value={0}>Fulltime</Select.Option>
        <Select.Option value={1}>Sáng</Select.Option>
        <Select.Option value={2}>Chiều</Select.Option>
        <Select.Option value={-1}>Nghỉ</Select.Option>

      </>
    );
  };

  return (
    <>
      <Header />
      <WorkPageComponent
        style={{ backgroundColor: "#f6f6f6" }}
        className="home-page-container"
      >
        <Row style={{ margin: "50px" }} align="middle" justify="space-around">
          <Col span={5}>
            <h1>Lịch làm việc của bạn</h1>
          </Col>
          <Col
            span={5}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div></div>
            <Button onClick={() => setOpenModal(true)} type="primary">
              Đăng ký lịch làm việc tuần tới
            </Button>
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
      </WorkPageComponent>
      <Modal
        title="Đăng ký lịch làm việc tuần tới"
        visible={openModal}
        onCancel={handleCancel}
        footer={[
          <Button form="form" key="submit" htmlType="submit">
              Submit
          </Button>
          ]}
      >
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          labelAlign='left'
          id='form'
          >

        <Form.Item
          label="Thứ hai"
          name="0"
          rules={[{ required: true, message: "Please select" }]}
          
        >
            <Select className="select-status">{renderSelections()}</Select>          
        </Form.Item>
        <Form.Item
          label="Thứ ba"
          name="1"
          rules={[{ required: true, message: "Please select" }]}
          
        >
            <Select className="select-status">{renderSelections()}</Select>          
        </Form.Item>
        <Form.Item
          label="Thứ tư"
          name="2"
          rules={[{ required: true, message: "Please select" }]}
        >
            <Select className="select-status">{renderSelections()}</Select>          
        </Form.Item>
        <Form.Item
          label="Thứ năm"
          name="3"
          rules={[{ required: true, message: "Please select" }]}
        >
            <Select className="select-status">{renderSelections()}</Select>          
        </Form.Item>
        <Form.Item
          label="Thứ sáu"
          name="4"
          rules={[{ required: true, message: "Please select" }]}
        >
            <Select className="select-status">{renderSelections()}</Select>          
        </Form.Item>
        <Form.Item
          label="Thứ bảy"
          name="5"
          rules={[{ required: true, message: "Please select" }]}
        >
            <Select className="select-status">{renderSelections()}</Select>          
        </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};

export default WorkPageTemplate;

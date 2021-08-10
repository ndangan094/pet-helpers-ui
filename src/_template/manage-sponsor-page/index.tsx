import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import {
  Row,
  Col,
  Carousel,
  Button,
  Table,
  Pagination,
  Space,
  Tag,
  Modal,
  Select,
  Form,
  Input,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { ManageSponsorPageComponent } from "./styled-components";
import React, { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const ManageSponsorPageTemplate = () => {
  const router = useRouter();
  const [sponsorList, setSponsorList] = useState([]);
  const [openAddDonate, setOpenAddDonate] = useState(false);
  const [openAddSponsor, setOpenAddSponsor] = useState(false);
  const [addSponsorForm] = Form.useForm();
  const [addDonateForm] = Form.useForm();
  const [monthDate, setMonthDate] = useState(
    moment(new Date()).format("YYYY-MM")
  );

  useEffect(() => {
    getListSponsor();
  }, [openAddSponsor]);

  const getListSponsor = async () => {
    try {
      let userInfo;
      const ISSERVER = typeof window === "undefined";
      if(!ISSERVER){
        userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/sponsors`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        data = Array.from(data.sponsors);
        data.forEach((element) => {
          element.key = element.id;
        });
        // console.log(data);
        setSponsorList(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDonate = (e, record) => {
    e.preventDefault();
    const ISSERVER = typeof window === "undefined";
    if(!ISSERVER){
      localStorage.setItem("sponsorAddDonateId", JSON.stringify(record));
    }
    setOpenAddDonate(true);
  };

  const handleAddSponsorCancel = () => {
    setOpenAddSponsor(false);
    addSponsorForm.resetFields();
  };
  const handleAddDonateCancel = () => {
    setOpenAddDonate(false);
    addDonateForm.resetFields();
  };

  const addSponsor = async (values) => {
    try {
      let userInfo;
      const ISSERVER = typeof window === "undefined";
      if(!ISSERVER){
        userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
      // console.log(userInfo.access_token)
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access_token}`,
        },
        body: JSON.stringify(values),
      };

      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sponsors`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addDonate = async (values) => {
    try {
      let userInfo
      let b;
      const ISSERVER = typeof window === "undefined";
      if(!ISSERVER){
        userInfo = JSON.parse(localStorage.getItem("userInfo"));
        b =  localStorage.getItem("sponsorAddDonateId")
      }



      values.sponsor_id = JSON.parse(
        b
      ).id;
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access_token}`,
        },
        body: JSON.stringify(values),
      };

      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/donate_detail`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onAddSponsorFinish = (values: any) => {
    console.log(values);
    addSponsorForm.resetFields();
    addSponsor(values);

    setTimeout(() => setOpenAddSponsor(false), 1000);
  };
  const onAddDonateFinish = (values: any) => {
    console.log(values);
    addDonate(values);
    addDonateForm.resetFields();
    setTimeout(() => setOpenAddDonate(false), 1000);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "first_name",
      render: (value: string, record: any) => {
        return <span>{value}</span>;
      },
      width: "10%",
      key: "first_name",
    },
    {
      title: "Họ",
      dataIndex: "last_name",
      sorter: false,
      render: (text) => <span>{text}</span>,
      width: "10%",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <span>{email}</span>,
      width: "15%",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",

      render: (value) => <span>{value}</span>,
      width: "30%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",

      render: (value) => <span>{value}</span>,
      width: "15%",
    },
    {
      title: `Thêm thông tin donate`,
      key: "action",
      render: (value: string, record: any) => {
        return (
          <Space size="middle" align="center">
            <a
              href="#!"
              title="Edit user"
              onClick={(e) => handleAddDonate(e, record)}
              style={{ marginLeft: "50px" }}
            >
              <PlusCircleOutlined
                style={{ color: "#1890ff", fontSize: "25px" }}
              />
            </a>
          </Space>
        );
      },
      width: "40%",
    },
  ];

  const getDonateInfo = async () => {
    let first_last = getWorkSchedule();
    console.log(first_last);
    try {
      let userInfo
      const ISSERVER = typeof window === "undefined";
      if(!ISSERVER){
        userInfo =  JSON.parse(localStorage.getItem("userInfo"));
      }
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/donate_detail?start_at=${first_last.start}&end_at=${first_last.end}`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        window.open(data.url);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getWorkSchedule = () => {
    let date: any;
    if (monthDate) {
      date = new Date(
        `${monthDate.slice(0, 4)}-${appendLeadingZeroes(
          monthDate.slice(5, 7)
        )}-05`
      );
    } else date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let start = getDateBackend(firstDay);

    let end = getDateBackend(lastDay);
    return { start, end };
    // console.log(start,end)
  };
  const getDateBackend = (date) => {
    return (
      date.getFullYear() +
      "-" +
      appendLeadingZeroes(date.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(date.getDate())
    );
  };
  function appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  const getSponsorAddDonateInfo = () => {
    let info
    const ISSERVER = typeof window === "undefined";
    if(!ISSERVER){
      info =  JSON.parse(localStorage.getItem('sponsorAddDonateId'))
    }
    return info?.first_name + ' ' + info?.last_name;
  }

  return (
    <>
      <Header />
      <ManageSponsorPageComponent className="home-page-container">
        <Row style={{ marginTop: "100px" }} justify="space-around">
          <Col span={5}>
            <h1 style={{ marginLeft: "50px" }}>Danh sách người ủng hộ</h1>
          </Col>
          <Col span={9}></Col>
          <Col
            span={10}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button onClick={() => setOpenAddSponsor(true)} type="primary">
              Thêm người ủng hộ
            </Button>{" "}
            <DatePicker
              className="select-status"
              onChange={(value, dateString) => {
                setMonthDate(dateString);
              }}
              defaultValue={moment(new Date())}
              picker="month"
            />
            <Button onClick={() => getDonateInfo()} type="primary">
              Tải về thông tin donate
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Table
            columns={columns}
            dataSource={sponsorList}
            rowKey="orderId"
            pagination={false}
            scroll={{ x: 768 }}
            style={{ width: "100%", marginTop: "50px" }}
          />
        </Row>
      </ManageSponsorPageComponent>
      <Modal
        title="Thêm người ủng hộ"
        visible={openAddSponsor}
        footer={[
          <Button form="addSponsorForm" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
        onCancel={handleAddSponsorCancel}
      >
        <Form
          onFinish={onAddSponsorFinish}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          id="addSponsorForm"
          form={addSponsorForm}
        >
          <Form.Item
            label="Tên"
            name="first_name"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ"
            name="last_name"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập dữ liệu",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Thêm thông tin donate của ${getSponsorAddDonateInfo()}`}
        // ${JSON.parse(localStorage.getItem("sponsorAddDonateId")).first_name}
        visible={openAddDonate}
        onCancel={handleAddDonateCancel}
        footer={[
          <Button form="addDonateForm" key="submit" htmlType="submit">
            Submit
          </Button>
        ]}
      >
        <Form
          onFinish={onAddDonateFinish}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          id="addDonateForm"
          form={addDonateForm}
        >
          <Form.Item
            label="Số tài khoản"
            name="account_number"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã giao dịch"
            name="transaction_code"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số tiền"
            name="donations"
            rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
          >
            <Input suffix='VND'/>
          </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};

export default ManageSponsorPageTemplate;

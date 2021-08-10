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
} from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { ManageVolunteerPageComponent } from "./styled-components";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined, DatabaseFilled, EditOutlined } from "@ant-design/icons";

const ManageVolunteerPageTemplate = () => {
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // const [userEdit, setUserEdit] = useState();
  const [roleUserEdit, setRole] = useState("");
  const [idUserEdit, setId] = useState(-1);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    getListUser();
  }, [confirmLoading]);

  const getListUser = async () => {
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        data = Array.from(data.users);
        data.forEach((element) => {
          element.key = element.id;
        });
        // console.log(data);
        setUserList(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handle_editItem = (e: any, record: any) => {
    e.preventDefault();
    setRole(record.role);
    setId(record.id);
    setOpenModal(true);
  };
  const updateUser = async (id, role) => {
    try {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo.access_token)
      const settings = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access_token}`,
        },
        body: JSON.stringify({
          user_id: id,
          role: role,
        }),
      };
      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/role`,
        settings
      );
      if (fetchResponse.status == 200) {
        let data = await fetchResponse.json();
        getListUser();
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleOk = () => {
    setConfirmLoading(true);
    updateUser(idUserEdit, roleUserEdit);
    setOpenModal(false);
    setId(-1);
    setConfirmLoading(false);
  };
  const handle_changeRoleType = (value: any) => {
    setRole(value);
    console.log(value);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  const handleDetailItem = (e: any, record: any) => {
    e.preventDefault();
    userList.forEach((ele) => {
      if (ele.id === record.id && ele.role === "volunteer") {
        localStorage.setItem(
          "detailVolunteerId",
          JSON.stringify({ id: record.id, name: record.username })
        );
        router.push("/detail-volunteer");
        return;
      }
    });
  };
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      render: (value: string, record: any) => {
        if (record.role === "volunteer") {
          return (
            <Button
              type="primary"
              style={{ width: "150px" }}
              onClick={(e) => handleDetailItem(e, record)}
            >
              {value}
            </Button>
          );
        }
        return (
          <p
            style={{
              textAlign: "center",
              width: "150px",
              display: "inline-block",
            }}
          >
            {value}
          </p>
        );
      },
      width: "20%",
      key: "username",
    },

    {
      title: "Tên",
      dataIndex: "first_name",
      sorter: true,
      render: (text) => <span>{text}</span>,
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
      width: "20%",
      key: "email",
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",

      render: (role) => {
        let color = role === "admin" ? "geekblue" : "green";
        if (role === "guest") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: "VOLUNTEER",
          value: "volunteer",
        },
        {
          text: "GUEST",
          value: "guest",
        },
        {
          text: "ADMIN",
          value: "admin",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },

    {
      title: "Sửa vị trí",
      key: "action",
      render: (value: string, record: any) => {
        if (record.role === "admin") {
          return (
            <Space size="middle">
              <CloseCircleOutlined style={{color:'#d4380d', borderColor: '#ffbb96'}}/>
            </Space>
          );
        }
        return (
          <Space size="middle">
            <a
              href="#!"
              title="Edit user"
              onClick={(e) => handle_editItem(e, record)}
            >
              <EditOutlined style={{color:'#1890ff'}}/>
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <ManageVolunteerPageComponent className="home-page-container">
        <Row style={{ marginTop: "100px" }} justify="center">
          <h1>Danh sách người dùng</h1>
        </Row>
        <Table
          columns={columns}
          dataSource={userList}
          rowKey="orderId"
          pagination={false}
          scroll={{ x: 768 }}
        />
      </ManageVolunteerPageComponent>
      <Modal
        title="Sửa đổi thông tin người dùng"
        visible={openModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={12}>
            <Select
              onChange={handle_changeRoleType}
              className="select-status"
              value={roleUserEdit}
            >
              <Select.Option value="volunteer">Volunteer</Select.Option>
              <Select.Option value="guest">Guest</Select.Option>
            </Select>
          </Col>
        </Row>
      </Modal>
      <Footer />
    </>
  );
};

export default ManageVolunteerPageTemplate;

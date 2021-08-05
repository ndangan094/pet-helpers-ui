import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Carousel, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Icon from "@ant-design/icons";
import CatPng from "../../../public/pawprint.png";
import { useState } from "react";
import { useEffect } from "react";
import { VolunteerPageComponent } from "./styled-conponents";

const VolunteerPageTemplate = () => {
  const CatIcon = () => <img src={CatPng} />;
  const router = useRouter();

  return (
    <>
      <Header />
      <VolunteerPageComponent className="home-page-container">
        <Row className="volunteer-page-header">
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="volunteer-heading-container"
          >
            <h1>Tình nguyện viên</h1>
            <div className="breadcrumb">
              <span
                className="breadcrumb-item"
                onClick={() => {
                  router.push("/");
                }}
              >
                Trang chủ
              </span>

              <span className="breadcrumb-active"> / Tình nguyện viên</span>
            </div>
          </div>
        </Row>
        <Row
          style={{ backgroundColor: "white" }}
          className="volunteer-page-content"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <Col span={5}></Col>
          <Col span={14}>
            <Row>
              <Col className="process" span={16}>
                <h3>Giới Thiệu Tình Nguyện Viên Cứu Hộ Chó Mèo</h3>
                <hr />
                <p>
                  Hoạt động cứu hộ của Hanoi Pet Adoption chỉ có thể thành công
                  nhờ sự chung sức từ cộng đồng và các Tình nguyện viên. Có
                  nhiều cách để bạn đóng góp phần của mình để thay đổi cuộc sống
                  của một chú chó hay mèo: trở thành Người chăm sóc tạm thời
                  (Foster), Tình nguyện tại nhà chung hay Tình nguyện viên cứu
                  hộ. Hãy tham khảo thêm thông tin bên dưới.
                </p>
              </Col>
              <Col span={6}>
                <div className="condition">
                  <img
                    width="100%"
                    src="https://hanoipetadoption.com/admin/user-content/5d4d003a-2692-4ba4-aa87-34721ef49644.jpg"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={5}></Col>
        </Row>
        <Row justify="center">
          <Col span={12} data-aos='fade-up-right' data-aos-duration="1500" className="regis-container">
            <Row>
              <Col span={16}>
                <h4>bạn muốn tham gia</h4>
                <p>
                  Tham gia tình nguyện cho Hanoi Pet Adoption, bạn đang góp phần
                  thay đổi số phận của những bé chó mèo bị bỏ rơi hay bạo hành.
                  Bên cạnh đó, bạn còn có cơ hội tìm hiểu thêm...
                </p>
                <Row justify='center'><Button type='primary' onClick={() => {
                  window.open('https://forms.gle/5NbiAwWHTaJypLbHA')
                }}>tham gia ngay</Button></Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </VolunteerPageComponent>
      <Footer />
    </>
  );
};

export default VolunteerPageTemplate;

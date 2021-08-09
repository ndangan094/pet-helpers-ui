import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Carousel, Button } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { DonatePageComponent } from "./styled-conponents";
import { BankOutlined } from "@ant-design/icons";

const DonatePageTemplate = () => {
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

  return (
    <>
      <Header />
      <DonatePageComponent className="home-page-container">
        <Row className="adobt-page-header">
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="adobt-heading-container"
          >
            <h1>Ủng hộ</h1>
            <div className="breadcrumb">
              <span
                className="breadcrumb-item"
                onClick={() => {
                  router.push("/");
                }}
              >
                Trang chủ
              </span>

              <span className="breadcrumb-active"> / Ủng Hộ</span>
            </div>
          </div>
        </Row>
        <Row
          style={{ backgroundColor: "white" }}
          className="adobt-page-content"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <Col span={5}></Col>
          <Col span={14}>
          <Row justify="space-between">
              <Col className="process" span={15}>
                <h3>Tôi muốn ủng hộ</h3>
                <hr />
                <p>
                Mọi hoạt động cứu hộ của Pet Rescure hoàn toàn dựa trên các
                  khoản quyên góp từ cộng đồng. Chi phí trung bình hàng tháng
                  của nhóm rơi vào khoảng 70 triệu đồng, bao gồm tiền thuê nhà,
                  tiền viện phí, thức ăn, điện, nước, thuốc men và đồ dùng, bỉm
                  tã, lương hỗ trợ các bạn tnv dọn dẹp... Nhóm rất cần sự giúp
                  đỡ của các bạn để có thể duy trì nhà chung cũng như đội cứu
                  hộ. Chỉ cần cố định 50k - 100k hàng tháng là các bạn đã giúp
                  đỡ được cho nhóm và cách bé rất nhiều! Chi phí sẽ được chia
                  đều cho các bé khác còn nằm viện và gây dựng nhà chung. Ngoài
                  ra Nhóm cũng tiếp nhận quyên góp bằng hiện vật như quần áo cũ
                  (để lót chuồng), bỉm, găng tay y tế, thức ăn, cát vệ sinh
                  v.v...
                </p>
              </Col>
              <Col span={6}>
                <div className="condition">
                  <img
                    width="100%"
                    src="https://hanoipetadoption.com/admin/user-content/256b940f-9028-443d-8fcf-f39f5f1618af.jpg"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={5}></Col>
        </Row>
        <Row justify="center">
          <Col
            span={12}
            data-aos="fade-up-right"
            data-aos-duration="1500"
            className="regis-container"
          >
            <Row>
              <Col span={16}>
                <h4 style={{textAlign:'left'}}>ủng hộ ngay</h4>
                <p style={{textAlign:'left'}}>
                  <BankOutlined style={{ color: "#d61c62" }} /> MB Bank - Kiều
                  Thế Vinh - 8050101239999
                  <br />
                </p>
                <p style={{textAlign:'left'}}>
                  <BankOutlined style={{ color: "#d61c62" }} /> BIDV    - Kiều Thế
                  Vinh - 1234567899999
                  <br />
                </p>
                <p style={{textAlign:'left'}}>
                  <BankOutlined style={{ color: "#d61c62" }} /> MB Bank - Kiều
                  Thế Vinh - 8050101239999
                  <br />
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </DonatePageComponent>
      <Footer />
    </>
  );
};

export default DonatePageTemplate;

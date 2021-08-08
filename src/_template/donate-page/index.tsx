import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Carousel, Button } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { DonatePageComponent } from "./styled-conponents";

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
      </DonatePageComponent>
      <Footer />
    </>
  );
};

export default DonatePageTemplate;

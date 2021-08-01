import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import { Row, Col, Carousel, Button } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { VolunteerPageComponent } from "./styled-conponents";

const VolunteerPageTemplate = () => {
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
      <VolunteerPageComponent className="home-page-container">
        <Carousel className="carousel" autoplay={true}>
          <div>
            <div className="header">
              <h1>Let's share the hope</h1>
              <p>Cùng Mẫn Tiên và Persona gây quỹ ủng hộ cho các bé !</p>
              <Button
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/106942221167144/posts/338774701317227/"
                  );
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/f789411b-1b6d-4846-a2f4-8bb41ec3eab2.png" />
          </div>
          <div>
            <div className="header">
              <h1>THEO DÕI CHÚNG MÌNH TRÊN YOUTUBE</h1>
              <p>Hãy đăng ký và ủng hộ kênh của chúng mình nha!</p>
              <Button
                onClick={() => {
                  window.open(
                    "https://www.youtube.com/channel/UCdLb536ht3xSJ6YJ-LF8r3g"
                  );
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/326bea82-ba50-4777-abb6-5e45ba8f3faf.jpeg" />
          </div>
          <div>
            <div className="header">
              <h1>we love pets</h1>
              <p>
                Mỗi thú cưng đều cần có cơ hội hi vọng vào một tương lai tốt đẹp
              </p>
              <Button
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/hanoipetadoption/posts/1862971080512052"
                  );
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/a4cdde6d-2f14-417f-8170-bf1704688c25.jpg" />
          </div>
          <div>
            <div className="header">
              <h1>ĐĂNG KÝ LÀM TNV VỚI CHÚNG MÌNH NHÉ!</h1>
              <p>Xin hãy chia sẻ giảm bớt một phần gánh nặng cho nhóm!</p>
              <Button
                onClick={() => {
                  router.push("/volunteer");
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/fdde3828-0766-4d7b-bd8d-115912ed849f.jpeg" />
          </div>
          <div>
            <div className="header">
              <h1>CÁCH ỦNG HỘ GIÚP ĐỠ NHÓM</h1>
              <p>
                Cùng tìm hiểu các hình thức để ủng hộ cho hoạt động của Hanoi
                Pet Adoption!
              </p>
              <Button
                onClick={() => {
                  router.push("/donation");
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/d2d09f6a-19cc-41a9-922a-23aeb493bcbf.jpeg" />
          </div>
          <div>
            <div className="header">
              <h1>HÃY NHẬN NUÔI, ĐỪNG XUA ĐUỔI!</h1>
              <p>
                Loài vật cũng có tri giác và cảm xúc, chúng cũng biết đau, biết
                sợ hãi, biết yêu thương và muốn được yêu thương.
              </p>
              <Button
                onClick={() => {
                  router.push("/adoption");
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/b39e6553-5b33-4fd7-b10a-99ff21bfd5a7.jpg" />
          </div>
          <div>
            <div className="header">
              <h1>CÙNG THAM GIA GROUP YÊU CÚN CỎ NHA!</h1>
              <p>
                Các bạn ơi! cùng tham gia group YÊU CÚN CỎ với chúng mình nha !
              </p>
              <Button
                onClick={() => {
                  window.open("https://www.facebook.com/groups/yeucunco/");
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/5d835eb4-6721-4558-8cb9-f6684a4cd6c0.jpg" />
          </div>
          <div>
            <div className="header">
              <h1>GHÉ THỊ TRẤN MÈO CHƠI NHÉ CÁC BẠN!</h1>
              <p>
                Group của nhóm nhằm chia sẻ kinh nghiệm nuôi và cứu hộ thú cưng.
              </p>
              <Button
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/groups/thitranmeohanoipetadoption"
                  );
                }}
              >
                Xem thêm
              </Button>
            </div>
            <img src="https://hanoipetadoption.com/admin/user-content/Carousel/db696201-c204-49cc-9372-eef3d21c897a.jpg" />
          </div>
        </Carousel>
        <div data-aos="fade-right" data-aos-duration="1000" data-aos-easing="ease-in-sine">
        <Row className="about-us">
          <Col span={18}>
            
              <h1>Nhận Nuôi Thú Cưng - Pet Rescure</h1>
              <p>
                Chúng tôi là một nhóm trẻ gồm tình nguyện viên Việt Nam và một
                số bạn nước ngoài, cùng hoạt động vì tình yêu chó mèo. Tôn chỉ
                hoạt động của chúng tôi là không từ bỏ nỗ lực với bất kỳ con vật
                nào, dù bé có ốm yếu hay tàn tật tới đâu, bởi mỗi thú cưng đều
                cần có cơ hội hi vọng vào một tương lai tốt đẹp. Chúng tôi cố
                gắng chăm sóc tốt nhất có thể, phần nào bù đắp lại những tổn
                thương cho các bé được cứu hộ về dù là hoang, lạc, bị bỏ rơi hay
                bạo hành. Ngoài ra, chúng tôi cũng luôn nỗ lực tìm mái ấm yêu
                thương các bé trọn đời. Và cuối cùng, chúng tôi giúp nâng cao
                nhận thức về trách nhiệm của chủ nuôi thông qua mạng xã hội và
                các hoạt động thiện nguyện.
              </p>
          </Col>
          
          <Col span={6}>
            <img src="https://hanoipetadoption.com/admin/user-content/ca35ac07-24b7-4e83-bddd-866a6a450365.jpg" />
          </Col>
        </Row>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">
        <Row justify="space-around" className="services">
          
            <Col span={7} className="service">
              <div className="content">
                <img src="https://hanoipetadoption.com/admin/user-content/03fc601a-a150-4d55-b051-15d6d3ced88e.jpg" />
                <h3>ủng hộ</h3>
                <p>
                  Giúp duy trì hoạt động của HPA qua hình thức quyên góp tiền
                  hoặc nhu yếu phẩm.
                </p>
              </div>
              <div className="text-center">
                <Button onClick={handleDonateClick}>tìm hiểu thêm</Button>
              </div>
            </Col>
            <Col span={7} className="service">
              <div className="content">
                <img src="https://hanoipetadoption.com/admin/user-content/28516d17-6278-4bd4-8eb7-0f3400d07969.jpg" />
                <h3>tình nguyện</h3>
                <p>
                  Hành động để thay đổi cuộc sống của chó, mèo và thú cưng khác.
                </p>
              </div>
              <div className="text-center">
                <Button onClick={handleVolunteerClick}>tìm hiểu thêm</Button>
              </div>
            </Col>
            <Col span={7} className="service">
              <div className="content">
                <img src="https://hanoipetadoption.com/admin/user-content/423cf220-b557-4644-a769-dd508226180d.jpg" />
                <h3>nhận nuôi</h3>
                <p>
                  Hãy nhận nuôi, cưu mang, đừng xua đuổi và yêu thương loài động
                  vật bị bỏ rơi.
                </p>
              </div>
              <div className="text-center">
                <Button onClick={handleAdobtClick}>tìm hiểu thêm</Button>
              </div>
            </Col>
       
        </Row>
        </div>
      </VolunteerPageComponent>
      <Footer />
    </>
  );
};

export default VolunteerPageTemplate;

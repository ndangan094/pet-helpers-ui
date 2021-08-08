import styled from "styled-components";

const AdobtDetailComponent = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

const HeadPet = styled.div`
  background-image: url(https://hanoipetadoption.com/Images/jumbotron.jpg);
  height: 212px;
  width: 100%;
  object-fit: cover;
  background-position: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;

const RowDetail = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 30px;
`;

const InfoPet = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 0 20px;
`;




export {AdobtDetailComponent,HeadPet,RowDetail,InfoPet};
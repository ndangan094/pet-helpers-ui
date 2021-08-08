import styled from "styled-components";



const DashBoardContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  //height: 100vh;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  //padding-bottom: 200px;
`;


const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 150px 100px 0 100px;
`;

const ActionButton = styled.div`
  //width: 100px;
  background-color: ${props => props.color ?props.color:"mediumpurple"};
  padding: 5px 10px 5px 10px;
  border: 1px solid ${props => props.color ?props.color:"mediumpurple"};
  border-radius: 20px;
  margin-right: 10px;
  color: whitesmoke;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const ActionContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListPetContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-top:100px;
`;

const Left = styled.div`
  //min-width: 150px;
  width: 45%;
  text-align: right;
  padding-right: 10px;
  font-size: 16px;
`;

const Right = styled.input`
  height: 40px;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 600;
  padding-left: 10px;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
  }
`;

const PetList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const BoxPet = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 50%;
  min-width: 500px;
  height: 130px;
  background-color: #f6f6f6;
  border-radius: 10px;
  margin: 10px 0 10px 0;
  background-image: url(https://hanoipetadoption.com/Images/patterns/pattern2.png);
  justify-content: space-between;

`;

export {DashBoardContainer, ActionRow, ActionButton, ActionContainer,Left,Right,ListPetContainer,PetList,BoxPet }
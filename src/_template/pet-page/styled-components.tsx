import styled from "styled-components";



const DashBoardContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  //height: 100vh;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  padding-bottom: 200px;
`;


const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 150px 100px 0 100px;
`;

const ActionButton = styled.div`
  background-color: mediumpurple;
  padding: 5px 10px 5px 10px;
  border: 1px solid mediumpurple;
  border-radius: 20px;
  margin-right: 10px;
  color: whitesmoke;

  &:hover {
    cursor: pointer;
  }
`;

const ActionContainer = styled.div`
  width: 50%;
  //height: 70%;
  background-color: white;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  //min-width: 150px;
  width: 40%;
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

export {DashBoardContainer, ActionRow, ActionButton, ActionContainer,Left,Right }
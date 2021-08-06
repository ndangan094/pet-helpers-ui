import styled from "styled-components";



const DashBoardContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background-color: white;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PetTag = styled.button`
  font-size: 1.3125rem;
  color: white;
  height: 55px;
  width: 300px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 40px;
  background-color: #fc0;
  margin: 0 10px 0 10px;
  transition: 0.3s;
  &:hover{
    background-color: #018ae0;
    cursor: pointer;
  }
`;


export {DashBoardContainer, ActionRow, ActionButton, ActionContainer,PetTag}
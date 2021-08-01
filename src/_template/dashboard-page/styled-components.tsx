import styled from "styled-components";



const DashBoardContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
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
  height: 70%;
  background-color: white;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImagePreview = styled.div`
  //margin-left: 20px;
`;

export {DashBoardContainer, ActionRow, ActionButton, ActionContainer,ImagePreview}
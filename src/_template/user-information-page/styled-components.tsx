import styled from "styled-components";



const InfoRoot = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 50%;
  height: 70%;
  background-color: white;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 10px 0px;
`;

const Left = styled.div`
  min-width: 130px;
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
  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  background-color: dodgerblue;
  font-size: 16px;
  border: 2px solid dodgerblue;
  border-radius: 25px;
  padding: 8px 25px 8px 25px;
  &:hover{
    cursor: pointer;
  }
`;

export {InfoContainer,InfoRoot,RowLine,Left,Right,Text,SubmitButton}
import styled from "styled-components";

const HeaderComponent = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  position: fixed;
  background: linear-gradient(to right,  #8e2de2, #4a00e0);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;

`;

const Text = styled.div`
  font-size: 20px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  left: 42%;
`;

const CategoryButton = styled.div`
  padding: 0 10px 0 10px;
  font-size: 16px;
  &:hover{
    color: dodgerblue;
    cursor: pointer;
  }
`;

const Action = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  right: 0;
  margin-right: 20px;
`;

const ActionButton = styled.div`
  border: 2px solid white;
  border-radius: 25px;
  padding: 5px 10px 5px 10px;
  margin: 0 5px 0 5px;
  &:hover{
    border: 2px solid dodgerblue;
    background-color: dodgerblue;
    cursor: pointer;
  }
`



export {
    HeaderComponent,
    Logo,
    Category,
    Action,
    Text,
    CategoryButton,
    ActionButton
};
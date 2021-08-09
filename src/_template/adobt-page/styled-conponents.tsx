import styled from "styled-components";
import {DEFAULT_DEVICE} from "../../constants";

const AdobtPageComponent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-bottom: 50px;
  background-color: white;
`;
const FindPetComponent = styled.div`
  width: 100%;
`;

const PetCategory = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const PetTag = styled.button`
  font-size: 1.3125rem;
  color: white;
  height: 55px;
  width: 150px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 40px;
  background-color: #018ae0;
  margin: 0 10px 0 10px;
  &:hover{
    background-color: #018ae0;
    cursor: pointer;
  }
`;

const ListPet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PetBox = styled.div`
  width:236px;
  margin: 20px ;
  background-image: url(https://hanoipetadoption.com/Images/patterns/pattern2.png);
  background-repeat: repeat;
  background-color: #f6f6f6;
  padding:10px;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
  }
`;


export {AdobtPageComponent, FindPetComponent, PetCategory, PetTag,ListPet,PetBox};
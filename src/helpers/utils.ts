import {useEffect, useState} from "react";
import { User } from "../models/user";

export const getUser = ()=>{
    const [user, setUser] = useState<User>(undefined);
    setUser(JSON.parse(localStorage.getItem('userInfo')))
    return user;
}
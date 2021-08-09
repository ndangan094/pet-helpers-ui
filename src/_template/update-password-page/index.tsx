import {useEffect, useState} from "react";
import {User} from "../../models/user";
import {
    InfoContainer,
    InfoRoot,
    Left,
    Right,
    RowLine,
    SubmitButton,
    Text
} from "../user-information-page/styled-components";
import Header from "../../_layout/header";
import Footer from "../../_layout/footer";
import axios from "axios";
import {useRouter} from "next/router";

const UpdatePasswordTemplate = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>(undefined);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(undefined);


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')));
    }, [])


    const check = () => {
        if (currentPassword === "") {
            setError("Vui lòng nhập mật khẩu hiện tại");
            return false;
        } else if (newPassword === "") {
            setError("Vui lòng nhập mật khẩu mới");
            return false;

        } else if (confirmPassword === "") {
            setError("Vui lòng nhập mật khẩu xác nhận");
            return false;

        } else if (currentPassword != user.password) {
            {
                setError("Mật khẩu hiện tại không đúng");
                return false;
            }
        } else if (newPassword != confirmPassword) {
            {
                setError("Mật khẩu xác nhận không đúng");
                return false;
            }
        } else {
            {
                setError("");
                return true;
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('userInfo');
        router.push("/");
    }

    const updatePassword = async () => {
        try {
            axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/password`, {
                    "current_password": user.password,
                    "update_password": newPassword
                }, {
                    headers: {
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
            ).then(res => {
                if (res.status == 200) {
                    alert("Cập nhật mật khẩu thành công");
                    logout();
                } else {
                    alert("Đã có lỗi xảy ra");
                }
            })
        } catch (e) {
            alert("Đã có lỗi xảy ra");
            return e;
        }
    }


    return (<>
        <Header/>
        <InfoRoot>
            <InfoContainer>
                <Text>
                    Cập nhật mật khẩu
                </Text>
                <div style={{height: "30px"}}/>
                <RowLine>
                    <Left>
                        Mật khẩu hiện tại:
                    </Left>
                    <Right type={"password"} onChange={(e) => {
                        setError("");
                        setCurrentPassword(e.target.value);

                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Mật khẩu mới:
                    </Left>
                    <Right type={"password"} onChange={(e) => {
                        setError("");
                        setNewPassword(e.target.value);
                    }}/>
                </RowLine>
                <RowLine>
                    <Left>
                        Mật khẩu xác nhận:
                    </Left>
                    <Right type={"password"} onChange={(e) => {
                        setError("");
                        setConfirmPassword(e.target.value);
                    }}/>
                </RowLine>
                <div style={{color: "red", fontSize: "16px"}}>{error}</div>
                <SubmitButton onClick={async () => {
                   let a = check();
                    if (a ) {
                        await updatePassword();
                    }
                }}>
                    Submit
                </SubmitButton>
            </InfoContainer>
        </InfoRoot>
        <Footer/>
    </>);
}

export default UpdatePasswordTemplate
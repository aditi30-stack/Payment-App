import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { Buttons } from "../Components/Buttons";
import { Warning } from "../Components/Warning";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

export function Signin() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handlethis = async() =>{
        try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username,
            password
        })
        const {token, email } = response.data;

        login(token, email);
        navigate("/dashboard")
        
    }catch(error) {
        console.log(error)
        if(error.response) {
            return res.status(400).json({message: error.response.data.message})
        }

    }
 

    }
    return (
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className="flex flex-col justify-center">
            <div className="bg-white h-180 p-20 m-20 rounded-lg">
            <Heading label={"Sign in"}></Heading>
            <InputBox type={"text"} label={"Email"} placeholder={"example@gmail.com"} onChange={(e)=>{
                setUserName(e.target.value)
            }}></InputBox>
            <InputBox type={"password"} label={"Password"} placeholder={"12345"} onChange={(e)=>{
                setPassword(e.target.value)
            }}></InputBox>
            <Buttons label={"Sign in"} onClick={handlethis}></Buttons>
            <Warning label={"Don't have an account?"} buttontext={"Sign up"} to={"/signup"} ></Warning>
            

            </div>

            </div>

        </div>
    )
}
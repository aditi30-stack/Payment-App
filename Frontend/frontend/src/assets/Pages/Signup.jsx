import { useState } from "react";
import { Buttons } from "../Components/Buttons";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { Warning } from "../Components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");


    async function handleSignin() {
        try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                });
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")

            }
            catch(error) {
                console.log(error)
                if(error.response) {
                    return res.status(400).json({message: error.response.data.message})
                }
                return res.status(500).json({message: "Internal Server Error"})
        
            }
                
    }

    return (
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className="flex flex-col justify-center">
            <div className="bg-white h-180 p-20 m-20 rounded-lg">
            {/* Heading */}
            <Heading label={"Sign up"}></Heading>
            <SubHeading label={"Enter your information to create an account"}></SubHeading>
            <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>{
                setFirstName(e.target.value)
            }}></InputBox>
            <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e)=>{
                setLastName(e.target.value)
            }}></InputBox>
            <InputBox label={"Email"} placeholder={"example@gmail.com"} onChange={(e)=>{
                setUserName(e.target.value)
            }}></InputBox>
            <InputBox label={"Password"} placeholder={"12345"} onChange={(e)=>{
                setPassword(e.target.value)
            }}></InputBox>
            <Buttons label={"Sign up"} onClick={handleSignin}></Buttons>
            <Warning label={"Already have an account?"} buttontext={"Sign in"} to={"/"} ></Warning>
            

            </div>

            </div>

        </div>
    )
}
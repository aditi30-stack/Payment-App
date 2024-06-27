import { useEffect, useState } from "react";
import { Heading } from "../Components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function Send() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const [money, setMoney] = useState('');
    const [warning, setWarning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [transferSuccess, setTransferSuccess] = useState(false);

    const handleChange = async() =>{
        setWarning(false);
        if (!money ||  money <=0) {
            setWarning(true)
        }
        else {
            try{
            setLoading(true)
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to:id,
                amount:parseInt(money)
            }, {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            setMoney('')
            setError('')
            setTransferSuccess(true)

            setTimeout(()=>{
                setTransferSuccess(false)
            }, 2000)
           

        
    }
    catch(error) {
        setWarning(true)
        setLoading(false)
        if(error.response) {
            setError(error.response.data.message) || "An error occurred"
        }
        else if(error.request) {
            setError('No response received from the server')
        }
        else {
            setError("An error occurred. Please try again later")
        }
    } finally {
        setLoading(false)
    }
    }
    
        
    }



    return (
        <div className="h-screen flex justify-center items-center bg-gray-400">
            <div className="py-10 px-10 rounded-lg shadow-xl space-y-2 bg-white">
                <div className="text-center p-4">
                <Heading label={"Send Money"}></Heading>
                </div>
               <div className="flex space-x-2 p-4">
                <div className="rounded-full bg-green-500 relative p-7">
                    <div className="absolute top-1.5 left-5 font-semibold text-white text-3xl">{name[0]}</div>

                </div>
                <div className="font-bold text-2xl mt-1">
                    {name}
                </div>

               </div>
               <div className="ml-4 font-semibold">
                Amount (in Rs.)
                </div>
               <input type="number" placeholder="Enter amount" value={money} className={`w-full p-2 rounded-md outline-none border-2 ml-4
               ${warning? `border-red-500`: `border:green-500`}`}
                onChange={(e)=>{
                    setMoney(e.target.value)
                }}
               ></input>
               {warning && <div className="text-red-500 ml-4">{error}</div>}
               
               <div>
               <button className="w-full bg-green-500 p-2 rounded-md text-white text-center ml-4 mt-4 hover:bg-white hover:text-black hover:border-2 hover:border-black" 
               onClick={handleChange} disabled={loading}> 
               initiate Transfer
               </button>
               {loading && <div>Transferring...</div>}
               {transferSuccess && <div className="text-green-500 ml-4">Transfer Successful</div>}
               
               </div>

            </div>
        </div>
    )
}
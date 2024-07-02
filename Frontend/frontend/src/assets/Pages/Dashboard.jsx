import { useState } from "react";

import { GetUsers } from "../Components/User";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../Components/AuthContext";
import { AvatarDropdown } from "../Components/Logout";

export function Dashboard() {
    const {getUser} = useAuth();


    return (
        <div className="h-screen">
            <div className="flex justify-around p-4 shadow-md mt-4">
                <div className="font-bold text-2xl">
                    Payments App
                </div>
                <div className="flex h-4 justify-center items-center text-xl font-semibold mt-4 relative">
                    Hello User
                    <div className="ml-1.5 mb-[-1]">
                    
                    <AvatarDropdown/>
                    </div>

                </div>
            </div>
            <GetUsers />
        </div>
    );
}

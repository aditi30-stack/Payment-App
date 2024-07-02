import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function GetUsers() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const { isLoggedIn, isLoading, setIsLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            const timeout = setTimeout(() => {
                axios
                    .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        setUsers(response.data.user);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.log('Error fetching data:', error);
                        setIsLoading(false);
                    });
            }, 1000);

            return () => {
                clearTimeout(timeout);
            };
        };

        if (isLoggedIn) {
            setIsLoading(false);
            fetchUsers();
        }
    }, [filter, isLoggedIn]);

    return (
        <div>
            <div className="flex flex-col space-y-4 h-screen ml-12 p-4 mt-4">
                <div className="font-bold text-xl">Users</div>
                <input
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    type="text"
                    className="w-full p-2 border-2 border-blue-500 opacity-100 outline-none mr-4 rounded-lg"
                ></input>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    users.map((user, index) => <ListUsers key={index} user={user}></ListUsers>)
                )}
            </div>
        </div>
    );
}

function ListUsers({ user }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="border-2 rounded-full p-5 font-semibold bg-gray-200 items-center justify-center border-white font-lg relative ml-2">
                        <div className="absolute top-2 left-2.5">{user.firstName[0]}</div>
                    </div>
                    <div className="flex justify-center space-x-2 text-lg ml-2 mt-2">
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="rounded-lg py-2 px-4 bg-black text-white"
                        onClick={() => {
                            if (isLoggedIn) {
                                navigate(`/Send?id=${user._id}&name=${user.firstName}`);
                            } else {
                                navigate('/signin');
                            }
                        }}
                    >
                        Send Money
                    </button>
                </div>
            </div>
        </div>
    );
}

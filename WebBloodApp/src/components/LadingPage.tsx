
import { useState } from 'react';
import loginSideImg from '../assets/side-image.jpg'
import LoginPage from './Auth/LoginPage';
import RegistrationPage from './Auth/RegisterPage';
import {FaArrowLeftLong} from "react-icons/fa6";
const LandingPage = () => {
    return ( 
        <>
            <div className='min-h-screen w-full bg-red-900 flex items-center justify-center'>
            <div className='w-3/4 grid grid-cols-2 shadow-lg'>
                <div className='rounded-lg '>
                    <img src={loginSideImg} />
                </div>
                <LandingMenu/>
            </div>
        </div>

        </>
     );
}
const LandingMenu = () =>{
    const [selectedMenu,setSelectedMenu] = useState("home");
    return (
        <>
            <div className='flex flex-col bg-white w-full'>
                {selectedMenu != "home" 
                    ?
                        <div className='w-full p-2'>
                            <button className='p-2 text-2xl border-1 border-gray-400 rounded hover:bg-gray-100' onClick={()=>setSelectedMenu('home')}><FaArrowLeftLong /></button>
                        </div>
                    :"" 
                }
                <div className='flex flex-col items-center space-y-2 bg-white w-full h-full'>
                {
                    selectedMenu == "home" ?
                            <div className="flex justify-center items-center space-y-2 w-full h-full">
                                <div className='flex flex-col items-center justify-center w-3/4 space-y-4'>
                                    <button className='w-3/4 bg-green-500 text-white p-2 text-xl' onClick={()=>setSelectedMenu("login")}>Login</button>
                                    <button className='w-3/4 bg-blue-500 text-white p-2 text-xl' onClick={()=>setSelectedMenu("register")}>Register</button>
                                </div>
                            </div>
                           
                       
                    : selectedMenu == "login" ? 
                        <LoginPage/>
                    :selectedMenu =="register" ?
                        <RegistrationPage/>
                    :""
                }
                </div>
               
            </div>
        </>
    )
}
 
export default LandingPage;
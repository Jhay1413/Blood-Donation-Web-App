import { FaArrowRightToBracket } from 'react-icons/fa6';
import { IoMdApps,IoIosList} from 'react-icons/io';
import { getDocData } from '../context/DocDataContext';


interface HeaderPageProps{
    
    onClick : ()=> void;
}
const DoctorHeaderPage = ({onClick}:HeaderPageProps) => {
 
    const contextValue = getDocData();
    const logout = () =>{
        localStorage.removeItem('token')
        contextValue?.handleSetIsLoading()
        window.location.reload();
    }

    return ( 
        <>
            <div className="w-full flex text-2xl flex flex-row justify-between">
                <div className="w-full flex justify-start items-center w-full text-gray-700 text-2xl">
                    <div className="px-2 py-2 lg:hidden">
                        <button className='flex items-center ' onClick={onClick} >
                            <IoIosList/>
                        </button>
                        
                    </div>
                 
                </div>
                <div className="w-full flex flex-row justify-end items-center space-x-4">
           
                <IoMdApps/>
                <button onClick={logout}><FaArrowRightToBracket/></button>

                </div>
          
          
           </div>
        </>
     );
}
 
export default DoctorHeaderPage;
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { IoMdSearch,IoMdApps,IoIosList} from 'react-icons/io';

interface HeaderPageProps{
    
    onClick : ()=> void;
}
const AdminHeaderPage = ({onClick}:HeaderPageProps) => {
 
   
    const logout = () =>{
        localStorage.removeItem('token')
       
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
                    <div className="py-2 px-2">
                        <IoMdSearch/>
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
 
export default AdminHeaderPage;
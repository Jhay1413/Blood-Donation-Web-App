import { FaChild ,FaWpforms} from "react-icons/fa6";
const CenterDashboardPage = () => {
    return ( 
        <div className="w-full grid grid-cols-4  gap-4 h-40 text-gray-400 ">
            <div className="flex bg-white shadow-md rounded-md flex-col ">
               <div className="w-full p-4 flex justify-between items-center">
                    <div className="text-lg">
                        <h1>Patient</h1>
                    </div>
                    <div className="text-2xl p-2 bg-green-300 rounded-xl text-white">
                        <FaChild/>
                    </div>
               </div>
               <div className="items-center justify-center flex text-4xl">
                    <h1>406</h1>
               </div>
            </div>
            <div className="flex bg-white shadow-md rounded-md flex-col ">
               <div className="w-full p-4 flex justify-between items-center">
                    <div className="text-lg">
                        <h1>Request</h1>
                    </div>
                    <div className="text-2xl p-2 bg-blue-300 rounded-xl text-white">
                        <FaWpforms/>
                    </div>
               </div>
               <div className="items-center justify-center flex text-4xl">
                    <h1>406</h1>
               </div>
            </div>
            <div className="flex items-center justify-center bg-white shadow-md rounded-md">
                Transactions
            </div>
            <div className="flex items-center justify-center bg-white shadow-md rounded-md">
                Transactions
            </div>
          
        </div>
     );
}
 
export default CenterDashboardPage;
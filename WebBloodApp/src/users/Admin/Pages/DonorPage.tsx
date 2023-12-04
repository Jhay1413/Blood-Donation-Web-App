import { Input, Table } from "antd";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { DonorInfoArray} from "../../../components/Interface/Interface";
import DonorInfoModal from "../Modal/DonorInfoModal";

const DonorPage = () => {

    const [isModalOpen,setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const donorInfos = queryClient.getQueryData<DonorInfoArray>(['donorInfo']);
    console.log(donorInfos);
    const [searchedData,setSearchData] = useState("");
    const onCloseAdd = () =>{
        setIsModalOpen(false);
    }
    const columns =[
        {
            title: 'Donor ID',
            dataIndex: '_id',
            key: '_id',
            filteredValue: [searchedData],
            onFilter:(value:any,record:any)=>{
              return (
                String(record.firstName)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.lastName)
                .toLowerCase()
                .includes(value.toLowerCase()))
            }
            
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Blood Type',
            dataIndex: 'bloodType',
            key: 'bloodType',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'DOB',
            key: 'DOB',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },

    ] 
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                        <div className="w-full ">
                            <h1 className="text-xl">List of Request</h1>
                        </div>
                        <div className="w-full justify-center items-center flex">
                        <Input.Search 
                          placeholder='searchbox'
                          onChange={(e)=>{
                            setSearchData(e.target.value.toLowerCase());
                          }}
                          className='md:w-52 p-2'
                        />
                      </div>
                        <div className="w-full flex justify-end">
                            <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick={()=>setIsModalOpen(true)}>Add Donor</button>
                        </div>
                    </div>
                    <div className="w-full">
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={donorInfos?.map((request) =>({...request,key:request._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
            <DonorInfoModal isModalOpen={isModalOpen}  cancelModal={onCloseAdd}/>
        </>
     );
}
 
export default DonorPage;
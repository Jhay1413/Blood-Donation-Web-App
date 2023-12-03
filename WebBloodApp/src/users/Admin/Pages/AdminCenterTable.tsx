import { Button, Input, Space, Table } from "antd";
import HealthCenterModal from "../Modal/AddHealthCenter";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HealthCenterInfo, healthCenterInfoArray } from "../../../components/Interface/Interface";
import StocksModal from "../Modal/StocksModal";


const AdminCenterPage = () => {
  const queryClient = useQueryClient();
  const healthCenterData = queryClient.getQueryData<healthCenterInfoArray>(['healthCenterInfo']);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalStockOpen,setIsModalStockOpen] = useState(false);
  const [selectedData,setSelectedData] = useState<HealthCenterInfo>()
  const [searchedData,setSearchData] = useState("");

  const cancelModal = () =>{
    setIsModalOpen(!isModalOpen)
  }
  const cancelStockModal = () =>{
    setIsModalStockOpen(!isModalStockOpen)
  }
   
    //TABLE COLUMNS
      const columns = [
        {
          title: 'Blood Center ID',
          dataIndex: '_id',
          key: '_id',
          filteredValue: [searchedData],
      onFilter:(value:any,record:any)=>{
        return (
          String(record.name)
          .toLowerCase()
          .includes(value.toLowerCase()))
      }
      

        },
        {
          title: ' Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Contact Number',
          dataIndex: 'contact',
          key: 'contact',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title : 'Actions',
          dataIndex : 'actions',
          key:'actions',
          render: (text:string,record:HealthCenterInfo)=>(
            <Space size="middle">
              <Button onClick={()=>handleSelectData(record)}>View Stocks</Button>
              <Button type="primary" danger  disabled>Delete</Button>
            </Space>
    
          )
        }
      ];
      const handleSelectData = (record:HealthCenterInfo) =>{
        setSelectedData(record)
        setIsModalStockOpen(!isModalStockOpen)
      }

    
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Blood Center</h1>
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
                        <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick = {cancelModal}>Add New</button>
                      </div>
                    
                    </div>
                  
                  
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={ healthCenterData?.map((healthCenter)=>({...healthCenter,key:healthCenter?._id}))} className="w-full overflow-scroll "/>
                </div>
            </div>
            <HealthCenterModal isModalOpen={isModalOpen} onClose={cancelModal}/>
            <StocksModal isModalOpen={isModalStockOpen} onClose={cancelStockModal} data ={selectedData} />
        </>
     );
}
 
export default AdminCenterPage;
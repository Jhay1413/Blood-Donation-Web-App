import { Table } from "antd";
import { useState } from "react";
import RegisterCenterModal from "../Modal/AddNewCenterAccount";
import { useQueryClient } from "@tanstack/react-query";
import { HealthCenterAccountArray, HealthCenterInfo, healthCenterInfoArray } from "../../../components/Interface/Interface";


const AdminAccountPage = () => {
    const queryClient = useQueryClient();
    const healthCenterData = queryClient.getQueryData<healthCenterInfoArray>(['healthCenterInfo']);
    const healthCenterAccount = queryClient.getQueryData<HealthCenterAccountArray>(['healthCenterAccount']);
    const [tableValue,setTableValue] = useState<String>("PatientTable")
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    //TABLE COLUMNS
      const healthCenterColumns = [
        {
          title: 'Account ID',
          dataIndex: '_id',
          key: '_id',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
        },

        {
          title: 'Blood Center Name',
          dataIndex: 'userId',
          key: 'userId.name',
          render: ((healthcenter:HealthCenterInfo) =>healthcenter?.name)
        },
       

      
      ];
      const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setTableValue(event.target.value)
      }
      const cancelModal = ()=>{
        setIsModalOpen(!isModalOpen)
      }

    
    return ( 
        <>
          <div className="pt-2 pb-7">
            <select className="p-2" onChange={handleSelectChange}>
           
              <option value="PatientTable">Patient Accocunt</option>
              <option value="DoctorTable">Doctor Accocunt</option>
              <option value="CenterTable">Center Accocunt</option>
            </select>
          </div>
          {tableValue == "PatientTable" &&
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md"> 
            <div className="flex pb-4 flex-col space-y-4">
              <div className="w-full flex justify-between">
                <div className="w-full ">
                  <h1 className="text-xl">Patients Accounts</h1>
                </div>
                <div className="w-full flex justify-end">
                  <button className="p-2 bg-violet-500 text-sm rounded-sm text-white">Add New </button>
                </div>
              
              </div>
            
              <div className="w-full">

              </div>
            </div>
            <div className="flex w-full">
              <Table  columns={healthCenterColumns} className="w-full overflow-scroll"/>
            </div>
          </div>
          }
          {tableValue == "DoctorTable" &&
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md"> 
            <div className="flex pb-4 flex-col space-y-4">
              <div className="w-full flex justify-between">
                <div className="w-full ">
                  <h1 className="text-xl">Doctors Accounts</h1>
                </div>
                <div className="w-full flex justify-end">
                  <button className="p-2 bg-violet-500 text-sm rounded-sm text-white">Add New</button>
                </div>
              
              </div>
            
              <div className="w-full">

              </div>
            </div>
            <div className="flex w-full">
              <Table  columns={healthCenterColumns} className="w-full overflow-scroll"/>
            </div>
          </div>
          }
          {tableValue == "CenterTable" &&
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md"> 
            <div className="flex pb-4 flex-col space-y-4">
              <div className="w-full flex justify-between">
                <div className="w-full ">
                  <h1 className="text-xl">Blood Center Accounts</h1>
                </div>
                <div className="w-full flex justify-end">
                  <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick = {()=>setIsModalOpen(!isModalOpen)}>Add New</button>
                </div>
              
              </div>
            
              <div className="w-full">

              </div>
            </div>
            <div className="flex w-full">
              <Table  columns={healthCenterColumns} dataSource={ healthCenterAccount?.map((accocunt)=>({...accocunt,key:accocunt?._id}))} className="w-full overflow-scroll"/>
            </div>
            <RegisterCenterModal isModalOpen={isModalOpen} onClose={cancelModal} datalist = {healthCenterData}/>
          </div>
         
          }
          
        </>
     );
}
 
export default AdminAccountPage;
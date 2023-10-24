import { Table } from "antd";
import { useState } from "react";


const AdminAccountPage = () => {

    const [tableValue,setTableValue] = useState<String>("PatientTable")

   
    //TABLE COLUMNS
      const columns = [
        {
          title: 'Patient ID',
          dataIndex: '_id',
          key: '_id',
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
          title: 'Sex',
          dataIndex: 'sex',
          key: 'sex',
        },

        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Contact Number',
          dataIndex: 'contactNumber',
          key: 'contactNumber',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },



      ];
      const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setTableValue(event.target.value)
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
              <Table  columns={columns} className="w-full overflow-scroll"/>
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
              <Table  columns={columns} className="w-full overflow-scroll"/>
            </div>
          </div>
          }
          {tableValue == "CenterTable" &&
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md"> 
            <div className="flex pb-4 flex-col space-y-4">
              <div className="w-full flex justify-between">
                <div className="w-full ">
                  <h1 className="text-xl">Health Center Accounts</h1>
                </div>
                <div className="w-full flex justify-end">
                  <button className="p-2 bg-violet-500 text-sm rounded-sm text-white">Add New</button>
                </div>
              
              </div>
            
              <div className="w-full">

              </div>
            </div>
            <div className="flex w-full">
              <Table  columns={columns} className="w-full overflow-scroll"/>
            </div>
          </div>
          }
          
        </>
     );
}
 
export default AdminAccountPage;
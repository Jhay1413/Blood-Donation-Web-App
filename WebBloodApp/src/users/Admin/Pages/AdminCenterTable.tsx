import { Table } from "antd";


const AdminCenterPage = () => {


   
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


    
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Patients</h1>
                      </div>
                      <div className="w-full flex justify-end">
                        <button className="p-2 bg-violet-500 text-sm rounded-sm text-white">Add Patient</button>
                      </div>
                    
                    </div>
                  
                    <div className="w-full">
    
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} className="w-full overflow-scroll"/>
                </div>
            </div>
         
        </>
     );
}
 
export default AdminCenterPage;
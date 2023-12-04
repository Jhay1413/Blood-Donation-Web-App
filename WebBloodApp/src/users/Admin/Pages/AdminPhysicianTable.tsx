import { Button, Input, Space, Table } from "antd";
import { PhysicianInfo, physicianInfoArray } from "../../../components/Interface/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddPhysicianModal from "../Modal/AddphysicianInfoModal";
import { deletePhysician } from "../../../api/AdminAPI/AdminPhysicianRequest";
import EditPhysicianModal from "../Modal/EditPhysicianFormModal";


const AdminPhysicianPage = () => {
  const queryClient = useQueryClient();
  const physicianData = queryClient.getQueryData<physicianInfoArray>(['physicianInfo']);
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const [searchedData,setSearchData] = useState("");
  const [selectedData,setSelectedData]= useState<PhysicianInfo>({
    contactNumber: "",
    firstName: "",
    lastName: "",
    sex:"",
    assignedAt:"",
    _id: "",
});
  const [isEditModalOpen,setEditModalIsOpen] = useState(false);
    //TABLE COLUMNS
      const columns = [
        {
          title: 'Physician ID',
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
              .includes(value.toLowerCase()) ||
              String(record.status)
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
          title: 'Sex',
          dataIndex: 'sex',
          key: 'sex',
        },
        {
          title: 'Assigned At',
          dataIndex: 'assignedAt',
          key: 'assignedAt',
        },
        {
          title : 'Actions',
          dataIndex : 'actions',
          key:'actions',
          render: (text:string,record:PhysicianInfo)=>(
            <Space size="middle">
              <Button onClick={()=>editData(record)} key={text} >Edit</Button>
              <Button type="primary" onClick={()=> mutation.mutate(record._id)}danger>Delete</Button>
            </Space>
    
          )
        }



      ];
      const onCloseEditModal = () =>{
        setEditModalIsOpen(false);
      }
    
      const editData  = (record:PhysicianInfo) =>{
        setSelectedData(record);
        setEditModalIsOpen(true);
      }
      const onCloseModal = () =>{
        setIsModalOpen(false)
      } 
      const mutation = useMutation({
        mutationFn: async (id:string) => {
           
          // Log the data before making the API call
          console.log('Data to be sent to the API:', id);
    
          // Make the API call to post the new todo
          const response = await deletePhysician(id);
    
          // Check for a successful response
          if (response) {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['physicianInfo'] });
            return response; // Return the response data if needed
          } else {
            // Handle the API error
            throw new Error('Failed to Delete data');
          }
        },
        onSuccess: (data) => {
          // Log the response data from the mutation
          queryClient.setQueryData(['physicianInfo'], (existingData: physicianInfoArray) => {
            // Filter out the item with the specified id
            const updatedData = existingData?.filter((item) => item._id !== data.id);
            return updatedData;
          });
          console.log('Mutation response data:', data);
         
        },
        onError: (error) => {
          // Log and handle the error
          console.error('Mutation error:', error);
        },
      });

    
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Patients</h1>
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
                        <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick={()=>setIsModalOpen(!isModalOpen)}>Add Physician</button>
                      </div>
                    
                    </div>
                  
                    <div className="w-full">
    
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={physicianData?.map((physician)=>({...physician,key:physician._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
            <AddPhysicianModal isModalOpen={isModalOpen} onClose={onCloseModal}/>
            <EditPhysicianModal isEditModalOpen={isEditModalOpen} onClose={onCloseEditModal} selectedData = {selectedData} />
         
        </>
     );
}
 
export default AdminPhysicianPage;
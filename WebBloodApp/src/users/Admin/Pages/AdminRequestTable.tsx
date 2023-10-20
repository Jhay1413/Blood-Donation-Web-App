import { Button, Space, Table } from "antd";
import { PatientInfo, PatientRequestInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import { approveRequestAPI, downloadRequestFile } from "../../../api/AdminAPI/AdminRequestService";


const AdminRequestPage = () => {
  const queryClient = useQueryClient();
  const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
   
    //TABLE COLUMNS
    const columns = [
      {
        title: 'Request ID',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'First Name',
        dataIndex: 'patient',
        key: 'patient.firstName',
        render: ((patient:PatientInfo) =>patient?.firstName)
      },
      {
        title: 'Last Name',
        dataIndex: 'patient',
        key: 'patient.lastName',
        render: ((patient:PatientInfo) =>patient?.lastName)
      },
      {
        title: 'Blood Type',
        dataIndex: 'bloodType',
        key: 'bloodType',
      },
      {
        title: 'Quantity', 
        dataIndex: 'bloodQuantity',
        key: 'bloodQuantity',
      },
      {
        title: 'Status', 
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Physician',
        dataIndex: 'physician',
        key: 'physician.firstName',
        render: ((physician:PhysicianInfo) =>physician?.firstName)
      },
      {
        title: 'Date', 
        dataIndex: 'Date',
        key: 'Date',
      },
      {
        title : 'Actions',
        dataIndex : 'actions',
        key:'actions',
        render: (text:string,record:PatientRequestValues)=>(
          <Space size="middle">
            <Button onClick={()=>downloadFiles(record._id)}>Download File</Button>
            
            {record.status === 'Approved' ? (
              <Button disabled>Approve</Button>
            ) : (
              <Button onClick={() => mutation.mutate(record._id)}>Approve</Button>
            )}
            <Button type="primary" onClick={()=>deleteRecord(record._id)} danger>Delete File</Button>
          </Space>
  
        )
      }
  
    ];
    const downloadFiles = async(id:string) =>{
      try {
        const response = await downloadRequestFile(id);
      } catch (error) {
        console.log(error)
      }
    }
    const deleteRecord = async (id:string) =>{

    }
    const mutation = useMutation({
      mutationFn: async (newTodo:string) => {
        // Log the data before making the API call
        console.log('Data to be sent to the API:', newTodo);
  
        // Make the API call to post the new todo
        const response = await approveRequestAPI(newTodo);
  
        // Check for a successful response
        if (response) {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['allRequest'] });
          return response; // Return the response data if needed
        } else {
          // Handle the API error
          throw new Error('Failed to update data');
        }
      },
      onSuccess: (data) => {
        // Log the response data from the mutation
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
                        <h1 className="text-xl">List of Request</h1>
                      </div>

                    </div>
                  
                    <div className="w-full">
    
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={requestData?.map((request) =>({...request,key:request._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
         
        </>
     );
}
 
export default AdminRequestPage;
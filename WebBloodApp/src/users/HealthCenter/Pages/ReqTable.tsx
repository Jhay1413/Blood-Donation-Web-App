import { Button, Space, Table } from "antd";
import { HealthCenterInfo, PatientInfo, PatientRequestInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import { approveRequestAPI, downloadRequestFile } from "../../../api/AdminAPI/AdminRequestService";


const CenterRequestPage = () => {
  const queryClient = useQueryClient();
  const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
  console.log(requestData);
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
        title: 'Approved By',
        dataIndex: 'approvedBy',
        key: 'approvedBy.name',
        render: ((healthCenter:HealthCenterInfo) =>healthCenter?.name)
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
            
            
          </Space>
  
        )
      }
  
    ];
    const downloadFiles = (id:string) =>{
      try {
        const response =  downloadRequestFile(id);
      } catch (error) {
        console.log(error)
      }
    }
    const deleteRecord = async (id:string) =>{

    }
   
  

    
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
 
export default CenterRequestPage;
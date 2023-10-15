import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import {  getDocData } from "../context/DocDataContext";
import { PatientInfo, PatientRequestValues, PhysicianInfo } from "../Interface/Interface";
import { deleteRequest, downloadRequestFile } from "../../../api/patientRequestApi";


const DocRequestPage = () => {
  const [selectedPatient,setSelectedPatient] = useState<PatientRequestValues | null>()


  const [isModalOpen,setIsModalOpen] = useState(false)
  const contextValue = getDocData()


  const onSearch = (value:string) =>{
    const filteredPatiens = contextValue?.allRequest?.find((req)=>req?._id.toLowerCase().includes(value.toLocaleLowerCase()))
  }

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
      title: 'Physician',
      dataIndex: 'physician',
      key: 'physician.firstName',
      render: ((physician:PhysicianInfo) =>physician?.firstName)
    },
    {
      title : 'Actions',
      dataIndex : 'actions',
      key:'actions',
      render: (text:string,record:PatientRequestValues)=>(
        <Space size="middle">
          <Button onClick={()=>downloadFiles(record._id)}>Download File</Button>
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
const deleteRecord =async(id:string)=>{
  try {
    const response = await deleteRequest(id);
    contextValue?.handleSetIsLoading();
  } catch (error) {
    console.log(error);
  }
}
  return ( 
    <>
      <div className="w-full p-4 flex-col flex  bg-white shadow-md">
        <div className="flex pb-4">
          Request Page
        </div>
        <div className="flex">
            <Table columns={columns} dataSource={contextValue?.allRequest?.map(request=>({...request,key:request._id}))} className="w-full"/>
        </div>
      </div>
        
    </>
  );
}
export default DocRequestPage;
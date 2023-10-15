import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import {  getDocData } from "../context/DocDataContext";
import { PatientInfo, PatientRequestValues, PhysicianInfo } from "../Interface/Interface";
import { downloadRequestFile } from "../../../api/patientRequestApi";


const DocRequestPage = () => {
  const [selectedPatient,setSelectedPatient] = useState<PatientRequestValues | null>()


  const [isModalOpen,setIsModalOpen] = useState(false)
  const {DocRequestContext} = getDocData()


  const onSearch = (value:string) =>{
    const filteredPatiens = DocRequestContext?.allRequest?.find((req)=>req?._id.toLowerCase().includes(value.toLocaleLowerCase()))
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
          <Button onClick={()=>downloadFiles(record)}>Download File</Button>
        </Space>

      )
    }

  ];
const downloadFiles = async(record:PatientRequestValues) =>{
  const {_id } = record;
  try {
    console.log(_id)
    const response = await downloadRequestFile(_id);
    
    
  } catch (error) {
    console.log(error)
  }
}
const onCancel = () =>{
  setIsModalOpen(!isModalOpen)
}
const onOpen = () =>{
  setIsModalOpen(!isModalOpen)
}
  return ( 
    <>
      <div className="w-full p-4 flex-col flex  bg-white shadow-md">
        <div className="flex pb-4">
          Request Page
        </div>
        <div className="flex">
            <Table columns={columns} dataSource={DocRequestContext?.allRequest?.map(request=>({...request,key:request._id}))} className="w-full"/>
        </div>
      </div>
        
    </>
  );
}
export default DocRequestPage;
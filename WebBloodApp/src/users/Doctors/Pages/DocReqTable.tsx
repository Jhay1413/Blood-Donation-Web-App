import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import {  getDocData } from "../context/DocDataContext";
import { PatientInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import { deleteRequest, downloadRequestFile } from "../../../api/patientRequestApi";
import moment from 'moment';
const DocRequestPage = () => {
  const [selectedPatient,setSelectedPatient] = useState<PatientRequestValues | null>()
  const [searchedData,setSearchData] = useState("");

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
      filteredValue: [searchedData],
      onFilter:(value:any,record:any)=>{
        return (
          String(record.patient.firstName)
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
      sorter: (a:any, b:any) => moment(a.Date).unix() - moment(b.Date).unix(),
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
      <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Request</h1>
                      </div>
                      <Input.Search 
                    placeholder='searchbox'
                    onChange={(e)=>{
                      setSearchData(e.target.value.toLowerCase());
                    }}
                    className='md:w-52 p-2'
                    />
                    </div>
        
        <div className="flex">
            <Table columns={columns} dataSource={contextValue?.allRequest?.map(request=>({...request,key:request._id}))} className="w-full"/>
        </div>
      </div>
        
    </>
  );
}
export default DocRequestPage;
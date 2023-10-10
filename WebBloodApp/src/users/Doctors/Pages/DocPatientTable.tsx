import { Button, Input, Space, Table } from "antd";
import PatientModal from "../Modals/PatientModal";
import { Patient, getDocData } from "../context/DocDataContext";
import RequestModal from "../Modals/RequestModal";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
import PatientEditModal from "../Modals/PatientEditModal";
import { PatientInfo } from "../Interface/Interface";
import { useState } from "react";


const DocPatientPage = () => {


    //HOOKS
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    const [searchedData,setSearchData] = useState<string>('');
    const [selectedPatient,setSelectedPatient] = useState<PatientInfo> ({
      _id: '',
      firstName: '',
      lastName: '',
      sex: '',
      age: '',
      contactNumber: '',
      address: '',
      physician: '',

    })
    const [openRequestModal,setOpenRequestModal] = useState<boolean>(false);
    const [openEditModal,setOpenEditModal] = useState<boolean>(false);
    const {DocPatientContext} = getDocData()
    const {authContext} = useAuth()
   
    //FILTERED DATA FOR TABLE SEARCH
    const filteredPatients = searchedData 
                              ? DocPatientContext?.patientInfo?.filter(patient=>String(patient?._id).toLowerCase().includes(searchedData) || String(patient?.firstName).toLowerCase().includes(searchedData)) || [] 
                              : DocPatientContext?.patientInfo || []
   
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

        {
          title : 'Actions',

          key:'actions',
          render: (record:PatientInfo)=>(
            <Space size="middle">
              <Button onClick={()=>requestBlood(record)}>Request</Button>
              <Button className="bg-green-500 text-white" onClick={()=>editPatient(record) } >Edit</Button>
              <Button type="primary"onClick={()=>onDelete(record)} danger>Delete</Button>
            </Space>

          )
        }

      ];


    //FUNCTIONS
      const requestBlood = (value:PatientInfo) =>{
        const physician = authContext?.userId || ''
        setSelectedPatient({...value,physician})
        setOpenRequestModal(!openRequestModal)
      } 
      const editPatient = (value:PatientInfo)=>{
        setSelectedPatient(value)
        setOpenEditModal(!openEditModal)
      } 
      const onCloseEdit = () =>{
        setOpenEditModal(!openEditModal)
        setSelectedPatient({
          _id: '',
          firstName: '',
          lastName: '',
          sex: '',
          age: '',
          contactNumber: '',
          address: '',
          physician: '',
        })
      }
      const onDelete = async(record:Patient) =>{
       
      }
      const onCloseAdd = () =>{
        setIsModalOpen(!isModalOpen)
      }
      const onCancelRequestModal = () =>{
        setOpenRequestModal(!openRequestModal)
      }
      const onOpen = () =>{
        setIsModalOpen(!isModalOpen)
      }
     
    return ( 
        <>
            <div className="w-full p-4 flex-col flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Patients</h1>
                      </div>
                      <div className="w-full flex justify-end">
                        <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick={onOpen}>Add Patient</button>
                      </div>
                    
                    </div>
                  
                    <div className="w-full">
                      <Input.Search 
                        placeholder='Search id,name'
                        onChange={(e)=>{
                          setSearchData(e.target.value.toLowerCase());
                        }}
                      className='md:w-full '
                      />
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={filteredPatients?.map(patient=>({...patient,key:patient?._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
            <RequestModal isModalOpen={openRequestModal} cancelModal={onCancelRequestModal} selectedPatient = {selectedPatient}/>
            <PatientModal isModalOpen={isModalOpen} cancelModal={onCloseAdd}  authData={authContext} />
            <PatientEditModal isModalOpen={openEditModal} cancelModal={onCloseEdit} PatientInfo = {selectedPatient} />
        </>
     );
}
 
export default DocPatientPage;
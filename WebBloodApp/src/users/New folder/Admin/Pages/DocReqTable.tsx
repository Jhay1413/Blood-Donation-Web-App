import { Table } from "antd";
import { useState } from "react";
import RequestModal from "../Modals/RequestModal";

const DocRequestPage = () => {

    const [isModalOpen,setIsModalOpen] = useState(false)
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];

      const onCancel = () =>{
        setIsModalOpen(!isModalOpen)
      }
      const onOpen = () =>{
        setIsModalOpen(!isModalOpen)
      }
    return ( 
        <>
            <div className="w-full p-4 flex-col flex ">
                <div className="flex pb-4">
                    <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick={onOpen}>Add Request</button>
                </div>
                <div className="flex">
                    <Table columns={columns} dataSource={dataSource} className="w-full"/>
                </div>
            </div>
            <RequestModal isModalOpen={isModalOpen} cancelModal={onCancel}/>
          
        </>
     );
}
export default DocRequestPage;
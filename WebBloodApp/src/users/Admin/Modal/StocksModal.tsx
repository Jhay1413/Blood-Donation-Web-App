import { Modal, Table } from "antd";
import { HealthCenterInfo } from "../../../components/Interface/Interface";

type Props ={
    isModalOpen:boolean
    onClose:()=>void
    data:HealthCenterInfo | null | undefined
}
type bloodQuantity = {
  
        A_positive: null,
        A_negative: null,
        B_positive: null,
        B_negative: null,
        AB_positive: null,
        AB_negative: null,
        O_positive: null,
        O_negative: null,
    
}
const StocksModal = ({isModalOpen,onClose,data}:Props) => {
    const datasource = [{data}]
    const columns = [
        {
            title: 'A Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'A_positive',
            render: ((bloodType:bloodQuantity) =>bloodType.A_positive ? bloodType.A_positive : 'Out of Stock')
        },
        
        {
            title: 'A Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'A_negative',
            render: ((bloodType:bloodQuantity) =>bloodType.A_negative ? bloodType.A_negative : 'Out of Stock')
        },
        {
            title: 'B Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'B_positive',
            render: ((bloodType:bloodQuantity) =>bloodType.B_positive ? bloodType.B_positive : 'Out of Stock')
        },
        {
            title: 'B Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'B_negative',
            render: ((bloodType:bloodQuantity) =>bloodType.B_negative ? bloodType.B_negative : 'Out of Stock')
        },
        {
            title: 'AB Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'AB_positive',
            render: ((bloodType:bloodQuantity) =>bloodType.AB_positive ? bloodType.AB_positive : 'Out of Stock')
        },
        {
            title: 'AB Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'AB_negative',
            render: ((bloodType:bloodQuantity) =>bloodType.AB_negative ? bloodType.AB_negative : 'Out of Stock')
        },
        {
            title: 'O Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'O_positive',
            render: ((bloodType:bloodQuantity) =>bloodType.O_positive ? bloodType.O_positive : 'Out of Stock')
        },
        {
            title: 'O Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'O_negative',
            render: ((bloodType:bloodQuantity) =>bloodType.O_negative? bloodType.O_negative : 'Out of Stock')
        },
    ]
    return ( 
        <>
            <Modal open={isModalOpen} onCancel={onClose} width='80%' footer={null}>
            <h1 className="text-2xl font-bold p-4">Heealth Center Information</h1>
                    <div className="grid grid-rows-3 p-4 gap-4 w-full">
                        
                        <div className=" grid grid-cols-4 gap-4">
                           
                            <input type="text" value={data?.name} className="col-span-2 p-2" placeholder="Firstname" disabled/>
                            <input type="text" value={data?.contact} className="p-2" placeholder="Lastname" disabled/>
                            <input type="text" value={data?.address} className="col-span-2 p-2" placeholder="Age" disabled/>
                           
                        </div>
                        <div className="row-span-2 min-w-full">
                              <h1 className="text-2xl font-bold p-4">Blood Inventory</h1>
                              <div className="max-w-full overflow-x-auto">
                                <Table  columns={columns} dataSource = {datasource.map((data)=>({...data.data,key:data.data?._id}))} className="w-full overflow-scroll"/>
                            </div>
                    
                        </div>
                    </div>
            </Modal>    
        

        </>
     );
}
 
export default StocksModal;
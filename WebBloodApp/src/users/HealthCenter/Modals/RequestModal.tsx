import {Modal} from 'antd'

interface RequestModalProps{
    isModalOpen : boolean
    cancelModal:()=>void

}
const RequestModal = ({isModalOpen,cancelModal}:RequestModalProps) => {

    return ( 
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={cancelModal} width='50%' footer={null}>
                    <div className='w-full'>
                        <form>
                            <h1 className='py-4 text-4xl'>Request Form</h1>
                            <div className="flex flex-col">
                                <h1 className='py-4 text-2xl'>Patients Information</h1>
                                <div className='grid grid-cols-4 gap-4'>
                                    <div className="flex flex-col col-span-2">
                                        <label>First Name</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients First Name'/>
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <label>Last Name</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients Last Name'/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Sex</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients Sex'/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Age</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients Age'/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Contact Number</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients Contact Number'/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Address</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients Address'/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h1 className='py-4 text-2xl'>Blood Information</h1>
                                <div className='grid grid-cols-4 gap-4'>
                                    <div className="flex flex-col col-span-2">
                                        <label>First Name</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients First Name'/>
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <label>Last Name</label>
                                        <input type='text' className='p-2 border-2' placeholder='Patients Last Name'/>
                                    </div>
                                   
                                   
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
     );
}
 
export default RequestModal;
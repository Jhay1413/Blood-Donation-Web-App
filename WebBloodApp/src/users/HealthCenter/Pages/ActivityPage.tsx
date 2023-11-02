import { Table } from "antd";
import { useState } from "react";
import ActivityInfoModal from "../Modals/ActInfoModal";
import { useQueryClient } from "@tanstack/react-query";
import { ActivityInfoArray } from "../../../components/Interface/Interface";

const ActivityPage = () => {
    const queryClient = useQueryClient();
    const activities = queryClient.getQueryData<ActivityInfoArray>(['activityInfo']);
    const [isModalOpen,setIsModalOpen] = useState(false);


    const onCloseAdd = () =>{
        setIsModalOpen(false);
    }
    const columns =[
        {
            title: 'Activity ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Activity',
            dataIndex: 'activity',
            key: 'activity',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

    ] 
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                        <div className="w-full ">
                            <h1 className="text-xl">List of Activities</h1>
                        </div>
                        <div className="w-full flex justify-end">
                            <button className="p-2 bg-violet-500 text-sm rounded-sm text-white" onClick={()=>setIsModalOpen(true)}>Add Activity</button>
                        </div>
                    </div>
                    <div className="w-full">
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={ activities?.map((activity)=>({...activity,key:activity?._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
            <ActivityInfoModal isModalOpen={isModalOpen} cancelModal={onCloseAdd}/>
        </>
     );

}
 
export default ActivityPage;
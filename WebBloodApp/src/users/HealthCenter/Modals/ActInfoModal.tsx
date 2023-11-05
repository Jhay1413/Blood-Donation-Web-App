import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Spin } from "antd";
import { ErrorMessage, Field, Form,FieldProps, Formik, useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { ActivityInfoArray, preActivityInfo } from "../../../components/Interface/Interface";
import { addNewActivities } from "../../../api/AdminAPI/AdminHealthCenterServices";
import { validationSchemaForAddingActivity } from "../schema/validationSchema";
import {  useJsApiLoader,GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import { FaRegMap} from "react-icons/fa6";

import './style.css'
import MapComponent from "./MapsComponent";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
interface ActivityModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
   
} 
const ActivityInfoModal = ({isModalOpen,cancelModal}:ActivityModalProps) => {
    const queryClient = useQueryClient();
    const [openMapModal,setOpenMapModal] = useState(false);
    const{authContext} = useAuth();
    const userId = authContext?.userId || '';

    const[isLoading,setIsLoading] = useState(false)
    const initialValues : preActivityInfo = {
        activity:"",
        time:"",
        date: "",
        status:"",
        location:{
            latitude:"",
            longitude:""
        },
        bloodCenter:userId
    }
   
    const clearForm = () =>{
     
        cancelModal();
    }
    const cancelMapModal = () =>{
        setOpenMapModal(false);
    }
    const mutation = useMutation({
        mutationFn: async (activityInfo:preActivityInfo) => {
          // Log the data before making the API call
          console.log('Data to be sent to the API:', activityInfo);
    
          // Make the API call to post the new todo
          const response = await addNewActivities(activityInfo);
    
          // Check for a successful response
          if (response) {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activityInfo'] });
            return response; // Return the response data if needed
          } else {
            // Handle the API error
            throw new Error('Failed to update data');
          }
        },
        onSuccess: (data) => {

            queryClient.setQueryData(['activityInfo'], (existingData:ActivityInfoArray) => {
                return existingData?.concat(data);
              });
            setIsLoading(false);
            cancelModal();
          console.log('Mutation response data:', data);
        },
        onError: (error) => {
          // Log and handle the error
          console.error('Mutation error:', error);
        },
      });
    
      return ( 
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={clearForm} width='50%' footer={null}>
                    <div className='w-full'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForAddingActivity}
                            onSubmit={(values:preActivityInfo) => {
                                setIsLoading(true);
                                
                                // Call the mutation function when the form is submitted
                                mutation.mutate(values)
                              }}
                            >
                             {({ setFieldValue }) => (
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Donor Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>Activity</label>
                                            <Field type="text" name="activity" className="p-2 border-2 rounded-lg" placeholder="Activity" />
                                            <ErrorMessage name="activity" component="div" className="text-red-500" />
                                        </div>
                                       
                                        <div className="flex flex-col">
                                            <label>Time</label>
                                            <Field type="text" name="time" className="p-2 border-2 rounded-lg" placeholder="time" />
                                            <ErrorMessage name="time" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Date</label>
                                            <Field type="date" name="date" className="p-2 border-2 rounded-lg" placeholder="Donor date" />
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col ">
                                            <label>Status</label>
                                            <Field type="text" name="status" className="p-2 border-2 rounded-lg" placeholder="Status" />
                                            <ErrorMessage name="status" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Latitude</label>
                                            <Field type="text" name="location.latitude" className="p-2 border-2 rounded-lg" placeholder="Location"  />
                                           
                                            <ErrorMessage name="location.latitude" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Longitude</label>
                                            <Field type="text" name="location.longitude" className="p-2 border-2 rounded-lg" placeholder="Location" />
                                           
                                            <ErrorMessage name="location.longitude" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>View on maps</label>
                                            <div className="flex flex-row justify-start space-x-4">
                                                
                                                <div className="text-2xl flex justify-center border-2 p-1"  onClick={()=>setOpenMapModal(true)}>
                                                    <FaRegMap  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 w-full flex justify-end">
                                    <button className="px-4 py-2 bg-violet-500 text-white rounded-md" type="submit">{isLoading?<Spin/> : "Submit"}</button>
                                </div>
                                {openMapModal ? <MapComponent isModalOpen ={openMapModal} cancelModal={cancelMapModal} setFieldValue = {setFieldValue} /> : "" }
                                
                            </Form>
                             )}
                        </Formik>
                    </div>
                </Modal>
            </div>
        </>
     );
}
 
export default ActivityInfoModal;


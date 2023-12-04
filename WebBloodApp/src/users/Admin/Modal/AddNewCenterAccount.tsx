import {  Modal, Spin } from "antd";
import {Form, ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import {validationSchemaForRegister } from "../schema/adminValidationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewAccount} from "../../../api/AdminAPI/AdminHealthCenterServices";
import { HealthCenterAccountArray, healthCenterInfoArray, preHealthCenterAccount } from "../../../components/Interface/Interface";

interface Props  {
    isModalOpen:boolean
    onClose: ()=>void
    datalist : healthCenterInfoArray | undefined
}
interface HealthCenter {
    name:   string,
    address: string,
    contact: string,
    bloodTypeInventory: {
        A_positive: number | null,
        A_negative: number | null,
        B_positive: number | null,
        B_negative: number | null,
        AB_positive: number | null,
        AB_negative: number | null,
        O_positive: number | null,
        O_negative: number | null,
    },
}

const RegisterCenterModal = ({isModalOpen,onClose,datalist}:Props) =>{
    const queryClient = useQueryClient();
    const [isLoading,setIsLoading] = useState(false)
    const [selectedValue,setSelectedValue ] = useState<string>("")
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };
  
    const mutation = useMutation({
        mutationFn: async(newHealthCenterAccount:preHealthCenterAccount)=>{
            setIsLoading(true);

            const response = await addNewAccount(newHealthCenterAccount);

            if (response) {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['healthCenterAccount'] });
                return response; // Return the response data if needed
              } else {
                // Handle the API error
                throw new Error('Failed to update data');
              }
            },
            onSuccess: (data) => {
                // Log the response data from the mutation
                queryClient.setQueryData(['healthCenterAccount'], (existingData:HealthCenterAccountArray) => {
                  return existingData?.concat(data);
                });
                setIsLoading(false)
                onClose();
                console.log('Mutation response data:', data);
              },
              onError: (error) => {
                // Log and handle the error
                console.error('Mutation error:', error);
              },

    })
    const handleSelectOnchange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        const value = e.target.value
        console.log(value)
        setSelectedValue(value)
    }
    
    return (
        <>
              <div className="w-full">
                    <Modal open={isModalOpen} onCancel={onClose} width='50%' footer={null} title="Registration Form">
                        <div className="w-full">
                            <select className="p-2 border-2 rounded-lg" onChange={handleSelectOnchange} value={selectedValue ? selectedValue : ''}>
                                <option value="">Select Blood Center</option>
                                {datalist?.map((item)=>(
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))
                                }
                            </select>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchemaForRegister}
                                onSubmit={(values) => {
                                    let healthCenterAccount:preHealthCenterAccount = {
                                        email:  "",
                                        password:  "",
                                        confirmPassword:  "",
                                        userRoles: "",
                                        userId: "",
                                    }
                                    setIsLoading(true);
                                    if(selectedValue){
                                        healthCenterAccount = {
                                            ...values,
                                            userRoles:"BloodCenter",
                                            userId:selectedValue,
                                        }
                                    }
                                    mutation.mutate(healthCenterAccount)
                                  }}
                            >
                                <Form>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>Email Address</label>
                                            <Field type="text" name="email" className="p-2 border-2 rounded-lg" placeholder="Email" disabled = {selectedValue === ""}/>
                                            <ErrorMessage name="email" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-1">
                                            <label>Password</label>
                                            <Field type="password" name="password" className="p-2 border-2 rounded-lg" placeholder="Password" disabled = {selectedValue === ""}/>
                                            <ErrorMessage name="password" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-1">
                                            <label>Confirm Password</label>
                                            <Field type="password" name="confirmPassword" className="p-2 border-2 rounded-lg" placeholder="Confirm Password" disabled = {selectedValue === ""}/>
                                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="pt-4 w-full flex justify-end">
                                        <button className={`px-4 py-2 ${selectedValue? "bg-violet-500" : "bg-gray-300" } text-white rounded-md`} type="submit" disabled = {selectedValue === ""}>{isLoading?<Spin/> : "Submit"}</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </Modal>

            </div> 
        </>
    )
}
export default RegisterCenterModal
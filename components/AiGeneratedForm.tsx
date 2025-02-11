"use client"
import React, { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { publishForm } from '@/actions/publishForm';
import toast from 'react-hot-toast';
import FormPublishDialog from './FormPublishDialog';
import { boolean } from 'zod';
import { submitForm } from '@/actions/submitForm';
type Props = { form: any; isEditMode: boolean };
const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
    if (!form || !form.content.fields) return <p>Loading...</p>;
    const [successDialogOpen,setSuccessDialogOpen]=useState<boolean>(false);
    const [formData, setFormData] = useState<any>({});
    //const content=form.content?.feilds ? form.content?.fields : form.content.content.fields;

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setFormData({...formData, [name]:value});
      }

    console.log("content form",form.content.fields);
    const handlePublish=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(isEditMode){
            await publishForm(form.id);
            setSuccessDialogOpen(true);
        }

    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await submitForm(form.id, formData);
    
        if(data?.success){
          toast.success(data.message);
          setFormData({});
        }
        if(!data?.success){
          toast.error(data?.message);
        }
        }
        const value = typeof form.content !== 'object' ? JSON.parse(form.content as any) : form.content;

        let data;
      
        if (typeof value === "object" && form !== null && !Array.isArray(value)) {
          data = form.content.fields;
        } else {
          data = form.content.fields;
        }
    return (
        <div>
            <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
                {
                    form.content.fields.map((item: any, index: number) => (
                        <div key={index} className='mb-4'>
                            <Label>{item.name}</Label>
                            {item.type === "text" || item.type === "email" || item.type === "date" || item.type === "tel" || item.type === "number" || item.type === "file" ? (
                                <Input
                                    type={item.type}

                                    name={item.label}
                                    onChange={handleChange}
                                    placeholder={item.placeholder}
                                    required={!isEditMode && true} />) : 
                                item.type === "textarea" ? (
                                    <Textarea name={item.label} placeholder={item.placeholder} required={!isEditMode && true} className='w-full border-rounded'/>
                                ) : 
                                    item.type === "dropdown" ? (
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder={item.placeholder}></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    item.options!.map((option: string , index: number) => (
                                                        <SelectItem key={index} value={option}>{option}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    ) : 
                                        item.type === "radio" ? (
                                            <RadioGroup>
                                                {
                                                    item.options!.map((option: string, index: number) => (
                                                        <Label key={index} >
                                                            <RadioGroupItem  value={option} required={!isEditMode && item.required}></RadioGroupItem>
                                                            <span>{option}</span>
                                                        </Label>
                                                    ))
                                                }
                                            </RadioGroup>
                                        ) : 
                                            item.type === "checkbox" || item.type==="select" ? (
                                                item.options.map((option: string, index: number) => (
                                                    <Label key={index} className=' ml-2 mt-2'>
                                                        <Checkbox name={item.label} value={option} >

                                                        </Checkbox>
                                                        <span>{option}</span>
                                                    </Label>
                                                ))
                                            ) : 
                                                null
                                            
                                        
                                    
                                
                            
                            }


                        </div>
                    ))
                }
                
                <Button type="submit">{
                    isEditMode ? "Publish": "Submit"} 
                    </Button>
                    
            </form>
            <FormPublishDialog formId={form.id} open={successDialogOpen} onOpenChange={setSuccessDialogOpen}/>
        </div>
    )
}
export default AiGeneratedForm;


// import React from 'react';
// import { Label } from './ui/label';
// import { Input } from './ui/input';
// import { Textarea } from './ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Checkbox } from './ui/checkbox';
// import { Button } from './ui/button';

// type Props = { form: any; isEditMode: boolean };

// const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
//     if (!form || !form.content.fields) return <p>Loading...</p>;
//     console.log("content form", form.content.fields);

//     return (
//         <div>
//             <form>
//                 {
//                     form.content.fields.map((item: any, index: number) => (
//                         <div key={index} className='mb-4'>
//                             <Label>{item.name}</Label>
//                             {item.type === "text" || item.type === "email" || item.type === "date" || item.type === "tel" || item.type === "number" || item.type === "file" ? (
//                                 <Input
//                                     type={item.type}
//                                     name={item.label}
//                                     placeholder={item.placeholder}
//                                     required={!isEditMode && true} 
//                                 />
//                             ) : item.type === "textarea" ? (
//                                 <Textarea 
//                                     name={item.label} 
//                                     placeholder={item.placeholder} 
//                                     required={!isEditMode && true} 
//                                     className='w-full border-rounded'
//                                 />
//                             ) : item.type === "dropdown" ? (
//                                 <Select>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder={item.placeholder}></SelectValue>
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {
//                                             /* ✅ Fixed: Added check to prevent 'undefined' error */
//                                             Array.isArray(item.options) && item.options.map((option: string, index: number) => (
//                                                 <SelectItem key={index} value={option}>{option}</SelectItem>
//                                             ))
//                                         }
//                                     </SelectContent>
//                                 </Select>
//                             ) : item.type === "radio" ? (
//                                 <RadioGroup>
//                                     {
//                                         /* ✅ Fixed: Added check to prevent 'undefined' error */
//                                         Array.isArray(item.options) && item.options.map((option: string, index: number) => (
//                                             <Label key={index} className='flex items-center space-x-2'>
                                              
//                                                 <RadioGroupItem value={option} required={!isEditMode && item.required}></RadioGroupItem>
//                                                 <span>{option}</span>
//                                             </Label>
//                                         ))
//                                     }
//                                 </RadioGroup>
//                             ) : (item.type === "checkbox" || item.type === "select") ? (
//                                 /* ✅ Fixed: Added check to prevent 'undefined' error */
//                                 Array.isArray(item.options) && item.options.map((option: string, index: number) => (
//                                     <Label key={index}>
//                                         <Checkbox name={item.label} value={option} ></Checkbox>
//                                         {/* console.log(option); */}
//                                         <span>{option}</span>
//                                     </Label>
//                                 ))
//                             ) : null}
//                         </div>
//                     ))
//                 }

//                 <Button type="submit">
//                     {isEditMode ? "Publish" : form.content.button.label ? form.content.button.label : form.content.button.text} 
//                 </Button>
//             </form>
//         </div>
//     );
// }

// export default AiGeneratedForm;

'use client'
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { useFormStatus } from 'react-dom'
import { Sparkle } from 'lucide-react'
import { generateForm } from '@/actions/generateForm'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


type InitialState={
  message:string;
  success:boolean;
  data?:any
}
const initialState:InitialState={
  message:"",
  success:false
}
const GenerateFormInput : React.FC<{text?:string}>=({text})=> {
  const [state,formAction]=useActionState(generateForm,initialState);
  const [description,setDescription]=useState<string |undefined>(text);
  const router=useRouter();

  const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    setDescription(e.target.value);
  };
  useEffect(()=>{
    setDescription(text);
  },[text]);
  useEffect(()=>{
    if(state.success){
      toast(state.message);
      console.log("response",state.data);
      router.push(`/dashboard/forms/edit/${state.data.id}`)
    }else if(state.message){
      toast.error(state.message);
    }
  },[router,state])
  return (
    <form action={formAction} className='flex items-center gap-4 my-8'>
      <Input name="description" id="description" value={description} onChange={changeEventHandler} required className='border-2 ' type='text' placeholder='write a prompt to generate form...' />
      <SubmitButton />
    </form>
  );
};
export default GenerateFormInput;
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className='h-12 bg-gradient-to-r from-blue-500 to bg-purple-600'>
      <Sparkle className='mr-2' />
      {pending ? 
        <span>Generating form...</span>
      : "Generate Form"
      }
    </Button>
  )
}
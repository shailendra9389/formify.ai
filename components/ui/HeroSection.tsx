"use client"
import React, { useState } from 'react'
import { Button } from './button';
import GenerateFormInput from './GenerateFormInput'
type SuggestionText={
    label:string;
    text:string;

}
const suggestionBtnText : SuggestionText[]=[
    {
    label:"job Application",
    text:"Develop a basic job application form that serves as a one-page solution for collecting essential information."
    },
    {
        label:"Registration Form",
        text:"generate a course registration form extracting important details related to course"
    },
    {
        label:"Feedback Form",
        text:"Create a client Feedback form to gather valuable insights from any client"
    },
   
]
export default function HeroSection() {
    const [text,setText]=useState<string>("");
    return (
        <section>
            <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10'></div>


                <div className='container mx-auto text-center relative'>
                    <h1 className='text-4xl font-bold'> Build AI-Driven Forms Effortlessly</h1>
                    <p className='mt-4 text-lg '>Leverage the power of AI to create dynamic, user-friendly, and responsive forms effortlessly</p>
                </div>
            </div>
            
            <GenerateFormInput text={text}/>
            <div className='grid sm:grid-cols-2, md:grid-cols-3, lg:grid-cols-4 gap-3'>
            {
                suggestionBtnText.map((item:SuggestionText, index:number)=>(
                    <Button onClick={()=>setText(item.text)}key={index} className='rounded-full h-10 ' variant={'outline' } >{item.label}</Button>
                ))
            }
            </div>
           
        </section>
    )
}

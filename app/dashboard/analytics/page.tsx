import { getFormStats } from '@/actions/formStats'
import Analytics from '@/components/Analytics' 
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page =  async () => {
  const user=await currentUser();
  const res=await prisma.form.aggregate({
    where :{
      ownerId: user?.id as  string
    },
    _sum:{
      submissions:true
    }
    
  });
  const noOfSubmissions=res._sum.submissions || 0;
   const data = await getFormStats();
  //  console.log(data);
   
    
  return (
    <div>
        <Analytics noOfSubmissions={noOfSubmissions}/></div>
  )
}

export default page

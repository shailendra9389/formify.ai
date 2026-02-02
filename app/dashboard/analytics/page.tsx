import { getFormStats } from '@/actions/formStats'
import Analytics from '@/components/Analytics' 
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page =  async () => {
  let user;
  
  // Create a timeout promise
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Request timed out")), 10000)
  );

  try {
    // Race between fetching user and 10s timeout
    user = await Promise.race([
      currentUser(),
      timeout
    ]) as Awaited<ReturnType<typeof currentUser>>;
    
  } catch (error) {
    console.error("Analytics load error:", error);
    return (
      <div className="p-4 text-red-500 border border-red-200 rounded bg-red-50">
        Error: Failed to load analytics data (Timeout or Network Error). Please try refreshing.
      </div>
    );
  }

  if (!user) {
    redirect('/sign-in');
  }

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

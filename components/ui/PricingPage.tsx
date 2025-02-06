import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card'

import { Button } from './button'

import { PricingPlan, pricingPlan } from '@/lib/pricingplan'
import { Badge } from './badge'


export default function PricingPage() {
    return (
        <div>
            <div>
            <h1 className='font-bold text-3xl text-center'>Pricing and Plan 🏷️</h1>
            <p className='text-center font-semibold text-xl mt-3 text-gray-500'>Recieve unlimited credits when you pay earl, and save your plan.</p>
            </div>
            
            <div className='grid sm:grid-cols-2, md:grid-cols-3, lg:grid-cols-3 gap-10 mt-10 flex items-center'>

                {pricingPlan.map((plan: PricingPlan, index: number) => (
                    <Card className={`${plan.level === "Enterprise" && "bg-[#1c1c1c] text-white"} w-[350px] flex flex-col justify-between`} key={index} >
                        <CardHeader className='flex flex-row items-center gap-2 '>
                            <CardTitle className='font-bold text-2xl '>{plan.level}</CardTitle>
                            {
                                plan.level === "Pro" && <Badge className='rounded-full bg-orange-600 hover:bg-null h-7'> 🔥Popular</Badge>
                            }

                        </CardHeader>
                        <CardContent>
                            <p className='text-2xl font-bold flex-1'>{plan.price}</p>
                            <ul className='mt-3 space-y-1'>
                                {
                                    plan.services.map((item: string, index: number) => (
                                        <li className='flex items-center' key={index}>
                                            <span className='text-green-500 mr-2'>✔</span>{item}</li>
                                    ))
                                }
                            </ul>
                        </CardContent>
                        <CardFooter>

                            <Button className={`${plan.level === "Enterprise" ? "bg-white text-[#1c1c1c] hover:bg-white" : null} w-full`}>Get Started with {plan.level}</Button>
                        </CardFooter>
                    </Card>
                ))}


            </div>
        </div>


    )
}

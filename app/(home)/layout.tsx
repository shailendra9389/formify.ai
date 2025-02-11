import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/Logo'
import ModeToggle from '@/components/upgradebutton'
import { UserButton } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'
import Link from 'next/link'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
        <div>
            <div className='border-b'>
                {/*navbar*/}
                <nav className="flex items-center justify-between mx-auto max-w-7xl py-2">
                    
                        <Logo />
                        <div className='flex items-center'>
                        <Link href={"/dashboard/analytics"}>
              {" "}
              <Button variant={"link"}>Dashboard</Button>
            </Link>
                            <UserButton/> 
                            <ModeToggle/>
                            
                        </div>
                    
                </nav>

            </div>
            {children}
        </div>
        </ThemeProvider>
    )
}

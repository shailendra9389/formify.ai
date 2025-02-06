import React from 'react'
import Image from 'next/image'
type Props = {}
const Footer = (props: Props) => {
  return (
    <div className='w-full'>
       <footer className="bg-black text-white py-10 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* About Us Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About Formify.ai</h2>
          <p className="text-sm leading-6">
            At <span className="font-semibold">Formify.ai</span>, we revolutionize the way you create and manage forms using AI. 
            Our tools are designed to save you time, boost efficiency, and simplify workflows. From smart form generation to insightful analytics, 
            Formify.ai empowers individuals and businesses to achieve more.
          </p>
        </div>
        
        {/* Contact Us Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@formify.ai" className="text-blue-400 hover:underline">sps976130@outlook.com</a></li>
            <li>Phone: <a href="tel:+18001234567" className="text-blue-400 hover:underline">+91 9389704171</a></li>
            <li>Address: 456 AI Street, Tech City, Innovation Land</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Formify.ai. All rights reserved. | Built with ❤️ and AI.
      </div>
    </footer>
    </div>
   
  )
  
}

export default Footer;
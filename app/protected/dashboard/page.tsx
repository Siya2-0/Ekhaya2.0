import AuthButton from '@/components/header-auth'
import EmployeeTable from '@/components/table'
import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import base64 from '../../assets/base64.jpeg'
const Dashboard = () => {
  return (
    <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Dashboard Page</p>
            <AuthButton />
            <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                <Link href={``}>
                  <div className='sm:col-span-1 col-span-2 text-[#212322] min-w-[100px] overflow-hidden'>
                      <div className='overflow-hidden'>
                          <Image 
                          src={"https://images.unsplash.com/photo-1569529465841-dfecdab7503b"} 
                          alt="" 
                          unoptimized 
                          priority 
                          placeholder='blur' 
                          blurDataURL={"https://firebasestorage.googleapis.com/v0/b/ubac-18e0d.appspot.com/o/base64.jpeg?alt=media&token=3cbefe48-0084-439e-8ce4-3e95fd466c74"}
                          loading="eager" 
                          width={100} 
                          height={100} 
                          className='w-full md:max-h-[400px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
                      </div>
                      <div className='pb-8 border-b'>
                          <div className='font-bold'>
                              <p className='uppercase text-[16px] mt-[16px]'>Premium Whisky</p>
                          </div>
                          <p className='text-gray-400 text-base text-[14px]'>Whisky</p>
                          <p className='font-bold text-[16px] mt-0'>R139.90</p>
                      </div>
                  </div>
              </Link>
            </div>
        </main>
    </div>
  )
}

export default Dashboard
import cn from '@/lib/utils'
import React from 'react'

const Logo = ({className}:{className?:string}) => {
  return (
    <div className={cn('flex gap-2 items-center', className)}>
        <div className='rounded-full flex items-center justify-center bg-primary-accent size-8'>
            <div className='size-3 bg-white rounded-full'></div>
        </div>
        <span className='font-medium text-xl'>aps</span>
    </div>
  )
}

export default Logo
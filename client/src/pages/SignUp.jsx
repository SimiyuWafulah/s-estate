import React from 'react'

export default function SignUp() {
  return (
    <div className = 'p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='rounded-lg border p-3'
        />
        <input
          type='email'
          placeholder='email'
          className='rounded-lg border p-3'
        />
        <input
          type='password'
          placeholder='password'
          className='rounded-lg border p-3'
        />
      </form>
    </div>
  )
}

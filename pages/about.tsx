import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { increment, selectCount } from '@/features/counter/counterSlice';
import type { NextPage } from 'next'
import { useEffect } from 'react'

const About: NextPage = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  console.log('Component!')
  useEffect(() => {
    console.log('useEffect')
    dispatch(increment())
  }, [dispatch])
  return <div className="bg-teal-700 p-3">I am a savage
  
  <p>{count}</p>
  </div>
}

export default About

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { MainLayout } from '@/components/layout';
import { increment, selectCount } from '@/features/counter/counterSlice';
import { useEffect } from 'react'
import { NextPageWithLayout } from './_app';

const About: NextPageWithLayout = () => {
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

About.Layout = MainLayout

export default About

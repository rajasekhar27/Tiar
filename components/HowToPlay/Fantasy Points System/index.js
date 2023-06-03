
import { Tab } from '@headlessui/react'
import {VscCircleFilled} from 'react-icons/vsc'
import { Fragment } from 'react'
import T20 from './t20'
import OD from './oD'
import Test from './test'
import T10 from './t10'
import Sixty from './sixty'
import TheHundred from './thehundred'
import OtherT20 from './otherT20'
import OtherOD from './otherOD'
import OtherTest from './othertest'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FantasyPointSystem() {
  const [active,setTabActive] = useState('1')
  return (
    <Tab.Group>
      <Tab.List className='border'>
        <Tab as={Fragment}  className={active === '1' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("1")}>
              T20
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '2' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("2")}>
              OD
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '3' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("3")}>
              Test
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '4' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("4")}>
              T10
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '5' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("5")}>
              6ixty
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '6' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("6")}>
              The Hundred
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '7' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("7")}>
              Other T20
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '8' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("8")}>
              Other OD
            </button>
          )}
        </Tab>
        <Tab as={Fragment} className={active === '9' ? 'bg-black text-white border py-3 px-2 ':'bg-white text-black border py-3 px-2 '}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button onClick={() => setTabActive("9")}>
              Other Test
            </button>
          )}
        </Tab>
        
        {/* ...  */}
       
      </Tab.List>
      <Tab.Panels>
        
      <Tab.Panel><T20/></Tab.Panel>
      <Tab.Panel><OD/></Tab.Panel>
      <Tab.Panel><Test/></Tab.Panel>
      <Tab.Panel><T10/></Tab.Panel>
      <Tab.Panel>
        <Fragment>
          
           <div className='pl-7 mt-2'>
           <h1 className='text-black font-bold text-md'>Important:</h1>
           <div className='flex items-start mx-8 my-5'>
                <VscCircleFilled className='text-black mt-1 mr-2'/>
                <p>data...............</p>
           </div>
           <div className='flex items-start mx-8 my-5'>
                <VscCircleFilled className='text-black mt-1 mr-2'/>
                <p>data...............</p>
           </div>
           <div className='flex items-start mx-8 my-5'>
                <VscCircleFilled className='text-black mt-1 mr-2'/>
                <p>data...............</p>
           </div>
           </div>
          
        <Sixty/>
        </Fragment>
      </Tab.Panel>
      <Tab.Panel><TheHundred/></Tab.Panel>
      <Tab.Panel><OtherT20/></Tab.Panel>
      <Tab.Panel><OtherOD/></Tab.Panel>
      <Tab.Panel><OtherTest/></Tab.Panel>
        {/* ... */}
      </Tab.Panels>
    </Tab.Group>
  )
}
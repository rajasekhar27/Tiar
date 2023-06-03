
import {VscCircleFilled} from 'react-icons/vsc'

export default function FieldingPoints(){
    return(
        <div className="w-100%">
            <img src="/images/banner_1.png" alt=""/>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Catch</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+8</div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="pl-2">3 Catch Bonus</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Stumping</h1>
                <div className=" bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+12</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">Run out (Direct hit)</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+12</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Run out (Not a direct hit)</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+6</div>
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
    )
}
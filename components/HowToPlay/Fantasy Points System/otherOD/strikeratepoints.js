
import {VscCircleFilled} from 'react-icons/vsc'

export default function StrikeRatePoints(){
    return(
        <div className="w-100%">
            <img src="/images/banner_1.png" alt=""/>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Above 170 runs per 100 balls</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+6</div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="pl-2">Between 150.01-170 runs per 100 balls</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Between 130-150 runs per 100 balls</h1>
                <div className=" bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+2</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">Between 60-70 runs per 100 balls</h1>
                <div className="bg-orange-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">-2</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Between 50-59.99 runs per 100 balls</h1>
                <div className="bg-orange-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">-4</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">Below 50 runs per 100 balls</h1> 
                <div className="bg-orange-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">-6</div>
            </div>
            
            <div className='flex items-start mx-8 my-5'>
                <VscCircleFilled className='text-black mt-1 mr-2'/>
                <p>data...............</p>
            </div>
             
        </div>
    )
}
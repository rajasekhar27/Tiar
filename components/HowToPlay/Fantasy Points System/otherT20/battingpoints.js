
import {VscCircleFilled} from 'react-icons/vsc'

export default function BattingPoints(){
    return(
        <div className="w-100%">
            <img src="/images/banner_1.png" alt=""/>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Run</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+1</div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="pl-2">Boundary Bonus</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+1</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Six Bonus</h1>
                <div className=" bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+2</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">30 Run Bonus</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Half-century Bonus</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+8</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">century Bonus</h1> 
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">16</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center w-100%">
                <h1 className="pl-2 ">Dismissal for a duck<br/>
                <span className='text-xs'>Batter, Wicket-Keeper & All-Rounder</span></h1>
                <div className="bg-orange-300 w-10 h-12 flex justify-center items-center text-black font-bold ">-2</div>
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
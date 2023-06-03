
import {VscCircleFilled} from 'react-icons/vsc'

export default function OtherPoints(){
    return(
        <div className="w-100%">
            <img src="/images/banner_1.png" alt=""/>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Captain</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">2x</div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="pl-2">Vice-Captain</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">1.5x</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">In announced lineups</h1>
                <div className=" bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            <div className=" flex justify-between items-center">
            <h1 className="pl-2 ">Playing Substitute<br/>
                <span className='text-xs'>(Concussion, COVID-19, X-Factor, or Impact Player)</span></h1>
                <div className="bg-green-300 w-10 h-16 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            
        </div>
    )
}


export default function BowlingPoints(){
    return(
        <div className="w-100%">
            <img src="/images/banner_1.png" alt=""/>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2 ">Wicket<br/>
                <span className='text-xs'>Excluding Run Out</span></h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+25</div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="pl-2">Bonus (LBW / Bowled)</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+8</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">3 Wickets Bonus</h1>
                <div className=" bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">4 Wicket Bonus</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+8</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">5 Wicket Bonus</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+16</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">Maiden Over</h1> 
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+12</div>
            </div>
            
             
        </div>
    )
}


export default function EconomyRatePoints(){
    return(
        <div className="w-100%">
            <img src="/images/banner_1.png" alt=""/>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Below 5 runs per over</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+6</div>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="pl-2">Between 5-5.99 runs per over</h1>
                <div className="bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+4</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Between 6-7 runs per over</h1>
                <div className=" bg-green-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">+2</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">Between 10-11 runs per over</h1>
                <div className="bg-orange-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">-2</div>
            </div>
            <div className="bg-gray-100 flex justify-between items-center">
                <h1 className="pl-2">Between 11.01-12 runs per over</h1>
                <div className="bg-orange-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">-4</div>
            </div>
            <div className=" flex justify-between items-center">
                <h1 className="pl-2">Above 12 runs per over</h1> 
                <div className="bg-orange-300 w-10 h-10 flex justify-center items-center text-black font-bold border border-b-white">-6</div>
            </div>
            
             
        </div>
    )
}
import React, {useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight} from "react-feather"

const Carousel = ({children: slides, autoSlide = false, autoSlideInterval = 3000}) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])


    return (
        <div className='relative overflow-hidden'>
            <div className='flex transition-transform duration-500 ease-out'
                 style={{transform: `translateX(-${curr * 100}%)`}}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className='rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white'>
                    <ChevronLeft/>
                </button>
                <button onClick={next} className='rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white'>
                    <ChevronRight/>
                </button>
            </div>
            <div className="h-full w-full object-contain object-center lg:h-full lg:w-full">
                <div className="h-full w-full object-contain object-center lg:h-full lg:w-full">
                    {slides.map((s, i) => (
                        <div key={i}
                             className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`}/>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Carousel
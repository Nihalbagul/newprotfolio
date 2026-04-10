import React from 'react'
import { counterItems } from '../../constants'
import CountUp from 'react-countup'

const AnimatedCounter = () => {
  return (
    <div id="counter" className="w-full">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
            {counterItems.map((item, index) => (
                <div
                key={index}
                className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 xl:p-8 flex flex-col justify-center border border-zinc-800/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="counter-number text-white-50 text-3xl xl:text-5xl font-bold mb-2">
                  <CountUp suffix={item.suffix} end={item.value} />
                </div>
                <div className="text-white-50 text-sm xl:text-lg opacity-80">{item.label}</div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default AnimatedCounter

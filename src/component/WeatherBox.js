import React from 'react'

const WeatherBox = ({weather}) => {
    console.log('weather',weather)
  return (

        <div className='main'>
            <h2>{weather?.name}</h2>
            <div>{weather?.main.temp}</div>
            <div>{weather?.weather[0].main}</div>
        </div>

    
  )
}

export default WeatherBox
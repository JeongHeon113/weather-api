import React from 'react'
import { Button } from 'react-bootstrap';
const WeatherButton = ({cities, setCity}) => {

  return (
    <div className='buttonArea'>
        <Button variant="outline-warning" onClick={()=>setCity(null)}>Current Location</Button>
        {cities.map((item)=>{
            return <Button variant='outline-warning' onClick={()=>setCity(item.toLowerCase())}>{item}</Button>
        })}
    </div>
  )
}

export default WeatherButton
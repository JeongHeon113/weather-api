import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import { useEffect,useState } from 'react';
import WeatherButton from './component/WeatherButton';
import { ThreeDots } from 'react-loader-spinner'


//1. 앱이 실행되자마자 현재위치 날씨상태가 보인다 -> useEffect
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼이 있다. 1개는 현재위치 4개는 다른 위치
//4. 도시버튼을 클릭할 때 마다 도시의 날씨 정보가 보임
//5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 보인다
//6. 로딩 스피너가 돈다. 
function App() { 
  const [city,setCity] =useState(null)
  const cities = ["Seoul", "New York", "Paris", "Tokyo"]
  const [weather,setWeather] =useState(null)
  const [loading,setLoading]=useState(false)
  const getCurrentLocation =()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('lat,lon',lat,lon)
      getWeatherByCurrentLocation(lat, lon)
    });
  }
  const getWeatherByCurrentLocation= async (lat,lon)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=870fbb751638f88f5e2f3cbde00ef8b6`)
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    console.log('data',data)
    setWeather(data)
    setLoading(false)
  }
  const getCityWeather = async (city)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=870fbb751638f88f5e2f3cbde00ef8b6`)
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    console.log('city data',data)
    setWeather(data)
    setLoading(false)
  }
  useEffect(() => {
    if(city==null){
      getCurrentLocation();
    }else{
    getCityWeather(city)
    }
  }, [city])


  return (
  <div>
    {loading? 
    <div className='container'> 
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="rgba(233, 181, 83, 0.767)" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>:
    <div className='container'>
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity}/>
    </div>}    
  </div>
  )
}

export default App;

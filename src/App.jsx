import MyLocation from "@mui/icons-material/MyLocation";
import React,{ useState,useEffect} from "react";
import { getCoords } from "./util/getCoords";
import { getLocationName,getCitySuggestions, getWeather } from "./util/Geo";
import { Container,Typography,Paper,Box,Button, CircularProgress, Alert, CardContent,Card,Divider,Grid} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GrainIcon from "@mui/icons-material/Grain";
import AcUnitIcon from "@mui/icons-material/Thunderstorm";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import AirIcon from "@mui/icons-material/WaterDrop";

import SearchBar from "./components/Searchbar";

const iconMap = {
    // Clear & Cloudy
    0: { icon: <WbSunnyIcon />, color: "#FFD700", label: "Clear Sky" },
    1: { icon: <WbSunnyIcon />, color: "#FFE082", label: "Mainly Clear" },
    2: { icon: <CloudIcon />, color: "#B0BEC5", label: "Partly Cloudy" },
    3: { icon: <CloudIcon />, color: "#90A4AE", label: "Overcast" },

    // Fog
    45: { icon: <CloudIcon />, color: "#CFD8DC", label: "Fog" },
    48: { icon: <CloudIcon />, color: "#CFD8DC", label: "Rime Fog" },

    // Rain & Drizzle
    51: { icon: <GrainIcon />, color: "#4FC3F7", label: "Light Drizzle" },
    53: { icon: <GrainIcon />, color: "#29B6F6", label: "Drizzle" },
    61: { icon: <WaterDropIcon />, color: "#039BE5", label: "Light Rain" },
    63: { icon: <WaterDropIcon />, color: "#0288D1", label: "Moderate Rain" },
    65: { icon: <WaterDropIcon />, color: "#01579B", label: "Heavy Rain" },

    // Snow
    71: { icon: <AcUnitIcon />, color: "#E1F5FE", label: "Light Snow" },
    73: { icon: <AcUnitIcon />, color: "#B3E5FC", label: "Moderate Snow" },
    75: { icon: <AcUnitIcon />, color: "#81D4FA", label: "Heavy Snow" },

    // Showers & Storms
    80: { icon: <UmbrellaIcon />, color: "#4FC3F7", label: "Light Showers" },
    95: { icon: <ThunderstormIcon />, color: "#5C6BC0", label: "Thunderstorm" },
    96: { icon: <ThunderstormIcon />, color: "#3F51B5", label: "Storm with Hail" },
  };


export default function App(){
  const [Coords,setCoords] = useState(null);
  const [locationName,setLocationName] = useState("Search for a city or use GPS");  
  const [Loading,setLoading] = useState(false);  
  const [suggestions,setSuggestions] = useState([]);
  const [weather,Setweather] = useState(null);
  const [weatherError,setWeatherError] = useState(false);
  useEffect (() =>{
    if(!Coords) return;     
    setWeatherError(false);
    (async () =>{
      try{
        const w = await getWeather(Coords.lat,Coords.long);
        Setweather(w);        
      }
      catch{
        setWeatherError(true);
        Setweather(null);
      }
    })();
  },[Coords]);
  const handleGetGPS = async () =>{
    setLoading(true);
    try{
      const c = await getCoords();
      setCoords(c);
      const name = await getLocationName(c.lat,c.long);
      setLocationName(name);
    }
    catch{
      setText("Location access denied");
    }
    finally{
      setLoading(false);
    }    
  } 
  
  return(<Container maxWidth="xs" sx={{mt:4}}>
    {/* Header */}
    <Paper elevation ={0} sx={{p:2,mb: 2, bgcolor: 'transparent'}}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
        Weather App
        </Typography>      
    </Paper>
    {/* Controls */}
    <Box sx={{display: 'flex',flexDirection: 'column',gap : 2,mb:4}}>
      <Button
      variant="contained"
      startIcon={Loading ? <CircularProgress size={20} color="inherit"/> : <MyLocation/>}  
      disabled={Loading}
      onClick={handleGetGPS}
      fullWidth
      >
        {Loading ? "Locating....":"Use My Location"}
      </Button>
      <SearchBar
      suggestions={suggestions}
      setSuggestions={setSuggestions}
      getCitySuggestions={getCitySuggestions}
      onSelect={(city) =>{
        setLocationName(city.name);
        setCoords({lat: city.lat,long:city.long});
      }}
      />
    </Box>
    {/* ERROR MESSAGE */}    
    {weatherError && (
      <Alert severity="error" sx={{mt :2}}>Failed to fetch weather data</Alert>
    )}
    {/*Weather Card*/}
    {weather &&(
      <Card
      elevation={4}
       sx={{
        borderRadius:4,
        background: 'linear-gradient(135deg,#667eea 0%, #764ba2 100%)',
        color: 'white'
       }}>
        <CardContent sx={{textAlign: 'center',p:4}}>
          <Typography variant="h6" sx={{opacity: 0.9}}>
            {locationName}            
          </Typography>
          <Typography variant="body2" sx={{opacity: 0.7,mb:3}}>
            {new Date().toLocaleDateString('en-US',{weekday: 'long',month: 'short',day:'numeric'})}
          </Typography>
          {/*Main Temp and Icon*/}
          <Box sx={{display: 'flex'}}>
            <WeatherIcon code={weather.current_weather?.weathercode} sx={{fontsize: 60}}/>
            <Typography variant="h1" fontWeight={500}>
              {Math.round(weather.current_weather?.temperature)}°
            </Typography>
          </Box>
          <Typography variant="h6" sx={{mb: 4,textTransform: 'uppercase',}}>
            {/* Fallbacok for no condition map*/}
            {iconMap[weather.current_weather?.weathercode]?.label || "Unknown condition"}
          </Typography>
          <Divider sx={{bgcolor: 'rgba(255,255,255,0.2)',mb: 2}}/>
          {/* Details Grid: Wind & Data*/}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center'}}> 
                <AirIcon sx={{opacity: 0.8}}/>
                  <Typography variant="body2" sx={{mt: 0.5}}>Wind</Typography>
                  <Typography varaint="h6">
                    {weather.current_weather?.windspeed} <span syyle={{fontsize: '0.8rem'}}>km/h</span>
                  </Typography>                
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{display:'flex', flexDirection: 'column',alignItems: 'center' }}>
                <CloudIcon sx={{opacity: 0.8}}/>
                <Typography variant="body">Code</Typography>
                <Typography variant = "h6">
                  {weather.current_weather?.weathercode}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          </CardContent>        
      </Card>
    )}
  </Container>);
}
const WeatherIcon =({code,sx}) => {  

  const config = iconMap[code] || iconMap[0];  
  return React.cloneElement(config.icon,{
    sx: {...sx,color:config.color}
  });
};

 
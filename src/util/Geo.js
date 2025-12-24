import { GEOAPIFY_KEY } from "./Config";
export async function getWeather( lat,long){
    const url = `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${long}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,precipitation_probability,weathercode` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
    `&timezone=auto`;

    const res = await fetch(url);
    if(!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json(url);

    return data;
}
export async function getLocationName(lat,long){
    const url= `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&limit=1&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error("failed to fetch real location");
    const data=await res.json( );
    return data.features[0].properties.formatted;
}
export async function getCitySuggestions(query,limit = 5){
    if(query.length <3) return[];
    const url=`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=${limit}&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error("Failed to get Suggestions");
    const data = await res.json();
    return data.features.map(f =>({
        name:f.properties.formatted,
        lat:f.properties.lat,
        long:f.properties.lon
    }));
}
export async function getAQI(lat,long){
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    url.search = new URLSearchParams({
        latitude: lat,
        longitude: long,
        hourly: "pm10,pm2+5"
    })
    const res = await fetch(url.toString());
    if(res!=ok) throw new Error("Failed to get AQI")
    const data =await res.json();
    return data;

}

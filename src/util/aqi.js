const PM25_BREAKPOINTS = [
    {cLow: 0,cHigh:50,iLow:10,iHigh:50},
    {cLow: 51,cHigh:100,iLow:10,iHigh:100},
    {cLow:101,cHigh:250,iLow:10,iHigh:200},
    {cLow: 251,cHigh:350,iLow:10,iHigh:300},
    {cLow: 351,cHigh:430,iLow:10,iHigh:400},
    {cLow: 431,cHigh:1000,iLow:10,iHigh:500},
]
const PM10_BREAKPOINTS=[
    {cLow:0,cHigh:50 ,iLow:0,iHigh:50},
    {cLow:51,cHigh:100 ,iLow:51,iHigh:100},
    {cLow:101,cHigh:250 ,iLow:101,iHigh:200},
    {cLow:251,cHigh:350 ,iLow:201,iHigh:300},
    {cLow:351,cHigh:430 ,iLow:301,iHigh:400},
    {cLow:431,cHigh:1000 ,iLow:401,iHigh:50}
]
function calculateAQI(concentration,breakpoints){
    for (const bp of breakpoints){
        if(concentration >= bp.cLow && concentration <= bp.cHigh){
            const aqi=
            ((bp.iHigh-bp.iLow)/(bp.cHigh-bp.cLow))*
            (concentration-bp.cLow)+bp.iLow;
            return Math.round(aqi);
        }        
    }
    return 500;
}
export function pm25toIAQI(pm25){
    return calculateAQI(pm25,PM25_BREAKPOINTS);    
}
export function pm10toIAQI(pm10){
    return calculateAQI(pm10,PM10_BREAKPOINTS);
}
export function calculateIndianAQI(pm25,pm10){
    const aqi25=pm25toIAQI(pm25);
    const aqi10=pm10toIAQI(pm10);
    return Math.max(aqi25,aqi10);
}
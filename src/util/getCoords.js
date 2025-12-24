export function getCoords(){
    return new Promise((resolve,reject) =>{
    navigator.geolocation.getCurrentPosition(
        pos => resolve({
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        }),
        err => reject(err)
    );
    }
    );
}
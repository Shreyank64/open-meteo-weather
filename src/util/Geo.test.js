import {describe,it,expect,vi,beforeEach} from "vitest";
import { getCitySuggestions, getLocationName, getWeather } from "./Geo";
global.fetch = vi.fn();
describe("getWeather",()=>{
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it(("returns weather data on API successs"),async () =>{
        fetch.mockResolvedValueOnce({
            ok:true,
            json: async() => ({
                current:{temperature_2m:30},
                daily:{temperature_2m_max: [32]}
            })
        });
        const result = await getWeather(22.57,88.33);

        expect(result.current.temperature_2m).toBe(30);
        expect(result.daily.temperature_2m_max[0]).toBe(32);
    });
    
    it("Throws an error when API fails",async () =>{
        fetch.mockResolvedValueOnce({
            ok:false
        });

        await expect(getWeather(22.57,88.37)).rejects.toThrow("Weather fetch failed");
    });            
    
});
describe("getLocationName",() =>{
    beforeEach(() =>{
        vi.resetAllMocks();
    });
    it("Returns location name based on Coords on API Success",async () =>{
        fetch.mockResolvedValueOnce({
            ok:true,
            json: async() =>({
                features:[
                    {
                        properties:{
                            formatted:"Kolkata,West Bengal,India",
                        }
                    }
                ]
            })
        });
        const result = await getLocationName(22.57,88.38);
        expect(result).toBe("Kolkata,West Bengal,India");
        });   

        it("Throws error when API fails",async () =>{
            fetch.mockResolvedValueOnce({
                ok: false,
            });
            await expect(
                getLocationName(22.57,88.36).rejects.toThrow("failed to fetch real location")
            ).rejects.toThrow("Failed to get real location");
        });

}
);
describe("getCitySuggestions"), () =>{
    beforeEach(() => {
        vi.resetAllMocks();
    });
    it("returns empt array if query length is less than 3"), async () =>{
        const result =await getCitySuggestions("Ko");
        expect(result).toEqual([]);
        expect(fetch).not.toHaveBeenCalled();
    };    
    it("returns city suggestions on API Success"), async () =>{
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () =>({
                features:[
                    {
                        properties:{
                            formatted: "Kolkata,West Bengal, India",
                            lat: 22.5276,
                            long: 88.3639,
                        },
                    },
                    {
                        properties:{
                            formatted: "Kolkata DIstrict,India",
                            lat: 22.6,
                            long: 88.4,
                        },
                    },
                ],
            }),
        });
        const result = await getCitySuggestions("kol");

        expect(result).toEqual([
            {
                name:"Kolkata,West Bengal,India",
                lat: 22.5726,
                long:88.3639,
            },
        ]);
    };
    it("Throws error when API fails"), async () =>{
        fetch.mockResolvedValueOnce({
            ok:false,
        });

        await expect(
            getCitySuggestions("kol")
        ).rejects.toThrow("Failed to get Suggestions");1
    };
}
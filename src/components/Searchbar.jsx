import { Autocomplete,TextField } from "@mui/material";
import { getCitySuggestions } from "../util/Geo";
export default function SearchBar({onSelect,suggestions,setSuggestions,getCitySuggestions}){
    return(<Autocomplete
    freeSolo
    options={suggestions || []}
    getOptionLabel={(option) => option.name || (typeof option === 'string' ? option: "")}
    onInputChange={async (e,val) => {
        if(val.length > 2){
            const res = await getCitySuggestions(val)
            setSuggestions(res || []);
        }
    }}
    onChange={(e,val) =>{
        if(val && typeof val !== 'string'){
            onSelect(val);
        }
    }}
    renderInput={(params) => <TextField {...params} label="Search City" margin="normal" fullWidth></TextField>}    
    />);
}
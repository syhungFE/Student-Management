import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListReponse } from "models";

export interface CityState{
    loading: boolean;
    list: City[]
}

const initialState: CityState = {
    loading: false,
    list: []
}
const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state){
            state.loading= true
        },
        fetchCityListSuccess(state,action: PayloadAction<ListReponse<City>>){
            state.loading= false;
            state.list = action.payload.data;
        },
        fetchCityListFailed(state){
            state.loading= false
        }
    }
})

// actions
export const cityActions = citySlice.actions;

//selectors
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList,(cityList) =>
    cityList.reduce((map: {[key: string] : City },city) => {
        map[city.code] = city;
        return map;
    },{})
);
export const selectCityOptions = createSelector(selectCityList, (cityList) => 
    cityList.map(city => ({
        label : city.name,
        value: city.code
    }))
)

//reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
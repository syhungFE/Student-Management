import cityApi from "api/cityApi";
import { City, ListReponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";


function* fetchCityList(){
    try {
        const response: ListReponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(response));
    } catch (error) {
        console.log('Failed to fetch city list data', error.message);
        yield put(cityActions.fetchCityListFailed);
    }
}
export default function* citySaga(){
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
};
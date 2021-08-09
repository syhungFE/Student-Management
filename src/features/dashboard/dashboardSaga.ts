import cityApi from "api/cityApi";
import studentApi from "api/studentApi";
import { City, ListReponse, Student } from "models";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, GenderbyCity, RankingByCity } from "./dashboardSlice";


function* fetchStatistics(){
    const responseList: Array<ListReponse<Student>> = yield all([
        call(studentApi.getAll, {_page: 1, _limit: 1, gender: 'male'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, gender: 'female'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, mark_gte: '8'}),
        call(studentApi.getAll, {_page: 1, _limit: 1, mark_lte: '5'}),
    ]);

    const statistics = responseList.map((num) => num.pagination._totalRows);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statistics;
    yield put(
        dashboardActions.setStatistics({maleCount, femaleCount, highMarkCount, lowMarkCount})
    );
};
function* fetchHighestStudentList(){
    const {data}: ListReponse<Student> = yield call(studentApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc'
    });

    yield put(dashboardActions.setHighestStudentList(data));
};
function* fetchLowestStudentList(){
    const {data}: ListReponse<Student> = yield call(studentApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc'
    });

    yield put(dashboardActions.setLowestStudentList(data));
};
function* fetchRankingByCityList(){
    // fetch city list
    const {data: cityList }: ListReponse<City> = yield call(cityApi.getAll);
    // fetch student ranking list per city
    const callList = cityList.map((city) => 
        call(studentApi.getAll,{
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            city: city.code
        })
    )
    const responseList: Array<ListReponse<Student>> = yield all(callList); 
    const rankingByCityList: Array<RankingByCity> = responseList.map((city,idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: city.data
    }))
    // update state
    yield put(dashboardActions.setRankingByCityList(rankingByCityList));
};
function* fetchChartGenderByCity(){
    // fetch city list
    const {data: cityList}: ListReponse<City> = yield call(cityApi.getAll);

    // fetch student gender list per city
    const callList = cityList.map((city,idx) => 
        call(studentApi.getAll,{
            city: city.code
        })
    );
    const responseList: Array<ListReponse<Student>> = yield all(callList);
    const genderbyCityList: Array<GenderbyCity> = responseList.map((arr, idx) => {
        let maleCountPerCity = 0;
        let femaleCountPerCity = 0;
        arr.map((student) => student.gender === 'male' ? maleCountPerCity++ : femaleCountPerCity++);
        return{
            name: cityList[idx].name,
            male: maleCountPerCity,
            female : femaleCountPerCity
        };
    })
    // update state
    yield put(dashboardActions.setGenderbyCityList(genderbyCityList));
}
function* fetchDashboardData(){
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList),
            call(fetchChartGenderByCity),
        ]);  
        yield put(dashboardActions.fetchDataSuccess()); 
    } catch (error) {
        console.log('Failed to fetch dashboard data, ', error);
        yield put(dashboardActions.fetchDataFailed());
    };
};

export default function* dashboardSaga(){
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
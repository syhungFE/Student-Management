import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListReponse, Student } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>){
    try{
        const studentList: ListReponse<Student> = yield call(studentApi.getAll,action.payload);
        yield put(studentActions.fetchStudentListSuccess(studentList));
    }catch(error){
        console.log('Failed to fetch student data list', error.message );
        yield put(studentActions.fetchStudentListFailed);
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>){
    yield put(studentActions.setFilter(action.payload));
}
export default function* studentSaga(){
    // watch fetch student action
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

    yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
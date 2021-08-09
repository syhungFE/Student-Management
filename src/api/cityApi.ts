import { City, ListReponse } from "models";
import axiosClient from "./axiosClient";

const cityApi = {
    getAll(): Promise<ListReponse<City>> {
        let url = '/cities';
        return axiosClient.get(url, {
            params:{
                _limit: 50,
                _page: 1
            }
        });
    }
};

export default cityApi;
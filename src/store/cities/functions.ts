import {syncCity} from "./index";
import {cities} from "../../assets/city";
import {Fetch} from "../../utils/fetch";
import {Core} from "../../global";
import {RawWeather} from "./types";

export const fetchCities = () => {
    syncCity(cities)
};

export const getCityWeather = async (latitude: number, longitude: number) => {
    const {data} = await Fetch.get<{data: RawWeather}>('/weather', {
        params: {
            lat: latitude,
            lon: longitude,
            appid: Core.weatherApiKey
        }
    });
    return data
};

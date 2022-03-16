import {syncCity} from "./index";
import {cities} from "../../assets/city";

export const fetchCities = () => {
    syncCity(cities)
}

import axios from "axios";

/**
 * @todo fix CORS Error
 */
const CORS_PROXY = "https://secret-ocean-49799.herokuapp.com/";
const URL_BASE = "https://apis.data.go.kr/1262000"
const API_KEY = "1HqQsk9JgpGx29U%2F2VMPYojay5U9cheEG87oJLzIMU0IkGbc5i3B6h%2FS%2BP6r0gg2oK6%2FRmmWzvQ9GXJiu%2F36lA%3D%3D"

export const getCountryFlag = async (page) => {
    try {
        const { data } = await axios({
            method: "get",
            url: CORS_PROXY + URL_BASE + "/CountryFlagService2/getCountryFlagList2",
            params: {
                ServiceKey: API_KEY,
                returnType: "JSON",
                numOfRows: 10,
                pageNo: page
            }
        })
        // data.setHeader('Access-Control-Allow-origin', '*');
        console.log(data)
        return data
    } catch (error) {
        throw Error(error)
    }
}
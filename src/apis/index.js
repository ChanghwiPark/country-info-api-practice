import axios from "axios";

export const getCountryFlag = async (page, numOnPage) => {
    const API_URL_BASE = process.env.REACT_APP_API_URL_BASE
    const FLAG_API_KEY = process.env.REACT_APP_FLAG_API_KEY

    try {
        const { data } = await axios({
            method: "get",
            url: API_URL_BASE + "/CountryFlagService2/getCountryFlagList2",
            params: {
                ServiceKey: FLAG_API_KEY,
                returnType: "JSON",
                numOfRows: { numOnPage },
                pageNo: page
            }
        })
        // const countryCode = data.country_iso_alp2
        return data
    } catch (error) {
        throw Error(error)
    }
}
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import InfoTable from './InfoTable'
import { useRecoilValue } from 'recoil'
import { pageState, numOnPageState } from '../recoil/Country'

export default function CountryItem({ countryName, countryFlag }) {
    const page  = useRecoilValue(pageState)
    const numOnPage = useRecoilValue(numOnPageState)
    const [clicked, setClicked] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const API_URL_BASE = process.env.REACT_APP_API_URL_BASE
    const INFO_API_KEY = process.env.REACT_APP_INFO_API_KEY
    // console.log("INFO_API_KEY", INFO_API_KEY)

    const getInfoURL = `${API_URL_BASE}/OverviewGnrlInfoService/getOverviewGnrlInfoList?serviceKey=${INFO_API_KEY}&numOfRows=197&pageNo=1&cond[country_nm::EQ]=${countryName}`
    // console.log("getInfoURL", getInfoURL)

    const [info, setInfo] = useState({})

    const getInfo = async () => {
        try {
            console.log()
            const { data } = await axios({
                method: 'get',
                url: getInfoURL
            })
            console.log(data.data[0])
            setClicked(true)
            setShowMore(true)
            setInfo(data.data[0])
        } catch (error) {
            alert(error)
        }
    }

    return (
        <CountryItemContainer onClick={() => setClicked(!clicked)}>
            {
                clicked ?
                    <div className='containerDescription'>
                        <h2>{countryName}</h2>
                        {
                            showMore ?
                                info ?
                                    <InfoTable
                                        infoObject={info}
                                    />
                                    : <Alert>no info</Alert>
                            :
                            <a onClick={getInfo}>show more</a>
                        }
                    </div>
                    :
                    <img src={countryFlag} alt="" />
            }
        </CountryItemContainer>
    )
}


const CountryItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 350px;
    padding: 16px;

    .containerDescription{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            width: 100%;
            text-align: center;
            font-size: 24px;
            font-weight: 900;
            background: #d6e8ff;
            border-radius: 17px;
            padding: 0px 8px;
        }

        a {
            z-index: 99;
        }
    }

    img {
        width: 100%;
    }
`

const Alert = styled.div`
    color: #b00000;
    font-size: 18px;
`
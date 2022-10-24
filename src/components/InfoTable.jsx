import React from 'react'
import styled from 'styled-components'

export default function InfoTable({ infoObject : info }) {
    /**
     * 모듈
     * local state
     * global state
     * useEffect
     * function
     */

    return (
        <Table>
            <thead>
                <tr>
                    <th colSpan="2">기본 정보</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>영문 국가명</td>
                    <td>{info.country_eng_nm}</td>
                </tr>
                <tr>
                    <td>수도</td>
                    <td>{info.capital}</td>
                </tr>
                <tr>
                    <td>인구</td>
                    <td>{info.population}{info.population_desc}</td>
                </tr>
                <tr>
                    <td>면적</td>
                    <td>{info.area}{info.area_desc}</td>
                </tr>
                <tr>
                    <td>언어</td>
                    <td>{info.lang}</td>
                </tr>
                <tr>
                    <td>종교</td>
                    <td>{info.religion}</td>
                </tr>
                <tr>
                    <td>민족</td>
                    <td>{info.ethnic}</td>
                </tr>
                <tr>
                    <td>기후</td>
                    <td>{info.climate}</td>
                </tr>
                <tr>
                    <td>건국</td>
                    <td>{info.establish}</td>
                </tr>
            </tbody>
        </Table>
    )
}

const Table = styled.table`
    tbody td:first-child{
        width: 6em;
    }
    tbody td:not(:first-child){
        padding-left: 8px;
    }
    td, tr {
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
`
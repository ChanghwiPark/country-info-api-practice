import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryItem from "./components/CountryItem";
import { Pagination } from 'antd';
import { getCountryFlag } from "./apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { pageState, numOnPageState } from "./recoil/Country";

export default function App() {
  const [page, setPage] = useRecoilState(pageState)
  const numOnPage = useRecoilValue(numOnPageState)
  const [total, setTotal] = useState(1)
  const [query, setQuery] = useState('')
  const [countryItems, setCountryItems] = useState([])

  const { data, error, isLoading } = useQuery(['country', page], () => getCountryFlag(page, numOnPage), {
    onSuccess: (response) => {
      console.log("response", response)
      setPage(response.pageNo)
      setTotal(response.totalCount)
      setCountryItems(response.data)
    }
  })
  
  const filteredCountryItems = countryItems.filter(items => (items.country_nm.toLowerCase().includes(query.toLowerCase())))

  if (isLoading){
    return <div>Give me a few seconds...</div>
  }
    

  if (error instanceof Error){
    return <h2><span>{error.message}</span></h2>
  }


  return (
    <AppContainer>
      <SearchBarContainer>
        <input 
          type='search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </SearchBarContainer>
      <Main>
        {
          filteredCountryItems.map((item) => (
            <CountryItem
              countryName={item.country_nm}
              countryFlag={item.download_url}
            />
          ))
        }
      </Main>
      <PaginationContainer>
        <Pagination
          defaultCurrent={page}
          total = {total}
          defaultPageSize={20}
          onChange = {(page) => setPage(page)}
        />
      </PaginationContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
`

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  
  input {
    padding: 12px 20px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 17px;
    font-size: 18px;
    font-weight: 900;
  }
`

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
`

const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px
`
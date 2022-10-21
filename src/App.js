import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryItem from "./components/CountryItem";
import { Pagination } from 'antd';
import { getCountryFlag } from "./apis";

export default function App() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const { data, error, isLoading } = useQuery(['country', page], () => getCountryFlag(page), {
    onSuccess: (response) => {
      setTotal(response.totalCount) // @todo 어디서 온 건지 공부
    }
  })

  if (isLoading){
    return <div>Give me a few seconds...</div>
  }
    

  if (error instanceof Error){
    return <span>{error.message}</span>
  }


  return (
    <AppContainer>
      <SearchBarContainer>

      </SearchBarContainer>
      <Main>
        {
          data.data.map((item) => (
            <CountryItem
              countryName={item.country_nm}
            />
          ))
        }
      </Main>
      <Pagination
        defaultCurrent={page}
        total = {total}
        onChange = {(page) => setPage(page)}
      />
    </AppContainer>
  );
}

const AppContainer = styled.div`

`

const SearchBarContainer = styled.div`

`

const Main = styled.main`

`
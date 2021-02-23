import styled from "@emotion/styled"
import { useProject } from "hooks/project"
import React, { useState } from "react"
import { useDebounce, useMount } from "utils/customHooks"
import useRequest from "utils/http"
import { List } from "./list"
import { SearchPanel } from "./search-panel"

export const HomeContainer = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: "",
        personId: "",
    })
    const debouncedParam = useDebounce(param, 200);
    const { data: list, isLoading } = useProject(debouncedParam)
    const Request = useRequest()
    useMount(() => {
        Request('users').then(setUsers)
    })

    return <Container>
        <SearchPanel users={users} setParam={setParam} param={param}></SearchPanel>
        <List users={users} dataSource={list || []} loading={isLoading} />
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;

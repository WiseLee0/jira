import styled from "@emotion/styled"
import { useAuth } from "auth/auth-context"
import React, { useEffect, useState } from "react"
import { cleanObj } from "utils"
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
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)
    const Request = useRequest()
    useMount(() => {
        Request('users').then(setUsers)
    })
    const debouncedParam = useDebounce(param, 200);
    useEffect(() => {
        Request("projects", { data: cleanObj(debouncedParam) })
            .then(setList)
            .finally(() => setLoading(false))
    }, [debouncedParam]);

    return <Container>
        <SearchPanel users={users} setParam={setParam} param={param}></SearchPanel>
        <List users={users} dataSource={list} loading={loading} />
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;

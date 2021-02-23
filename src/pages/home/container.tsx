import styled from "@emotion/styled"
import { useProject } from "hooks/project"
import { useUsers } from "hooks/users"
import React, { useState } from "react"
import { useDebounce } from "utils/customHooks"
import { List } from "./list"
import { SearchPanel } from "./search-panel"

export const HomeContainer = () => {
    const [param, setParam] = useState({
        name: "",
        personId: "",
    })
    const debouncedParam = useDebounce(param, 200);
    const { data: list, isLoading } = useProject(debouncedParam)
    const { data: users } = useUsers()

    return <Container>
        <SearchPanel users={users || []} setParam={setParam} param={param}></SearchPanel>
        <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;

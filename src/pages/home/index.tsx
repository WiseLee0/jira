import styled from "@emotion/styled";
import { HomeContainer } from "./container";
import { HomeHeader } from "./header"

export const HomePage = () => {
    return <Container>
        <HomeHeader></HomeHeader>
        <HomeContainer />
    </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

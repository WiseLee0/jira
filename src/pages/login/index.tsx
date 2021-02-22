import React, { useState } from "react"
import { LoginView } from "./login"
import { RegisterView } from "./register"
import styled from '@emotion/styled'
import { Button, Card, Divider } from "antd"
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(true)
    return <div>
        <Container>
            <Header />
            <Background />
            <ShadowCard>
                {isRegister ? <LoginView /> : <RegisterView />}
                <Divider />
                <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
                </Button>
            </ShadowCard>
        </Container>
    </div>
}

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 36rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Container = styled.div`
display: flex;
flex-direction: column;
align-items:center;
min-height:100vh;
`
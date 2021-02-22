import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { useAuth } from "auth/auth-context";
import { logout } from "auth/auth-provider";
import React from "react";
import { Row } from "utils/style";
export const HomeHeader = () => {
    const { user } = useAuth()
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
            <h2>项目</h2>
            <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item key={"logout"}>
                            <a onClick={logout}>登出</a>
                        </Menu.Item>
                    </Menu>
                }
            >
                <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
            </Dropdown>
        </HeaderRight>
    </Header>
}



// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
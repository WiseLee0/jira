import styled from "@emotion/styled"
import { Spin, Typography } from "antd"
import { DevTools } from "jira-dev-tool"

export const FullPageLoading = () => {
    return <FullPage>
        <Spin size="large"></Spin>
    </FullPage>
}

export const FullPageError = ({ error }: { error: Error }) => {
    return <FullPage>
        <DevTools></DevTools>
        <Typography.Text type="danger">{error.message}</Typography.Text>
    </FullPage>
}

const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
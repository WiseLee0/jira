import { Button, Form, Input } from "antd"
import { useAuth } from "auth/auth-context"
import React from "react"

export const RegisterView = () => {
    const { register } = useAuth()
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        register({
            username,
            password
        })
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item
            name={"username"}
            rules={[{ required: true, message: "请输入用户名" }]}
        >
            <Input placeholder={"用户名"} type="text" id={"username"} />
        </Form.Item>
        <Form.Item
            name={"password"}
            rules={[{ required: true, message: "请输入密码" }]}
        >
            <Input placeholder={"密码"} type="password" id={"password"} />
        </Form.Item>
        <Form.Item
            name={"cpassword"}
            rules={[{ required: true, message: "请确认密码" }]}
        >
            <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
        </Form.Item>
        <Form.Item>
            <Button htmlType={"submit"} type={"primary"}>
                注册
            </Button>
        </Form.Item>
    </Form>
}
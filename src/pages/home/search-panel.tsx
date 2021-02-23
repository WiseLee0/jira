import { Form, Input, Select } from "antd";
import type { Project } from './list'
export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: number;
    };
    setParam: (param: SearchPanelProps["param"]) => void;
}
const { Option } = Select;
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return (
        <Form layout={"inline"}>
            <Form.Item>
                <Input
                    placeholder={"项目名"}
                    type="text"
                    value={param.name}
                    onChange={(evt) =>
                        setParam({
                            ...param,
                            name: evt.target.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <Select
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value={""}>负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};
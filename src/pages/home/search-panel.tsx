import { Form, Input, Select } from "antd";
import { IdSelect } from "components/id-select";
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
    param: Partial<Pick<Project, 'personId' | 'name'>>
    setParam: (param: SearchPanelProps["param"]) => void;
}
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
                <IdSelect
                    value={param.personId}
                    options={users || []}
                    defaultOptionName="负责人"
                    onChange={value => {
                        setParam({
                            ...param,
                            personId: value
                        })
                    }}
                />
            </Form.Item>
            <div> {
                param.personId
            }</div>
        </Form>

    );
};
import { Table, TableProps } from "antd";
import React from "react";
import type { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { SingleStar } from "components/single-star";
import { useEditProject } from "hooks/project";

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
    const { editProject } = useEditProject()
    const onEditProject = (id: number) => (pin: boolean) => editProject({ id, pin })
    return (
        <Table
            rowKey={"id"}
            pagination={false}
            columns={[
                {
                    title: <SingleStar checked={true}></SingleStar>,
                    render: (value, project) => {
                        return <SingleStar checked={project.pin} onCheckedChange={onEditProject(project.id)}></SingleStar >
                    }
                },
                {
                    title: "名称",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render: (value, project) => {
                        return <Link to={project.id.toString()}>{project.name}</Link>
                    }
                },
                {
                    title: "部门",
                    dataIndex: "organization",
                },
                {
                    title: "负责人",
                    render(value, project) {
                        return (
                            <span>
                                {users.find((user) => user.id == project.personId)?.name ||
                                    "未知"}
                            </span>
                        );
                    },
                },
                {
                    title: "创建时间",
                    render(value, project) {
                        return (
                            <span>
                                {project.created
                                    ? dayjs(project.created).format("YYYY-MM-DD")
                                    : "无"}
                            </span>
                        );
                    },
                },
            ]}
            {...props}
        />
    );
}
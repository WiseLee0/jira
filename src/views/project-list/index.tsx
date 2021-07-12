import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { urlString } from "../../utils";
import {
  useDebounce,
  useMount,
  useUrlQueryParams,
} from "../../common/customHook";
import { useHttp } from "../../common/http";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectList = () => {
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);
  const [param, setParam] = useUrlQueryParams<"name" | "personId">(["name"]);
  const [deParam] = useDebounce(param);
  useEffect(() => {
    setParam(param);
  }, [deParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { urlString } from "../../utils";
import { useDebounce, useMount } from "../../utils/customHook";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [deParam] = useDebounce(param);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${urlString(param)}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
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

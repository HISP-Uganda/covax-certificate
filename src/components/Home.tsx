import { Input, Select } from 'antd';
import { useEffect, useState } from "react";
import { useD2 } from "../Context";
import { useProgram } from '../Queries';
import TrackedEntityInstances from "./TrackedEntityInstances";

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [attribute, setAttribute] = useState<string>('');
  const d2 = useD2();
  const search = (value: string) => {
    setQuery(value);
  }

  const {
    isLoading,
    isError,
    error,
    data
  } = useProgram(d2);

  const onSelect = (value: string) => {
    setAttribute(value);
  }

  if (isLoading) {
    return <div>Is Loading</div>
  }

  if (isError) {
    return <div>
      {error.message}
    </div>
  }

  const selectBefore = (
    <Select style={{ width: 300 }} onChange={onSelect} value={attribute}>
      {data && data.attributes.map((a: any) => <Option key={a.id} value={a.id}>{a.name}</Option>)}
    </Select>
  );
  return (
    <div>
      <Search
        addonBefore={selectBefore}
        size="large"
        placeholder="input search text"
        allowClear={true}
        onSearch={search}
        style={{ width: "100%", marginBottom: 20 }}
      />
      {query !== '' && <TrackedEntityInstances query={query} ou={data.units} attribute={attribute} />}
    </div>
  )
}

export default Home

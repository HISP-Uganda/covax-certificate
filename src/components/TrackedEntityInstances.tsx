import { Card, Pagination, Table } from 'antd';
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { useD2 } from "../Context";
import { PROGRAM, useInstances } from "../Queries";
import ColumnDrawer from './ColumnDrawer';

interface SearchResultsProps { query: string, ou: string, attribute: string }

const TrackedEntityInstances: FC<SearchResultsProps> = ({ query, ou, attribute }) => {
  const d2 = useD2();
  const history = useHistory();
  const [columns, setColumns] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
  } = useInstances(d2, page, pageSize, query, ou, attribute);

  const onChange = (p: number, ps: number) => {
    setPage(p);
    if (ps !== pageSize) {
      setPageSize(ps);
      setPage(1);
    }
  }

  if (isLoading) {
    return <div>Is Loading</div>
  }
  if (isError) {
    return <div>
      {error.message}
    </div>
  }

  return (
    <div>
      {data && <div>
        <Card title="Tracked Entity Instances" extra={<ColumnDrawer program={PROGRAM} setColumns={setColumns} headers={data.headers} />} bodyStyle={{ padding: 0 }}>
          <Table
            tableLayout="auto"
            loading={isFetching}
            rowKey={(record: any) => record[0]}
            columns={columns}
            dataSource={data.rows}
            pagination={false}
            rowClassName={(record, index: number) => index % 2 === 0 ? 'even' : 'odd'}
            onRow={(record: any[]) => {
              return {
                onClick: () => {
                  history.push({ pathname: `/instances/${record[0]}` })
                },
              };
            }}
          />
        </Card>
        <div style={{ padding: 5, textAlign: 'right' }}><Pagination current={page} onChange={onChange} total={data.metaData.pager.total} pageSize={pageSize} showSizeChanger={true} /></div>
      </div>}
    </div>
  )
}

export default TrackedEntityInstances

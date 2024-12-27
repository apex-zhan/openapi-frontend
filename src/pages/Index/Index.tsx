import { listInterfaceInfoByPageUsingGet } from '@/services/openapi-backend/interfaceInfoController';
import { ProList } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = 8) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProList
      rowKey="name"
      headerTitle="接口列表"
      loading={loading}
      dataSource={list}
      pagination={{
        pageSize: 6,
        total,
        onChange(page, pageSize) {
          loadData(page, pageSize);
        },

        showTotal: (total) => `共 ${total} 条`,
      }}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'name',
          title: '接口名称',
        },
        description: {
          dataIndex: 'description',
          search: false,
        },
        actions: {
          render: (text, row) => [
            <a href={`/interface/${row.id}`} key="row.id">
              查看
            </a>,
          ],
          search: false,
        },
      }}
    />
  );
};
export default Index;

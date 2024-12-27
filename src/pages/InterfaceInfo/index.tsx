import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost,
} from '@/services/openapi-backend/interfaceInfoController';
import { PageContainer, ProCard, ProDescriptions, ProForm } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Divider, Input, message } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 在线调用接口
   */
  const handleInvoke = debounce(async (values: any) => {
    try {
      if (!params.id) {
        message.error('接口不存在');
        return;
      }
      setInvokeLoading(true);
      const res = await invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values,
      });
      //结果回显出来，InvokeRes来存储结果
      setInvokeRes(res.data);
      if (res.data) {
        message.success('请求成功');
      }
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    } finally {
      setInvokeLoading(false);
    }
  }, 300);

  return (
    <PageContainer title="查看接口文档">
      <ProCard>
        {data ? (
          <ProDescriptions title={data.name} column={1}>
            <ProDescriptions.Item label="接口状态">
              {data.status ? '开启' : '关闭'}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="描述">{data.description}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求地址">{data.url}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求方法">{data.method}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求参数">{data.requestParams}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求头">{data.requestHeader}</ProDescriptions.Item>
            <ProDescriptions.Item label="响应头">{data.responseHeader}</ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间">{data.createTime}</ProDescriptions.Item>
            <ProDescriptions.Item label="更新时间">{data.updateTime}</ProDescriptions.Item>
          </ProDescriptions>
        ) : (
          <>接口不存在</>
        )}
      </ProCard>
      <Divider />
      <ProCard title="在线测试">
        <ProForm name="invoke" layout="vertical" onFinish={handleInvoke}>
          <ProForm.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </ProForm.Item>
          <ProForm.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit" loading={invokeLoading}>
              调用
            </Button>
          </ProForm.Item>
        </ProForm>
      </ProCard>
      <Divider />
      <ProCard title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </ProCard>
    </PageContainer>
  );
};

export default Index;

import {listTopInvokeInterfaceInfoUsingGet} from '@/services/openapi-backend/analysisController';
import {PageContainer} from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';

/**
 * 接口分析
 * @returns
 */
const Index: React.FC = () => {
  // 使用useState初始化数据和加载状态
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  // 使用useEffect来处理副作用，例如数据的获取和加载状态的更新
  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGet().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (e: any) {
    }
    // todo 从远程获取数据
  }, []);
  // 映射：例子{ value: 1048, name: 'Search Engine' },
  const chartData = data.map((item) => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });

  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer title="接口分析">
      <ReactECharts loadingOption={{showLoading: loading}} option={option}/>
    </PageContainer>
  );
};

export default Index;

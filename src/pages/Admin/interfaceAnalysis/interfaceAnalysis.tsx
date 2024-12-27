import { PageContainer } from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
/**
 * 接口分析
 * @returns
 */
const InterfaceAnalysis: React.FC = () => {
  // 使用useState初始化数据和加载状态
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // 使用useEffect来处理副作用，例如数据的获取和加载状态的更新
  useEffect(() => {
    //todo 从远程获取数据
    try {

    } catch (error) {

    }

  }, []);

  const option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
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
        //数据
        data: [],
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
      <ReactECharts loadingOption={{ showLoading: loading }} option={option} />
    </PageContainer>
  );
};

export default InterfaceAnalysis;

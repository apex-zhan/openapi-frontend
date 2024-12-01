import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef} from 'react';
import {Modal} from "antd";
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;
export type Props = {
  values?: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const {values, columns, visible, onCancel, onSubmit} = props;
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    formRef.current?.setFieldsValue(values);
  }, [values])
  return <Modal open={visible} onCancel={() => onCancel()} footer={null}>
    <ProTable type={"form"} columns={columns}
              formRef={formRef}  // 表单的初始值
              onSubmit={async (value) => {
                onSubmit(value);
              }}/>
  </Modal>

};
export default UpdateModal;

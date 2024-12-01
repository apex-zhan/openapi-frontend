import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {Modal} from "antd";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;
export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const {columns, visible, onCancel, onSubmit} = props;
  return <Modal open={visible} onCancel={() => onCancel()} footer={null}>
    <ProTable type={"form"} columns={columns} onSubmit={async (value) => {
      onSubmit(value);
    }}/>
  </Modal>

};
export default CreateModal;

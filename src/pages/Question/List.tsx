import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StandardTable from '../../components/StandardTable';
import { ConnectProps, ConnectState } from '@/models/connect';
import { DataList } from '../../models/userInfoAddress';

const columns = [
  {
    title: '用服务器实例名/参数',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '备注名',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: '计费类型',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '调血服务号数',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '操作',
    render: () => <div>删除</div>,
  },
];

interface IProps extends ConnectProps {
  data?: DataList;
}

interface IState {
  loading: boolean;
  modalVisible: boolean;
  pageInfo: {
    pageSize: number;
    pageNum: number;
  };
}

class Address extends Component<IProps, IState> {
  state = {
    loading: false,
    modalVisible: false,
    pageInfo: {
      pageSize: 10,
      pageNum: 1,
    },
  };

  componentDidMount() {
    // this.initData()
  }

  handleTriggerModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleSubmitModal = () => {
    this.handleTriggerModal();
  };

  handleSelectRows() {
    this.handleTriggerModal();
  }

  initData(params?: object) {
    const { dispatch } = this.props;
    const { pageInfo } = this.state;
    if (dispatch) {
      dispatch({
        type: 'userInfoAddress/fetch',
        payload: {
          ...params,
          ...pageInfo,
        },
      });
    }
  }

  render() {
    const { data } = this.props;
    const { loading } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <StandardTable
            columns={columns}
            data={data || []}
            loading={loading}
            onChangeCombine={(params: object) => this.initData(params)}
            onSelectRow={this.handleSelectRows}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ userInfoAddress }: ConnectState) => ({ data: userInfoAddress.data }))(
  Address,
);

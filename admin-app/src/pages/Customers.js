import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../app/features/auth/authSlice';
const Customers = () => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
  ];
  const dataTable = [];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.auth);
  for (let i = 0; i < listUser?.length; i++) {
    if (listUser[i].role !== 'admin') {
      dataTable.push({
        id: i,
        name: listUser[i].firstname + ' ' + listUser[i].lastname,
        email: listUser[i].email,
        mobile: listUser[i].mobile,
      });
    }
  }
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Customers</h3>
      <div>
        <Table
          columns={columns}
          dataSource={dataTable}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};

export default Customers;

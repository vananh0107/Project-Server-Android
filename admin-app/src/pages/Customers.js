import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { delegate, getAllUser } from '../app/features/auth/authSlice';
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
      title: 'Role',
      dataIndex: 'role',
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
  const setRole = (e, i) => {
    const data = { id: i, data: { role: e } };
    console.log(data)
    dispatch(delegate(data));
  };
  for (let i = 0; i < listUser?.length; i++) {
    if (listUser[i].role !== 'admin') {
      dataTable.push({
        id: i,
        name: listUser[i].firstname + ' ' + listUser[i].lastname,
        email: listUser[i].email,
        role:(
          <>
            <select
              name=""
              defaultValue={
                listUser[i].role ? listUser[i].role : 'user'
              }
              className="form-control form-select"
              id=""
              onChange={(e) => setRole(e.target.value, listUser[i]._id)}
            >
              <option value="user"  selected>
                User
              </option>
              <option value="subadmin">SubAdmin</option>
            </select>
          </>
        ),
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

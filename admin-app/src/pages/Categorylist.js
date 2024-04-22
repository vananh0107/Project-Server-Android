import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteCategory,
  getAllCategory,
} from '../app/features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Categorylist = () => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  const dispatch = useDispatch();
  const { listCategory } = useSelector((state) => state.product);
  const dataTable = [];
  for (let i = 0; i < listCategory?.length; i++) {
    dataTable.push({
      key: i,
      id: listCategory[i]._id,
      name: listCategory[i].name,
      action: (
        <>
          <Link to={`${listCategory[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listCategory[i]._id);
            }}
            className="fs-3 text-danger ms-3 bg-transparent border-0 mx-4"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleRemove = (categoryId) => {
    setOpen(false);
    dispatch(deleteCategory(categoryId));
    setTimeout(() => {
      dispatch(getAllCategory());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Category List</h3>
      <div>
        <Table
          columns={columns}
          dataSource={dataTable}
          rowSelection={rowSelection}
        />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleRemove(categoryId);
        }}
        title="Are you sure want to delete this brand"
      />
    </div>
  );
};

export default Categorylist;

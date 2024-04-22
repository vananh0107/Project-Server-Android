import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import {
  deleteOrder,
  getAllOrder,
  updateOrder,
} from '../app/features/order/OrderSlice';
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
const Order = () => {
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },

    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },

    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, data: { status: e } };
    dispatch(updateOrder(data));
  };
  const dataTable = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  const listOrder = useSelector((state) => state.order?.listOrder);
  for (let i = 0; i < listOrder?.length; i++) {
    dataTable.push({
      key: i + 1,
      name: listOrder[i].user.firstname + ' ' + listOrder[i].user.lastname,
      price: listOrder[i].totalPriceAfterDiscount,
      product: (
        <Link to={`/admin/enquiries/${listOrder[i]._id}`}>View Order</Link>
      ),
      date: new Date(listOrder[i].paidAt)
        .toLocaleDateString()
        .toString()
        .replace('GMT+0700 (Indochina Time)', ''),
      status: (
        <>
          <select
            name=""
            defaultValue={
              listOrder[i].orderStatus ? listOrder[i].orderStatus : 'Submitted'
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, listOrder[i]._id)}
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Resolved">Resolved</option>
          </select>
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
  const [enqId, setenqId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const handleRemove = (brandId) => {
    setOpen(false);
    dispatch(deleteOrder(brandId));
    setTimeout(() => {
      dispatch(getAllOrder());
    }, 100);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4">Order</h3>
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
          handleRemove(enqId);
        }}
        title="Are you sure want to delete this brand"
      />
    </div>
  );
};

export default Order;

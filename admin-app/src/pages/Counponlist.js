import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { deleteCoupon, getAllCoupon } from '../app/features/coupon/couponSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Counponlist = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  useEffect(() => {
    dispatch(getAllCoupon());
  }, []);
  const dispatch = useDispatch();
  const { listCoupon } = useSelector((state) => state.coupon);
  const dataTable = [];
  for (let i = 0; i < listCoupon?.length; i++) {
    const date = new Date(listCoupon[i].expiry.toLocaleString());
    dataTable.push({
      key: i,
      id: listCoupon[i]._id,
      name: listCoupon[i].name,
      expiry: date.toString().replace('GMT+0700 (Indochina Time)', ''),
      discount: listCoupon[i].discount,
      action: (
        <>
          <Link to={`${listCoupon[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listCoupon[i]._id);
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
  const [couponId, setCouponId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleRemove = (couponId) => {
    setOpen(false);
    dispatch(deleteCoupon(couponId));
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Coupon List</h3>
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
          handleRemove(couponId);
        }}
        title="Are you sure want to delete this brand"
      />
    </div>
  );
};

export default Counponlist;

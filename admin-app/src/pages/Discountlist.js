import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { deleteDiscount, getAllDiscount } from '../app/features/discount/discountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Discountlist = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
    },
    {
      title: 'Start date',
      dataIndex: 'start_date',
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  useEffect(() => {
    dispatch(getAllDiscount());
  }, []);
  const dispatch = useDispatch();
  const { listDiscount } = useSelector((state) => state.discount);
  const dataTable = [];
  for (let i = 0; i < listDiscount?.length; i++) {
    const start_date = new Date(listDiscount[i].start_date?.toLocaleString()).toString().split(" ");
    const end_date = new Date(listDiscount[i].end_date?.toLocaleString()).toString().split(" ");
    dataTable.push({
      key: i,
      id: listDiscount[i]._id,
      code: listDiscount[i].code,
      start_date: `${start_date[1]} ${start_date[2]} ${start_date[3]}`,
      end_date: `${end_date[1]} ${end_date[2]} ${end_date[3]}`,
      percentage: listDiscount[i].percentage,
      action: (
        <>
          <Link to={`${listDiscount[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listDiscount[i]._id);
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
    dispatch(deleteDiscount(couponId));
    setTimeout(() => {
      dispatch(getAllDiscount());
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

export default Discountlist;

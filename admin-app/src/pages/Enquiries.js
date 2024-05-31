import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import {
  deleteEnquiry,
  getAllEnquiry,
  updateAEnquiry,
} from '../app/features/enquiry/EnquirySlice';
import { Link } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
const Enquiries = () => {
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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Staus',
      dataIndex: 'status',
    },

    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, data: { status: e } };
    dispatch(updateAEnquiry(data));
  };
  const dataTable = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEnquiry());
  }, []);
  const listEnquiry = useSelector((state) => state.enquiry?.listEnquiry);
  console.log(listEnquiry);
  for (let i = 0; i < listEnquiry?.length; i++) {
    dataTable.push({
      key: i + 1,
      name: listEnquiry[i].user.firstname,
      email: listEnquiry[i].user.email,
      mobile: listEnquiry[i].user.mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              listEnquiry[i].orderStatus
                ? listEnquiry[i].orderStatus
                : 'Submitted'
            }
            className="form-control form-select"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, listEnquiry[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link
            className="ms-3 fs-3"
            to={`/admin/enquiries/${listEnquiry[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(listEnquiry[i]._id)}
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
  const [enqId, setenqId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const handleRemove = (brandId) => {
    setOpen(false);
    dispatch(deleteEnquiry(brandId));
    setTimeout(() => {
      dispatch(getAllEnquiry());
    }, 100);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4">Enquiries</h3>
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
        title="Are you sure want to delete this order"
      />
    </div>
  );
};

export default Enquiries;

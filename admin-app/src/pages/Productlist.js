import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getAllCategory,
  getAllProduct,
} from '../app/features/product/productSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModel from '../components/CustomModel';
const Productlist = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state) => state.product);
  const { listCategory } = useSelector((state) => state.product);
  const dataTable = [];
  for (let i = 0; i < listProduct?.length; i++) {
    dataTable.push({
      key: listProduct[i]._id,
      name: listProduct[i].name,
      price: listProduct[i].price,
      quantity: listProduct[i].quantity,
      category: listCategory?.find(
        (item) => item._id == listProduct[i].category
      ).name,
      description: listProduct[i].description,
      action: (
        <div style={{ display: 'inline-flex' }}>
          <Link to={`${listProduct[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            onClick={() => {
              showModal(listProduct[i]._id);
            }}
            className="fs-3 text-danger ms-3 bg-transparent border-0 mx-4"
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, []);
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState('');
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleRemove = (brandId) => {
    setOpen(false);
    dispatch(deleteProduct(brandId));
    setTimeout(() => {
      dispatch(getAllProduct());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Productlist</h3>
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
          handleRemove(brandId);
        }}
        title="Are you sure want to delete this product"
      />
    </div>
  );
};

export default Productlist;

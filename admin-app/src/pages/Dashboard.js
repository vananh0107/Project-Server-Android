import React, { useEffect, useState } from 'react';
import { AiFillFund, AiFillFlag } from 'react-icons/ai';
import { BsAwardFill, BsFillPersonFill } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import Order from './Order';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../app/features/order/OrderSlice';
import {
  getMonthCustomer,
  getMonthOrder,
  getMonthProduct,
  getTopSaleProduct,
  getYearOrder,
} from '../app/features/auth/authSlice';
const Dashboard = () => {
  const [dataMonthly, setDataMonthly] = useState([]);
  const [orderMonthly, setOrderMonthly] = useState([]);
  const [chartsValue, setCharts] = useState('income');
  const config = {
    data: chartsValue === 'income' ? dataMonthly : orderMonthly,
    xField: 'month',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      // position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const dispatch = useDispatch();
  const monthTotalData = useSelector((state) => state.auth?.monthTotal);
  const monthCustomer = useSelector((state) => state.auth?.monthCustomer);
  const monthProduct = useSelector((state) => state.auth?.monthProduct);
  const topSaleProduct = useSelector((state) => state.auth?.topSaleProduct);
  console.log(topSaleProduct);
  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getMonthOrder());
    dispatch(getYearOrder());
    dispatch(getMonthCustomer());
    dispatch(getMonthProduct());
    dispatch(getTopSaleProduct());
  }, []);
  const arrayMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    let dataIncome = [];
    let dataOrder = [];
    for (let index = 0; index < arrayMonth.length; index++) {
      if (index < monthTotalData?.length) {
        const element = monthTotalData[index];
        dataIncome.push({
          month: arrayMonth[element?._id],
          sales: element?.amount,
        });
        dataOrder.push({
          month: arrayMonth[element?._id],
          sales: element?.count,
        });
      } else {
        dataIncome.push({
          month: arrayMonth[index],
          sales: 0,
        });
        dataOrder.push({
          month: arrayMonth[index],
          sales: 0,
        });
      }
    }
    setDataMonthly(dataIncome);
    setOrderMonthly(dataOrder);
  }, [monthTotalData]);
  const handleSetOrder = () => {
    setCharts('order');
  };
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={() => setCharts('income')}
        >
          <div>
            {' '}
            <AiFillFund style={{ fontSize: '92px', color: '#1682ff' }} />
          </div>
          <div>
            <p>Total sells</p>{' '}
            <p className="mb-0 fs-2">
              {monthTotalData ? monthTotalData[0]?.amount : 0} đ
            </p>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={handleSetOrder}
        >
          <div>
            {' '}
            <AiFillFlag style={{ fontSize: '92px', color: '#24e0bd' }} />
          </div>
          <div>
            <p>Total orders</p>{' '}
            <p className="mb-0 fs-2">
              {monthTotalData ? monthTotalData[0]?.count : 0}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3">
          <div>
            {' '}
            <BsFillPersonFill
              style={{ fontSize: '92px', color: 'rgb(239 114 31)' }}
            />
          </div>
          <div>
            <p>Total customer</p>{' '}
            <p className="mb-0 fs-2">
              {monthCustomer ? monthCustomer[0].totalCustomers : 0}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3">
          <div>
            {' '}
            <BsAwardFill
              style={{ fontSize: '92px', color: 'rgb(136 36 224)' }}
            />
          </div>
          <div>
            <p>Total proudct</p>{' '}
            <p className="mb-0 fs-2">
              {monthProduct ? monthProduct[0]?.totalQuantitySold : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center gap-3">
        <div className="col-md-8 bg-white p-4">
          <p className="mb-4 fs-4">Income Statics</p>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="col-md-4 bg-white p-4">
          {' '}
          <p className="mb-4 fs-4">Top Sales Product</p>
          <div className="d-flex">
            <div className="row">
              {topSaleProduct?.map((product, index) => (
                <div key={index} className="col-md-6">
                  <div className="card mb-4">
                    <img
                      src={
                        product.productImage[0] && product.productImage[0].url
                      }
                      className="card-img-top"
                      style={{height:'160px'}}
                      alt={product.productName}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text">
                        Price: {product.productPrice} đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <Order title="Recent Orders" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

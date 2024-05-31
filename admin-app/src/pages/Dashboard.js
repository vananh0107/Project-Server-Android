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
  const [headingChart, setHeadingChart] = useState('Income Statics');
  const [dataMonthly, setDataMonthly] = useState([]);
  const [orderMonthly, setOrderMonthly] = useState([]);
  const [customerMonthly, setCustomerMonthly] = useState([]);
  const [productMonthly, setProductMonthly] = useState([]);
  const [chartsValue, setCharts] = useState([]);
  const dispatch = useDispatch();
  const monthTotalData = useSelector((state) => state.auth?.monthTotal);
  const monthCustomer = useSelector((state) => state.auth?.monthCustomer);
  const monthProduct = useSelector((state) => state.auth?.monthProduct);
  const topSaleProduct = useSelector((state) => state.auth?.topSaleProduct);
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
    let dataCustomer = [];
    let dataProduct = [];
    for (let index = 0; index < arrayMonth.length; index++) {
      if (index < monthTotalData?.length) {
        const element = monthTotalData[index];
        dataIncome.push({
          month: arrayMonth[element?._id.month],
          sales: element?.amount,
        });
        dataOrder.push({
          month: arrayMonth[element?._id.month],
          sales: element?.count,
        });
        dataCustomer.push({
          month: arrayMonth[element?._id.month],
          sales: element?.totalCustomers,
        });
        dataProduct.push({
          month: arrayMonth[element?._id.month],
          sales: element?.productsSold,
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
        dataCustomer.push({
          month: arrayMonth[index],
          sales: 0,
        });
        dataProduct.push({
          month: arrayMonth[index],
          sales: 0,
        });
      }
    }
    setDataMonthly(dataIncome);
    setOrderMonthly(dataOrder);
    setProductMonthly(dataProduct);
    setCustomerMonthly(dataCustomer);
    setCharts(dataIncome);
  }, [monthTotalData]);
  const handleSetChartData = (name) => {
    if (name == 'order') {
      setCharts(orderMonthly);
      setHeadingChart('Order Statics');
    } else if (name == 'customer') {
      setCharts(customerMonthly);
      setHeadingChart('Customer Statics');
    } else if (name == 'product') {
      setCharts(productMonthly);
      setHeadingChart('Product Statics');
    } else {
      setCharts(dataMonthly);
      setHeadingChart('Income Statics');
    }
  };
  const config = {
    data: chartsValue,
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
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={() => handleSetChartData('income')}
          style={{ width: '256px' }}
        >
          <div>
            {' '}
            <AiFillFund style={{ fontSize: '92px', color: '#1682ff' }} />
          </div>
          <div>
            <p>Total sells</p>{' '}
            <p className="mb-0 fs-2">
              {new Intl.NumberFormat('de-DE').format(
                monthTotalData?.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.amount,
                  0
                )
              )}{' '}
              đ
            </p>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={() => handleSetChartData('order')}
        >
          <div>
            {' '}
            <AiFillFlag style={{ fontSize: '92px', color: '#24e0bd' }} />
          </div>
          <div>
            <p>Total orders</p>{' '}
            <p className="mb-0 fs-2">
              {monthTotalData?.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.count,
                  0
                )}
            </p>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={() => handleSetChartData('customer')}
        >
          <div>
            {' '}
            <BsFillPersonFill
              style={{ fontSize: '92px', color: 'rgb(239 114 31)' }}
            />
          </div>
          <div>
            <p>Total customer</p>{' '}
            <p className="mb-0 fs-2">
              {monthCustomer?.length > 0
                ? monthCustomer[0]?.totalCustomers
                : '0'}
            </p>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={() => handleSetChartData('product')}
        >
          <div>
            {' '}
            <BsAwardFill
              style={{ fontSize: '92px', color: 'rgb(136 36 224)' }}
            />
          </div>
          <div>
            <p>Total proudct</p>{' '}
            <p className="mb-0 fs-2">
              {monthProduct?.length > 0
                ? monthProduct[0]?.totalQuantitySold
                : '0'}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center gap-3">
        <div className="col-md-8 bg-white p-4">
          <p className="mb-4 fs-4">{headingChart}</p>
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
                      style={{ height: '160px' }}
                      alt={product.productName}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text">
                        Total Sale: {product.totalSold}
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

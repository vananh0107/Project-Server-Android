import React, { useEffect, useState } from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
// import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import Order from './Order';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../app/features/order/OrderSlice';
import { getMonthOrder, getYearOrder } from '../app/features/auth/authSlice';
const Dashboard = () => {
  const [dataMonthly, setDataMonthly] = useState([]);
  const [orderMonthly, setOrderMonthly] = useState([]);
  const [chartsValue, setCharts] = useState('income');
  const config = {
    data: chartsValue === 'income' ? dataMonthly : orderMonthly,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',
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
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const dispatch = useDispatch();
  const monthTotalData = useSelector((state) => state.auth?.monthTotal);
  const yearTotalData = useSelector((state) => state.auth?.yearTotal);
  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getMonthOrder());
    dispatch(getYearOrder());
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
    for (let index = 0; index < monthTotalData?.length; index++) {
      const element = monthTotalData[index];
      dataIncome.push({
        type: arrayMonth[element?._id?.month],
        sales: element?.amount,
      });
      dataOrder.push({
        type: arrayMonth[element?._id?.month],
        sales: element?.count,
      });
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
            <p>Total sells</p>{' '}
            <p className="mb-0 fs-2">
              ${yearTotalData && yearTotalData[0]?.amount}
            </p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green mx-2">
              <BsArrowUpRight /> 16%
            </h6>
            <p>Compare to {arrayMonth[(new Date()).getMonth()]} {new Date().getFullYear()}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3">
          <div>
            <p>Average order value</p>{' '}
            <p className="mb-0 fs-2">
              ${yearTotalData && Math.round(yearTotalData[0]?.avarage)}
            </p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red mx-2">
              <BsArrowDownRight /> 29%
            </h6>
            <p>Compare to {arrayMonth[(new Date()).getMonth()]} {new Date().getFullYear()}</p>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-3"
          onClick={handleSetOrder}
        >
          <div>
            <p>Total orders</p>{' '}
            <p className="mb-0 fs-2">
              {yearTotalData && yearTotalData[0]?.count}
            </p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green mx-2">
              <BsArrowUpRight /> 32%
            </h6>
            <p>Compare to {arrayMonth[(new Date()).getMonth()]} {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-4 fs-4">Income Statics</div>
        {/* <div>
          <Column {...config} />
        </div> */}
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

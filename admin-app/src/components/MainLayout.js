import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { TbDashboard } from 'react-icons/tb';
import { FaBlog } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { FaClipboardList } from 'react-icons/fa';
import {
  AiFillHdd,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetState } from '../app/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetState());
    setTimeout(() => {
      navigate('/');
    }, 500);
  };
  const info =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem('user'));
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo d-flex justify-content-center">
          <h2 className="text-white fs-5 py-3 mb-0">
            <span className="sm-logo">Fruit Shop</span>
            <span className="lg-logo">FS</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <TbDashboard className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'catalog',
              icon: <AiFillHdd className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  label: 'Add Product',
                  icon: <ImBlog className="fs-4" />,
                },
                {
                  key: 'product-list',
                  icon: <FaClipboardList className="fs-4" />,

                  label: 'Product List',
                },
                {
                  key: 'discount',
                  label: 'Add Discount',
                  icon: <ImBlog className="fs-4" />,
                },
                {
                  key: 'discount-list',
                  icon: <FaClipboardList className="fs-4" />,

                  label: 'Discount List',
                },
                {
                  key: 'category',
                  label: 'Add Category',
                  icon: <ImBlog className="fs-4" />,
                },
                {
                  key: 'category-list',
                  icon: <FaClipboardList className="fs-4" />,

                  label: 'Category List',
                },
              ],
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'orders',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Orders',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="">
              <div class="dropdown">
                <div
                  className="d-flex gap-3 align-items-center"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div>
                    <img
                      width={42}
                      height={42}
                      src="https://starfinder-simulator.herokuapp.com/assets/root-ea6b56432024a3a2ca3596355b7754984ff9cf9f0fb2e9ac631a28ebef86cc89.png"
                      alt="images"
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">
                      {info?.firstname + ' ' + info?.lastname}
                    </h5>
                    <p className="mb-0">{info?.email}</p>
                  </div>
                </div>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link
                      to="/"
                      style={{ height: 'auto', lineHeight: '20px' }}
                      className="dropdown-item py-2 mb-1"
                    >
                      View profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLogout()}
                      style={{ height: 'auto', lineHeight: '20px' }}
                      className="dropdown-item py-2 mb-1"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

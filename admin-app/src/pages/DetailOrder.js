import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteEnquiry,
  getAllEnquiry,
  getEnquiry,
  updateAEnquiry,
} from '../app/features/enquiry/EnquirySlice';
import { BiArrowBack } from 'react-icons/bi';

const DetailOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split('/')[3];
  const enqState = useSelector((state) => state.enquiry?.enquiryDetail);

  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId]);
  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, data: { status: e } };
    dispatch(updateAEnquiry(data));
    setTimeout(() => {
      dispatch(getEnquiry(getEnqId));
    }, 100);
  };
  const handleupdateAEnquiry = () => {
    dispatch(updateAEnquiry(getEnqId));
    setTimeout(() => {
      navigate('/admin/enquiries');
      dispatch(getAllEnquiry());
    }, 200);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">Detail order</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">
            {enqState?.shippingInfor?.firstname +
              ' ' +
              enqState?.shippingInfor.lastname}
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Method payment:</h6>
          <p className="mb-0">
            {enqState?.shippingInfor?.methodPayment}
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${enqState?.shippingInfor?.phoneNumber}`}>
              {enqState?.shippingInfor?.phoneNumber}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${enqState?.shippingInfor?.email}`}>
              {enqState?.shippingInfor?.email}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Location:</h6>
          <p className="mb-0">
            {enqState?.shippingInfor?.address},{' '}
            {enqState?.shippingInfor?.district}
          </p>
        </div>
        <div className="gap-3">
          <h6>Products:</h6>
          <ol styles={{ listStyleType: 'decimal' }}>
            {enqState?.orderItems?.map((item, index) => (
              <li key={index}>
                <p className="mx-2">Name: {item?.product?.name}</p>
                <p className="mx-2">Count: {item?.count}</p>
                <p className="mx-2">Price: {item?.product?.price}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Total price:</h6>
          <p className="mb-0">{enqState?.totalPrice}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status paid:</h6>
          <p className="mb-0">{enqState?.isPaid}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enqState?.orderStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              className="form-control form-select"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Ordered" disabled selected>
                Ordered
              </option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5"
          onClick={handleupdateAEnquiry}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default DetailOrder;

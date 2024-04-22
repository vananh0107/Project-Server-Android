import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  createCoupon,
  getSingleCoupon,
  updateCoupon,
} from '../app/features/coupon/couponSlice';

const Addcoupon = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    expiry: yup.date().required('Expiry is required'),
    discount: yup.number().required('Discount is required'),
  });
  const location = useLocation();
  let getCouponId = location.pathname.split('/')[3];
  let valueSingleCoupon = useSelector((state) => state.coupon?.getACoupon);
  if (!getCouponId) valueSingleCoupon = false;
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getSingleCoupon(getCouponId));
    }
  }, [getCouponId]);
  const navigate = useNavigate();
  const date = new Date(valueSingleCoupon?.expiry)
    .toLocaleDateString()
    .toString()
    .replace('GMT+0700 (Indochina Time)', '');
  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: date || '',
      discount: undefined,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      getCouponId
        ? dispatch(updateCoupon({ id: getCouponId, data: values }))
        : dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/coupon-list');
      }, 1000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getCouponId ? 'Edit' : 'Add'} Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label={
              valueSingleCoupon?.name
                ? valueSingleCoupon?.name
                : 'Enter Brand Title'
            }
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label={valueSingleCoupon?.expiry ? date : 'Enter Expiry Date'}
            name="expiry"
            onCh={formik.handleChange('expiry')}
            onBl={formik.handleBlur('expiry')}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="text"
            label={
              valueSingleCoupon?.discount
                ? valueSingleCoupon?.discount
                : 'Enter Discount Number'
            }
            name="discount"
            onCh={formik.handleChange('discount')}
            onBl={formik.handleBlur('discount')}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCouponId ? 'Change' : 'Add'} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;

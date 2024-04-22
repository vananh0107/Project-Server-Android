import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  createDiscount,
  getSingleDiscount,
  updateDiscount,
} from '../app/features/discount/discountSlice';
import { resetState } from '../app/features/product/productSlice';

const Adddiscount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object({
    code: yup.string().required('Code is required'),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required'),
    percentage: yup.number().required('Percentage is required'),
  });
  const location = useLocation();
  let getCouponId = location.pathname.split('/')[3];
  let valueSingleDiscount = useSelector((state) => state.discount?.discount);
  if (!getCouponId) valueSingleDiscount = false;
 
  const formik = useFormik({
    initialValues: {
      code:  '',
      start_date:  '',
      end_date:  '',
      percentage: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      getCouponId
        ? dispatch(updateDiscount({ id: getCouponId, data: values }))
        : dispatch(createDiscount(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/discount-list');
      }, 1000);
    },
  });
  useEffect(() => {
    if (getCouponId) {
      formik.values.code = valueSingleDiscount.code;
      const start_date = new Date(valueSingleDiscount?.start_date)
      .toLocaleDateString()
      .toString()
      .replace('GMT+0700 (Indochina Time)', '');
      const end_date = new Date(valueSingleDiscount?.end_date)
      .toLocaleDateString()
      .toString()
      .replace('GMT+0700 (Indochina Time)', '');
      formik.values.start_date = start_date;
      formik.values.end_date = end_date;
      formik.values.percentage = valueSingleDiscount?.percentage ;
    } else {
      document.getElementsByTagName('form')[0].reset();
      formik.values = undefined;
    }
  }, [valueSingleDiscount]);
  useEffect(() => {
    formik.resetForm();
    document.getElementsByTagName('form')[0].reset();
    dispatch(resetState());
    formik.values = undefined;
    if (getCouponId !== undefined) {
      dispatch(getSingleDiscount(getCouponId));
    }
  }, [getCouponId]);
  return (
    <div>
      <h3 className="mb-4">{getCouponId ? 'Edit' : 'Add'} Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label={
              valueSingleDiscount?.code ? valueSingleDiscount?.code : 'Enter code'
            }
            name="code"
            onCh={formik.handleChange('code')}
            onBl={formik.handleBlur('code')}
            val={formik.values.code}
          />
          <div className="error">
            {formik.touched.code && formik.errors.code}
          </div>
          <CustomInput
            type="date"
            label={
              valueSingleDiscount?.start_date || 'Enter Start Date'
            }
            name="start_date"
            onCh={formik.handleChange('start_date')}
            onBl={formik.handleBlur('start_date')}
            val={formik.values.start_date}
          />
          <div className="error">
            {formik.touched.start_date && formik.errors.start_date}
          </div>
          <CustomInput
            type="date"
            label={valueSingleDiscount?.end_date || 'Enter Start Date'}
            name="end_date"
            onCh={formik.handleChange('end_date')}
            onBl={formik.handleBlur('end_date')}
            val={formik.values.end_date}
          />
          <div className="error">
            {formik.touched.end_date && formik.errors.end_date}
          </div>
          <CustomInput
            type="number"
            label={
              valueSingleDiscount?.percentage
                ? valueSingleDiscount?.percentage
                : 'Enter percentage Number'
            }
            name="percentage"
            onCh={formik.handleChange('percentage')}
            onBl={formik.handleBlur('percentage')}
            val={formik.values.percentage}
          />
          <div className="error">
            {formik.touched.percentage && formik.errors.percentage}
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

export default Adddiscount;

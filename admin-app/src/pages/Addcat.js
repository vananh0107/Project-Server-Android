import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  addCategory,
  getACategory,
  resetState,
  updateCategory,
} from '../app/features/product/productSlice';
import Dropzone from 'react-dropzone';
import { deleteImg, resetStateUpload, uploadImg } from '../app/features/upload/uploadSlice';

const Addcat = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    image: yup.array().required('Images is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
    },
    validationSchema: schema,
  });
  const navigate = useNavigate();
  const location = useLocation();
  let getCatId = location.pathname.split('/')[3];
  let valueSingleCat = useSelector((state) => state.product?.getACategory);
  if (!getCatId) valueSingleCat = false;
  let image;
  if (valueSingleCat) {
    image = valueSingleCat.image;
  }
  const imageUpload = useSelector((state) => state.upload.image);
  image = imageUpload ? imageUpload : image;
  useEffect(() => {
    formik.values.image = image;
  }, [image]);

  useEffect(() => {
    if (getCatId) {
      formik.values.name = valueSingleCat?.name || '';
      formik.values.image = valueSingleCat?.image || '';
    } else {
      document.getElementsByTagName('form')[0].reset();
      formik.values = undefined;
    }
  }, [valueSingleCat]);
  const handleSubmit = () => {
    getCatId
      ? dispatch(updateCategory({ id: getCatId, data: formik.values }))
      : dispatch(addCategory(formik.values));
    formik.resetForm();
    formik.values = undefined;
    setTimeout(() => { navigate('/admin/category-list');},300)
   
  };
  const publicId = image ? image.publicId : imageUpload.publicId;
  useEffect(() => {
    dispatch(resetStateUpload());
    formik.resetForm();
    document.getElementsByTagName('form')[0].reset();
    dispatch(resetState());
    formik.values = undefined;
    if (getCatId !== undefined) {
      dispatch(getACategory(getCatId));
    }
  }, [getCatId]);
  console.log(formik.values.name)
  return (
    <div>
      <h3 className="mb-4">{getCatId ? 'Edit' : 'Add'} Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label={valueSingleCat ? valueSingleCat.name : 'Enter category name'}
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name||valueSingleCat?.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uploadImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages mt-3 d-flex flex-wrap gap-3">
            {publicId ? (
              <div className="position-relative">
                <button
                  onClick={() => {
                    image = null;
                    dispatch(
                      deleteImg({
                        id: publicId,
                      })
                    );
                  }}
                  className="btn-close position-absolute"
                  style={{ top: '10px', right: '10px' }}
                  type="button"
                ></button>
                )
                <img src={image.url} alt="" width={200} height={200} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCatId ? 'Change' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;

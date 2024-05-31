import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { message, Tag } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import {
  addProd,
  getAllCategory,
  getAllProduct,
  getProduct,
  resetState,
  updateProduct,
} from '../app/features/product/productSlice';
import {
  deleteImg,
  resetStateUpload,
  uploadImg,
} from '../app/features/upload/uploadSlice';
const Addproduct = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required'),
    description: yup.string().required('Description is required'),
    category: yup.string().required('Category is required'),
    quantity: yup.number().required('Quantity is required'),
    image: yup.array().required('Image is required'),
  });
  const location = useLocation();
  let getProductId = location.pathname.split('/')[3];
  let valueProduct = useSelector((state) => state.product?.getProduct);
  const { listCategory } = useSelector((state) => state.product);
  let image;
  if (getProductId) {
    image = valueProduct?.images[0];
  }
  const imageUpload = useSelector((state) => state.upload.image);
  image = imageUpload ? imageUpload : image;
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  useEffect(() => {
    formik.values.image = image;
  }, [image]);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: undefined,
      description: '',
      category: '',
      quantity: undefined,
      image: '',
    },
    validationSchema: schema,
  });
  useEffect(() => {
    if (getProductId) {
      const categoryName = listCategory?.find(
        (item) => item._id == valueProduct?.category
      );
      formik.values.name = valueProduct?.name || '';
      formik.values.price = valueProduct?.price || '';
      formik.values.description = valueProduct?.description || '';
      formik.values.category = categoryName?.name || '';
      formik.values.quantity = valueProduct?.quantity || '';
      formik.values.image = valueProduct?.image || '';
    } else {
      document.getElementsByTagName('form')[0].reset();
      formik.values = undefined;
    }
  }, [valueProduct]);
  const handleSubmit = () => {
    formik.values.image = image;
    getProductId
      ? dispatch(updateProduct({ id: getProductId, data: formik.values }))
      : dispatch(addProd(formik.values));
    formik.resetForm();
    // dispatch(getAllProduct())
    setTimeout(() => {
      navigate('/admin/product-list');
    }, 300);
  };
  useEffect(() => {
    dispatch(resetStateUpload());
    formik.resetForm();
    document.getElementsByTagName('form')[0].reset();
    dispatch(getAllCategory());
    dispatch(resetState());
    formik.values = undefined;
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId));
    }
  }, [getProductId]);
  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={label}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };
  const publicId = image ? image?._id : imageUpload?._id;
  return (
    <div>
      <h3 className="mb-4">
        {getProductId !== undefined ? 'Edit' : 'Add'} Product
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name || valueProduct?.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description || valueProduct?.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange('price')}
            onBl={formik.handleBlur('price')}
            val={formik.values.price || valueProduct?.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onCh={formik.handleChange('quantity')}
            onBl={formik.handleBlur('quantity')}
            val={formik.values.quantity || valueProduct?.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <select
            name=""
            id=""
            className="form-control mb-3 py-3"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleChange('category')}
            value={formik.values.category || valueProduct?.category}
          >
            <option value="">Select Category</option>
            {listCategory?.map((item, index) => {
              if (valueProduct?.category === item.name) {
                return (
                  <option value={item.name} key={index} defaultValue>
                    {item.name}
                  </option>
                );
              } else {
                return (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                );
              }
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
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
            ) : image?.url ? (
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
            {getProductId !== undefined ? 'Update' : 'Add'} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;

import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Radio, Upload, Button } from "antd";

const { TextArea } = Input;

const ProductModal = ({
  heading,
  visible,
  onCancel,
  onFinish,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  let imageURL;

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async ({ fileList: newFileList }) => {
    imageURL = await getBase64(newFileList[0].originFileObj);

    setFileList(imageURL);
  };

  const handleFinish = (values) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Modal title={null} visible={visible} onCancel={onCancel} footer={null}>
      <div className="flex justify-center items-center ">
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={initialValues}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item noStyle>
            <div className="text-3xl font-bold mb-5">{heading}</div>
          </Form.Item>
          <Form.Item label="Title" name="title">
            <Input placeholder="Enter Title" />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber min="0" placeholder="Enter Price" controls={false} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Enter Description" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Radio.Group>
              <Radio value="Men Wear"> Men Wear </Radio>
              <Radio value="Women Wear"> Women Wear </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Select Image"
            valuePropName="fileList"
            name="image"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                required: true,
                message: "Please Upload the Item Image",
              },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (fileList && fileList[0].size > 2000000000000)
                      reject("File Size Exceeded");
                    else resolve("File Uploaded Succesfully");
                  });
                },
              },
            ]}
          >
            <Upload.Dragger
              name="file"
              type="file"
              maxCount={1}
              listType="picture"
              fileList={fileList}
              accept=".png,.jpg,.jpeg"
              onChange={handleChange}
              beforeUpload={(file) => {
                return false;
              }}
            >
              Drag files here or
              <br />
              <Button>Click Upload</Button>
            </Upload.Dragger>
          </Form.Item>
          <div className="flex justify-center">
            <Form.Item className="">
              <Button
                className="bg-sky-500 text-white hover:bg-sky-700"
                type="secondary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductModal;

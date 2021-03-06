import React, { useState, useMemo } from "react";
import { Button, Form, Card, Input, InputNumber, Select, Space } from "antd";
import { useNavigate, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";

function ProductItem({
  productData,
  handleUpdateProduct,
  handleDeleteProduct,
}) {
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();

  const { categoryList } = useSelector((state) => state.category);

  const renderCategoryOptions = useMemo(() => {
    return categoryList.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList]);

  if (!isUpdate) {
    return (
      <Card
        size="small"
        title={productData.name}
        style={{ marginTop: 16, backgroundColor: "#ccc" }}
      >
        <div>{productData.category.name}</div>
        <Space style={{ marginTop: 16 }}>
          <Button
            ghost
            onClick={() => {
              const newPath = generatePath(ROUTES.ADMIN.PRODUCT_DETAIL, {
                id: productData.id,
              });
              navigate(newPath);
            }}
          >
            Detail
          </Button>
          <Button type="primary" ghost onClick={() => setIsUpdate(true)}>
            Update
          </Button>
          <Button danger onClick={() => handleDeleteProduct(productData.id)}>
            Delete
          </Button>
        </Space>
      </Card>
    );
  }
  return (
    <Card
      size="small"
      title={`Update ${productData.name}`}
      style={{ marginTop: 16, backgroundColor: "#ccc" }}
    >
      <Form
        name="Update Product"
        layout="vertical"
        initialValues={{
          name: productData.name,
          price: productData.price,
          categoryId: productData.categoryId,
        }}
        onFinish={(values) => {
          handleUpdateProduct(productData.id, values);
          setIsUpdate(false);
        }}
      >
        <Form.Item
          label="T??n s???n ph???m"
          name="name"
          validateFirst
          rules={[
            {
              required: true,
              message: "Name l?? b???t bu???c!",
            },
          ]}
        >
          <Input placeholder="T??n s???n ph???m" />
        </Form.Item>
        <Form.Item
          label="Gi?? s???n ph???m"
          name="price"
          rules={[
            {
              required: true,
              message: "Gi?? l?? b???t bu???c!",
            },
            {
              type: "number",
              min: 500000,
              message: "Gi?? ph???i l???n h??n 500.000!",
            },
          ]}
        >
          <InputNumber placeholder="Gi?? s???n ph???m" />
        </Form.Item>
        <Form.Item
          label="H??ng s???n xu???t"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "H??ng l?? b???t bu???c!",
            },
          ]}
        >
          <Select placeholder="H??ng s???n xu???t">{renderCategoryOptions}</Select>
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => setIsUpdate(false)}>Cancel</Button>
        </Space>
      </Form>
    </Card>
  );
}

export default ProductItem;

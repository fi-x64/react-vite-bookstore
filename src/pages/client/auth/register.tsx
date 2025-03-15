import { Form, Input, Button, Typography, App } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import "./register.scss";
import { registerAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type FieldType = {
  email: string;
  fullName: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { fullName, email, password, phone } = values;

    const res = await registerAPI(fullName, email, password, phone);

    if (res.data) {
      message.success("Đăng ký user thành công!");
      navigate("/login");
    } else {
      message.error(res.message);
    }
    setIsSubmit(false);
  };

  return (
    <div className="register-container">
      <Title level={2} className="register-title">
        Đăng Ký Tài Khoản
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="register-form"
      >
        <Form.Item<FieldType>
          label="Họ tên"
          name="fullName"
          rules={[{ required: true, message: "Họ tên không được để trống!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email không được để trống!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Mật khẩu không được để trống!" },
            { min: 6, message: "Mật khẩu ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Số điện thoại không được để trống!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <Text className="register-text">
        Đã có tài khoản? <a href="/login">Đăng Nhập</a>
      </Text>
    </div>
  );
};

export default RegisterPage;

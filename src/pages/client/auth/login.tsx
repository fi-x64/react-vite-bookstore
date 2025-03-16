import { loginAPI } from "@/services/api";
import { Form, Input, Button, Typography, App, FormProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useCurrentApp } from "@/components/context/app.context";

const { Title, Text } = Typography;

type FieldType = {
  username: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const { message, notification } = App.useApp();
  const { setIsAuthenticated, setUser } = useCurrentApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;

    setIsSubmit(true);
    const res = await loginAPI(username, password);
    setIsSubmit(false);

    if (res?.data) {
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
      message.error(res.message);
    }
    setIsSubmit(false);
  };

  return (
    <div className="register-container">
      <Title level={2} className="register-title">
        Đăng Nhập Tài Khoản
      </Title>
      <Form layout="vertical" onFinish={onFinish} className="register-form">
        <Form.Item<FieldType>
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Họ tên không được để trống!" }]}
        >
          <Input />
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;

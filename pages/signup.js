import React, { useState, useEffect } from 'react';
import liff from "@line/liff";
import { Button, Form, Input, Space, Select, DatePicker, Checkbox } from 'antd';
const { Option } = Select;

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Signup = (props) => {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({})
  useEffect(() => {
    initPage()
  }, [])

  const initPage = async () => {
    await liff.init({ liffId: process.env.LIFF_ID })
    const profile = await liff.getProfile()
    setProfile(profile)
    const nameArr = profile.displayName.split(' ')
    form.setFieldsValue({
      firstname: nameArr.shift(),
      lastname: nameArr.join(' '),
    });
    // liff.getContext()
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onGenderChange = (value) => {

  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (<div>
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <h2>
        Contact Details
      </h2>
      <Form.Item
        name="email_address"
        label="Email Address:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Phone Number:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="verify_code"
      >
        <Button>Verified</Button>
      </Form.Item>
      <h2>
        Profile Details
      </h2>
      <Form.Item
        name="firstname"
        label="First Name:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Last Name:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="dob"
        label="Birthdate:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker onChange={onChange} picker="month" />
      </Form.Item>
      <Form.Item
        name="is_agree_privacy_consent"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          <label for="is_agree_privacy_consent"><span></span>By proceeding to sign up, I accept the <a href="https://www.dolce-gusto.co.th/en/our-service#term-conditions" target="_blank"><strong>Terms and Conditions</strong></a> and acknowledge the <a href="https://www.dolce-gusto.co.th/en/privacy-policy" target="_blank"><strong>Privacy Notice</strong></a>.</label>
        </Checkbox>
      </Form.Item>
      <Form.Item
        name="is_subscribed"
        valuePropName="checked"
        {...tailFormItemLayout}
      >
        <Checkbox>
          <label for="is_subscribed"><span></span>I would like to receive offers, news, competitions and information about <strong>Nestle (Thai) Ltd</strong>, its brands and its products. I understand that my personal data will be processed in accordance with the <a href="https://www.dolce-gusto.co.th/en/privacy-policy" target="_blank"><strong>Nestle Privacy Notice</strong></a>. I understand that I can withdraw my consent at any time.</label>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  </div>)
}

export default Signup
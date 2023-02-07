import { PageLayout } from "../components/PageLayout";
import { Form, Select, Input, Button, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { useAppState } from "../state/AppState"
import axios from 'axios'
import { useForm } from "antd/lib/form/Form";


export const CreateUser = () => {

    const {appState} = useAppState()
    const {mutateAsync: createUser, isLoading: createUserLoading} = useMutation('createUser', async(values) => {
      const res = await axios.post('http://localhost:3004/user/signUp', {...values,id:appState.userId},{
          headers: {
            "Content-Type": "application/json",
            "Authorization": appState.token
          }
        })
        if(res.status==201) message.success("User Created Successfully")
        if(res.status==400) message.warning("Something Went Wrong, Please check you have provided all the details")

    })
    const [form] = useForm()

  return (
    <PageLayout>
      <h1>Create User</h1>
      <Button onClick={() => message.success(';lasjfldsj')}>click me</Button>
      <Form layout="vertical" onFinish={async(values) => {
        await createUser(values)
        form.resetFields()
      }}>
        <Form.Item name="name" label="Name:">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email:">
          <Input />
        </Form.Item>
        <Form.Item name="position" label="Position:">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password:">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="role" label="Role:">
          <Select>
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="EMPLOYEE">Employee</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createUserLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  );
};

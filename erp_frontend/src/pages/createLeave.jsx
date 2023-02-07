import { PageLayout } from "../components/PageLayout";
import { Form, Select, Input, Button, message, DatePicker } from "antd";
import { useMutation, useQuery } from "react-query";
import { useAppState } from "../state/AppState";

import moment from "moment";
import axios from "axios";
export const CreateLeave = () => {
    const { appState } = useAppState()
        console.log('hi',appState);

  const { mutateAsync: CreateLeave, isLoading: CreateLeaveLoading } =
    useMutation("CreateLeave", async (values) => {
        values.date = values.date.toDate()
        try{
           const res = await axios.post("http://localhost:3004/user/createLeave", values,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': appState.token
            }});
           console.log({res});
           if(res.status==201) message.success('Applied Leave Successfully')
        }
        catch(err){
            console.log(err);
            // if(err.response.status==409) message.e~rror('Fill All the Details')
        }
    });

  return (
    <PageLayout>
      <h1>Create User</h1>
      <Button onClick={() => message.success(";lasjfldsj")}>click me</Button>
      <Form
        layout="vertical"
        onFinish={async (values) => {
          await CreateLeave(values);
        }}
      >
        <Form.Item name="type" label="Leave Type:">
          <Select>
            <Select.Option value="FIRST HALF">First Half</Select.Option>
            <Select.Option value="SECOND HALF">Second Half</Select.Option>
            <Select.Option value="FULL DAY">Full Day</Select.Option>

          </Select>
        </Form.Item>
        <Form.Item
          label="Leave Date"
          name="date"
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="description" label="Description:">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={CreateLeaveLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  );
};

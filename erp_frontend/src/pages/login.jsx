import { PageLayout } from "../components/PageLayout";
import { Form, Input, Button, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { UseNavigate } from "react-router-dom";
import axios from "axios";
import { useAppState } from "../state/AppState";

export const Login = (values) => {
 
  const {appState, setAppState}=useAppState();
  const { mutateAsync: Login, isLoading: createUserLoading } = useMutation(
    "Login",
    async (values) => {
      try{
        const result = await axios.post("http://localhost:3004/login",values);
        console.log(result);
        return result
      }
      catch(err){
        if (err.response.status == 409) message.error("User Do Not Exist");
      }
    }
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <Form
        layout="vertical"
        style={{
          width: 640,
          borderRadius: 16,
        }}
        onFinish={async (values) => {
          const log=await Login(values);
           if(log.data && log.data.userId)
           {
            setAppState({...log.data,signedIn:true})
            localStorage.setItem("erp-appState", JSON.stringify({...log.data,signedIn:true}))
           
           }
           else{
            message.error("Login Failed")
           }
        }}
      >
        <Form.Item name="email" label="Email:">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password:">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

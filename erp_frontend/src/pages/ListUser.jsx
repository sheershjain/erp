import { Button, Modal, Table } from "antd";
import { PageLayout } from "../components/PageLayout";
import { useState } from "react";
import { useAppState } from "../state/AppState";
import axios from"axios"
import { useQuery } from "react-query";

export const ListUser = () => {
  const [users, setUsers] = useState([]);
    const {appState} = useAppState()
  const { mutateAsync: user, isLoading: usersLoading } = useQuery(
    "users",
    async () => {
      try {
        const res = await axios.get(
          `http://localhost:3004/user/${appState.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: appState.token,
            },
          }
        );
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
        // if(err.response.status==409) message.e~rror('Fill All the Details')
      }
    }
  );

  const [userModal, setUserModal] = useState(false);
  return (
    <PageLayout>
      <Table
        columns={[
          
          {
            title: "Name",
            render: (_, row) => (
              <Button onClick={() => setUserModal(true)}>{row.name}</Button>
            ),
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          { title: "Type", dataIndex: "role" },
        ]}
        dataSource={users}
      />

      <Modal open={userModal} onCancel={() => setUserModal(false)}>
        {" "}
        Test Modal
      </Modal>
    </PageLayout>
  );
};

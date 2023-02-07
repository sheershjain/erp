import { PageLayout } from "../components/PageLayout";
import { Table, Button } from "antd";
import { useMutation, useQuery } from "react-query";
import { useAppState } from "../state/AppState";
import { useState } from "react";
import axios from "axios";
export const LeaveHistory = () => {
    const { appState } = useAppState()
    const [leavesHistory, setLeavesHistory] = useState([])
    const { mutateAsync: leaveHistory, isLoading: leaveHistoryLoading } =
    useQuery("leaveHistory", async () => {
        try{
           const res = await axios.get(`http://localhost:3004/user/leaveHistory/${appState.userId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': appState.token
            }});
           setLeavesHistory(res.data)
        }
        catch(err){
            console.log(err);
            // if(err.response.status==409) message.e~rror('Fill All the Details')
        }
    });

  return (
    <PageLayout>
        <Table 
        columns={[
            {
                title: 'Leave Date',
                dataIndex: 'date',
                render: (date) => new Date(date).toLocaleString()
            },
            {
                title: 'Type',
                // render: (_, row) => <Button /*onClick={() => setUserModal(true)}*/>{row.name}</Button>,
                dataIndex:'type'
            },
            {
                title: 'Status',
                dataIndex: 'status'
                        },
                        {
                            title: 'Description',
                            dataIndex: 'description'
                                    }
        ]}
            dataSource={leavesHistory}
            rowKey='id'
        />

        {/* <Modal open={userModal} onCancel={() => setUserModal(false)}> Test Modal</Modal> */}
    </PageLayout>
  );
};

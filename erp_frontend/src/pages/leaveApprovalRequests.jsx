import { PageLayout } from "../components/PageLayout";
import { Table, Button, Switch, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { useAppState } from "../state/AppState";
import { useEffect, useState } from "react";
import axios from "axios";
export const LeaveApprovalRequests = () => {
  const { appState } = useAppState();

  const {
    isLoading: leaveApprovalRequestsLoading,
    refetch: refetchLeaveApprovalRequest,
    data: leaveApprovalRequests,
  } = useQuery("leaveApprovalRequest", async () => {
    try {
      const res = await axios.get(
        `http://localhost:3004/user/userLeaves/${appState.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: appState.token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      // if(err.response.status==409) message.error('Fill All the Details')
    }
  });

  const { mutateAsync: leaveAction, isLoading: leaveActionLoading } =
    useMutation("leaveAction", async ({ action, leaveId }) => {
      try {
        await axios.put(
          `http://localhost:3004/user/leaveAction/${appState.userId}`,
          { leaveId, action },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: appState.token,
            },
          }
        );

        // setLeavesApprovalRequests(res.data);
      } catch (err) {
        console.log(err);
        // if(err.response.status==409) message.e~rror('Fill All the Details')
      }
    });

  return (
    <PageLayout>
      <Table
        columns={[
          {
            title: "Leave Date",
            dataIndex: "date",
          },
          {
            title: "Type",
            dataIndex: "type",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title: "Action",
            render: (_, row) => (
              <div>
                <Button
                  disabled={leaveActionLoading || row.status !== 'PENDING'}
                  style={{ margin: 10 }}
                  onClick={async () => {
                    await leaveAction({ action: "APPROVED", leaveId: row.id });
                    message.success("Leave Approved!");
                    await refetchLeaveApprovalRequest();
                  }}
                >
                  Approve
                </Button>
                <Button
                  danger
                  disabled={leaveActionLoading || row.status !== 'PENDING'}
                  onClick={async () => {
                    await leaveAction({ action: "REJECTED", leaveId: row.id });
                    message.success("Leave Rejected!");
                    await refetchLeaveApprovalRequest();
                  }}
                >
                  Reject
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={leaveApprovalRequests}
      />

      {/* <Modal open={userModal} onCancel={() => setUserModal(false)}> Test Modal</Modal> */}
    </PageLayout>
  );
};

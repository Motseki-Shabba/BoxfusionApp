"use client";
import React, { useEffect, useState } from 'react';
import { fetchTrainerClients, getCurrentUser, IClient } from '@/app/providers/GetClientsForTrainer/provider';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';
import Tag from 'antd/es/tag';
import Spin from 'antd/es/spin';
import Alert from 'antd/es/alert';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<IClient[]>([]);

  // Function to load clients
  const loadClients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First get the current user to retrieve the trainer ID
      const userResponse = await getCurrentUser();
      const userData = (userResponse as { data: { id: string } }).data;
      
      if (!userData || !userData.id) {
        throw new Error("Could not retrieve trainer ID");
      }
      
      const trainerId = userData.id;
      
      // Now fetch clients for this trainer
      const clientsResponse = await fetchTrainerClients(trainerId) as { status: number, data: IClient[], message?: string };
      
      if (clientsResponse.status === 200 && clientsResponse.data) {
        setClients(clientsResponse.data);
      } else {
        throw new Error(clientsResponse.message || "Failed to retrieve clients");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Table columns configuration
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contactNumber',
      key: 'contact',
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      key: 'gender',
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'activeState',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'volcano'}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Onboarded',
      key: 'onboarded',
      dataIndex: 'hasOnboarded',
      render: (onboarded: boolean) => (
        <Tag color={onboarded ? 'blue' : 'orange'}>
          {onboarded ? 'YES' : 'NO'}
        </Tag>
      ),
    },
    {
      title: 'Registration Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Spin size="large" tip="Loading clients..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Client Dashboard</Title>
      <Table 
        columns={columns} 
        dataSource={clients.map(client => ({ ...client, key: client._id }))} 
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Dashboard;
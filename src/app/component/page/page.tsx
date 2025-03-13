"use client";
import React from "react";
import CreateClientForm from "@/app/component/Client/page";
import { ClientProvider } from "@/app/providers/createclient/provider";

const CreateClientPage: React.FC = () => {
  return (
    <ClientProvider>
      <div className="container mx-auto py-8">
        <CreateClientForm />
      </div>
    </ClientProvider>
  );
};

export default CreateClientPage;
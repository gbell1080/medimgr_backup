import ClientForm from "@/app/(components)/ClientForm/ClientForm";
import React from "react";

const getClientByID = async (id) => {
  const res = await fetch(`http://medimgr.vercel.app/api/Clients/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get Client data");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateClientData = {};
  if (EDITMODE) {
    updateClientData = await getClientByID(params.id);
    updateClientData = updateClientData.foundClient;
  } else {
    updateClientData = {
      _id: "new",
    };
  }

  return <ClientForm client={updateClientData} />;
};

export default TicketPage;

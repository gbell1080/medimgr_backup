import MedsForm from "@/app/(components)/MedsForm/MedsForm";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getMedsByID = async (id) => {
  const res = await fetch(`http://medimgr.vercel.app/api/Meds/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get Meds data");
  }
  return res.json();
};

const getClients = async () => {
  const res = await fetch("http://medimgr.vercel.app/api/Clients", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch client data");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/Meds/${params.id}`);
  }
  // console.log("session", session);
  const { clients } = await getClients();

  const EDITMODE = params.id === "new" ? false : true;
  let updateClientData = {};
  if (EDITMODE) {
    updateClientData = await getMedsByID(params.id);
    updateClientData = updateClientData.foundMeds;
  } else {
    updateClientData = {
      _id: "new",
    };
  }

  return (
    <MedsForm meds={updateClientData} clients={clients} session={session} />
  );
};

export default TicketPage;

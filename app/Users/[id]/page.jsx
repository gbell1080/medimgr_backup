import UserForm from "@/app/(components)/UserForm/UserForm";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getUserByID = async (id) => {
  const res = await fetch(`http://medimgr.vercel.app/api/Users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get Meds data");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/Meds/${params.id}`);
  }

  const EDITMODE = params.id === "new" ? false : true;
  let updateUserData = {};
  if (EDITMODE) {
    updateUserData = await getUserByID(params.id);
    updateUserData = updateUserData.foundUser;
  } else {
    updateUserData = {
      _id: "new",
    };
  }

  return <UserForm user={updateUserData} />;
};

export default TicketPage;

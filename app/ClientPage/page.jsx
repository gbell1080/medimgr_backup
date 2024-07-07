import React from "react";
import ClientCard from "../(components)/ClientCard/ClientCard";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const getClients = async () => {
  const res = await fetch("http://medimgr.vercel.app/api/Clients", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch client data");
  }
  return res.json();
};

const Clients = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/ClientPage");
  }

  const { clients } = await getClients();

  const uniqueCategories = [
    ...new Set(clients.map(({ category }) => category)),
  ];
  return (
    <div className="side-padding">
      <h1>Clients</h1>
      <div>
        {clients &&
          uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="cardContainer">
                {clients
                  .filter(({ category }) => category === uniqueCategory)
                  .map((filteredClient, _index) => (
                    <ClientCard
                      id={_index}
                      key={_index}
                      client={filteredClient}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
      <div className="btn-center">
        <Link href="/ClientPage/new" className="btn-orange">
          Create New Client
        </Link>
      </div>
    </div>
  );
};

export default Clients;

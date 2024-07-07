import React from "react";
import MedsCard from "../(components)/MedsCard/MedsCard";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const getMeds = async () => {
  const res = await fetch("http://medimgr.vercel.app/api/Meds", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch client data");
  }
  return res.json();
};

const Meds = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Meds");
  }
  console.log("session", session);

  const { meds } = await getMeds();
  // const staticMeds = {
  //   title: "Morphine",
  //   description:
  //     "Couldn't think of what medication to put in here so fuck it we're doin…",
  //   currentTotal: 1000,
  //   expectedTotal: 0,
  //   destroyed: 4,
  //   returned: 1,
  //   stockLevel: 3,
  //   active: true,
  // };

  const uniqueNames = [...new Set(meds.map(({ person }) => person))];
  return (
    <div className="side-padding">
      <h1>Medications</h1>
      <p>Placeholder for medication management</p>
      {meds &&
        uniqueNames.map((uniqueName, nameIndex) => (
          <div key={nameIndex}>
            <h2>{uniqueName}</h2>
            <div className="cardContainer">
              {meds
                .filter(({ person }) => person === uniqueName)
                .map((medicationMapping, _index) => (
                  <MedsCard
                    id={_index}
                    key={_index}
                    medication={medicationMapping}
                  />
                ))}
              {/* <MedsCard medication={staticMeds}/> */}
            </div>
          </div>
        ))}
      <div className="btn-center">
        <Link href="/Meds/new" className="btn-orange">
          Create New Meds Card
        </Link>
      </div>
    </div>
  );
};

export default Meds;

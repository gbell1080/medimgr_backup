import Medication from "@/app/(models)/Meds";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundMeds = await Medication.findOne({ _id: id });
    return NextResponse.json({ foundMeds }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Medication.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const clientData = body.formData;

    const updateMedsData = await Medication.findByIdAndUpdate(id, {
      ...clientData,
    });
    return NextResponse.json(
      { message: "Client updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

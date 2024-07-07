import Medication from "../../(models)/Meds";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const medsData = body.formData;
    await Medication.create(medsData);
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const meds = await Medication.find();
    return NextResponse.json({ meds }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

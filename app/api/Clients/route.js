import Client from "../../(models)/Client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const clientData = body.formData;
    await Client.create(clientData);
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await Client.find();
    return NextResponse.json({ clients }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

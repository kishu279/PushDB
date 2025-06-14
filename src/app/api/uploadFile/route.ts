import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  //   console.log(formData); // getting the right data

  // Steps :-
  // 1. connection
  // 2. create Schema
  // 3. extract the data
  // 4. save the data to monogo

  try {
    // required form data
    const file: File = formData.get("file") as File;
    const mongoDbUri: string = formData.get("mongoDbUri") as string;
    const tableName: string = formData.get("tableName") as string;
    const constraints = formData.get("constraints") as string;

    // get the form data
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileData = JSON.parse(fileBuffer.toString("utf-8")); // getting the file data from the .json file

    // create the connection to backend
    await mongoose.connect(mongoDbUri).then(() => {
      console.log("connection successfull");
    });

    let schema;
    // get the shcema
    if (typeof constraints === "string") {
      const parsedOnce = JSON.parse(constraints);

      const parsedTwice =
        typeof parsedOnce === "string" ? JSON.parse(parsedOnce) : parsedOnce;

      // console.log("Parsed twice: ", parsedTwice);

      schema = new mongoose.Schema(parsedTwice);
    }

    if (!schema) {
      console.error("Schema not found");
      throw new Error("Schema not found");
    }

    const model =
      mongoose.models[tableName] || mongoose.model(tableName, schema);

    // send the data
    const result = await model.insertMany(fileData);

    // disconnect
  } catch (err) {
    await mongoose.disconnect();
    console.error(err);
    return new NextResponse(JSON.stringify({ message: "failure" }));
  } finally {
    await mongoose.disconnect();
  }

  return new NextResponse(JSON.stringify({ message: "Sucess" }));
}

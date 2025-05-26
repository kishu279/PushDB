"use client";

import { table } from "console";
import { ChangeEvent, FormEvent, useState } from "react";

export default function GrabDataComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [mongoDbUri, setMongoDbUri] = useState("");
  const [tableName, setTableName] = useState("");
  const [constraints, setConstraints] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // create the form data and then append the required details
    if (!file) {
      alert("choose file first");
      return;
    }

    try {
      // create the instance
      const formData = new FormData();

      // append the data
      formData.append("file", file);

      // submit this data to backend
    } catch (err) {
      console.log(err);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    // set the file to state variable
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <section className="h-screen flex items-center justify-center bg-neutral-900 ">
      <form
        className="flex flex-col items-center justify-center gap-6 w-[400px] h-[700px] rounded-2xl bg-neutral-950 shadow-2xl"
        onSubmit={handleSubmit}
        encType=""
      >
        <h2 className="text-2xl font-bold text-center">
          Upload JSON & Connect
        </h2>

        <div className="">
          <label
            htmlFor="fileUpload"
            className="block mb-2 text-sm font-semibold"
          >
            Upload JSON File
          </label>
          <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            accept=".json"
            className="cursor-pointer h-[100px] rounded-2xl w-[300px] bg-neutral-800 p-3"
            required
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">
            MongoDB URI
          </label>
          <input
            type="text"
            value={mongoDbUri}
            onChange={(e) => setMongoDbUri(e.target.value)}
            placeholder="mongodb+srv://..."
            className="w-full p-3 rounded-lg bg-neutral-800"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Table Name</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Enter table name"
            className="w-full p-3 rounded-lg bg-neutral-800"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">
            Constraints
          </label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="Enter constraints"
            rows={4}
            className="w-full p-3 rounded-lg bg-neutral-800 resize-none"
          />
        </div>

        <input
          type="submit"
          className="p-3 rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-500 hover:text-neutral-90"
        />
      </form>
    </section>
  );
}

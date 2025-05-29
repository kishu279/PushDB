"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function GrabDataComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [mongoDbUri, setMongoDbUri] = useState("");
  const [tableName, setTableName] = useState("");
  const [constraints, setConstraints] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      formData.append("mongoDbUri", mongoDbUri);
      formData.append("tableName", tableName);
      formData.append("constraints", constraints);

      // submit this data to backend
      const response = await axios.post("/api/uploadFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
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
    <section className="min-h-screen p-4 pt-[160px] w-fit place-self-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 text-white p-8 rounded-2xl shadow-2xl space-y-6 h-fit "
      >
        <h2 className="text-2xl font-bold text-center">
          Upload JSON & Connect
        </h2>

        <div>
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
            required
            onChange={handleFileChange}
            className="w-full cursor-pointer rounded-lg bg-neutral-800 p-3"
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

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

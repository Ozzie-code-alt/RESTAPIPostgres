import CardComponent from "@/components/CardComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";
import exp from "constants";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  //fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("tried connecting");
        const response = await axios.get(`http://localhost:4000/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="uppercase">
          <h1>Test postgres API dockerized</h1>
        </div>

        {/*Display Users */}

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow "
            >
              <CardComponent card={user} />
              <button
                onClick={() => {}}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded "
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

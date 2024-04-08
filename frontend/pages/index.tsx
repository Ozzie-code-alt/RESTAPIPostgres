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
        console.log("tried connecting")
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
      <div className="uppercase">test postgres API dockerized</div>

      {/*Display Users */}

      <div className="flex flex-col">
        {users.map((user) => (
          <div key={user.id}>
              <CardComponent card={user}/>
          </div>
        ))}
      </div>
    </div>
  );
}

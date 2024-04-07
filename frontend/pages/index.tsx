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
  return (
    <div>
      <CardComponent
        card={{ id: 1, name: "John Doe", email: "someting@mail.com" }}
      />
    </div>
  );
}

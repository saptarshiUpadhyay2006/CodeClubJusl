import { auth } from "@/auth";
import React from "react";

async function Page() {
  const user = await auth();
  console.log(user);
  return <div>Page</div>;
}

export default Page;
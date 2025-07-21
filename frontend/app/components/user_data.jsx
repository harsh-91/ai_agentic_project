import React from "react";
import { useUser } from "./UserContext";
import { logInfo } from "./logger";
export default function UserData() {
  const { user } = useUser();
  logInfo("UI:UserData render", {user});
 
}

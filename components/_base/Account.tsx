"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Account = () => {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    login(username);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <div>
          <p>Welcome, {user}!</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
};

export default Account;

'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }
  return (
    <div>
      <Input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
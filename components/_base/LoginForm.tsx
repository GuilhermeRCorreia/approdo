"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Orbit } from "lucide-react";
import { setUsernameGlobal } from "@/lib/utils";  // Importar a função para definir o username

interface Credentials {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = `http://172.16.99.174:8400/rest/api/oauth2/v1/token`;
      const params = new URLSearchParams({
        grant_type: "password",
        username: credentials.username,
        password: credentials.password,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.access_token}; path=/`;
        setUsernameGlobal(credentials.username); // Salvar o username na variável global
        router.push("/inicio");
      } else {
        const data = await response.json();
        setError(data.error_description || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm border-blue-950 bg-slate-950/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-sans flex gap-1">
            <Orbit height={35} width={30} /> RodoAPP
          </CardTitle>
          <CardDescription>
            Utilize seu login do Protheus para acessar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Email</Label>
            <Input
              type="text"
              placeholder="nome.sobrenome"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="  text-white w-full">
            {loading ? "Carregando..." : "Login"}
          </Button>
        </CardFooter>
        {error && <p className="text-red-500">{error}</p>}
      </Card>
    </form>
  );
};

export default LoginForm;

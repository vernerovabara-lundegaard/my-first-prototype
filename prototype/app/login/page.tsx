"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Stack, Paper, Title, Text } from "@mantine/core";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Vyplňte e-mail a heslo.");
      return;
    }
    login(email, password);
    router.push("/welcome");
    router.refresh();
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <Paper shadow="sm" p="xl" radius="md" maw={400} w="100%">
        <Title order={1} mb="xs">
          Přihlášení
        </Title>
        <Text c="dimmed" size="sm" mb="lg">
          Klientská zóna – pojištění odpovědnosti
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="E-mail"
              type="email"
              placeholder="vas@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextInput
              label="Heslo"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Text size="sm" c="red">
                {error}
              </Text>
            )}
            <Button type="submit" fullWidth>
              Přihlásit se
            </Button>
          </Stack>
        </form>
        <Text size="xs" c="dimmed" mt="md">
          Prototyp: libovolný e-mail a heslo stačí k přihlášení.
        </Text>
      </Paper>
    </main>
  );
}

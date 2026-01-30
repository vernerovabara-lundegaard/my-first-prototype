"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Group, Button, Box, Title, Text } from "@mantine/core";
import { useAuth } from "@/lib/contexts/AuthContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <Box maw={900} mx="auto" p="md">
      <Group justify="space-between" mb="xl" wrap="wrap" gap="sm">
        <Link href="/welcome" style={{ textDecoration: "none", color: "inherit" }}>
          <Title order={3}>Klientská zóna</Title>
          <Text size="xs" c="dimmed">
            Pojištění odpovědnosti
          </Text>
        </Link>
        <Group gap="sm">
          {pathname !== "/welcome" && (
            <Button component={Link} href="/welcome" variant="subtle" size="sm">
              Úvod
            </Button>
          )}
          {pathname !== "/onboarding" && (
            <Button component={Link} href="/onboarding" variant="subtle" size="sm">
              Sjednat pojištění
            </Button>
          )}
          {pathname !== "/dashboard" && (
            <Button component={Link} href="/dashboard" variant="subtle" size="sm">
              Přehled
            </Button>
          )}
          <Button variant="light" color="gray" size="sm" onClick={handleLogout}>
            Odhlásit se
          </Button>
        </Group>
      </Group>
      {children}
    </Box>
  );
}

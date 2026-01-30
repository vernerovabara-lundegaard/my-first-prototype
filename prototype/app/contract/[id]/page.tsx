"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Title, Text, Stack, Paper, Button, Group } from "@mantine/core";
import { RequireAuth } from "@/components/RequireAuth";
import { AppShell } from "@/components/AppShell";

export default function ContractViewPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <RequireAuth>
      <AppShell>
        <Stack gap="lg">
          <Group justify="space-between">
            <Title order={1}>Smlouva {id}</Title>
            <Button component={Link} href="/dashboard" variant="subtle" size="sm">
              ← Zpět na přehled
            </Button>
          </Group>

          <Paper shadow="sm" p="xl" radius="md" withBorder>
            <Title order={3} mb="md">
              Pojištění odpovědnosti za škodu – návrh smlouvy
            </Title>
            <Text size="sm" c="dimmed" mb="lg">
              Toto je zjednodušený náhled smlouvy v klientské zóně. Prototyp – bez právní účinnosti.
            </Text>
            <Stack gap="xs">
              <Text><strong>Číslo smlouvy:</strong> {id}</Text>
              <Text><strong>Pojistník:</strong> [údaje z formuláře]</Text>
              <Text><strong>Limit plnění:</strong> 1 000 000 Kč</Text>
              <Text><strong>Doba pojištění:</strong> dle vyplněných údajů</Text>
              <Text><strong>Pojistné:</strong> 2 400 Kč/rok</Text>
            </Stack>
            <Text size="xs" c="dimmed" mt="xl">
              Plné znění smluvních podmínek a informace dle zákona o pojišťovnictví budou k dispozici v produkční verzi.
            </Text>
          </Paper>

          <Button component={Link} href="/dashboard">
            Zpět na přehled
          </Button>
        </Stack>
      </AppShell>
    </RequireAuth>
  );
}

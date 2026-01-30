"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Title, Text, Stack, Card, Group, Button, Badge } from "@mantine/core";
import { RequireAuth } from "@/components/RequireAuth";
import { AppShell } from "@/components/AppShell";

const MOCK_CONTRACTS = [
  { id: "sml-001", name: "Odpovědnost za škodu – občanskoprávní", date: "2025-01-15", premium: "2 400 Kč/rok", status: "Nabídka" },
  { id: "sml-002", name: "Povinné ručení – vozidlo ABC 1234", date: "2024-06-01", premium: "3 100 Kč/rok", status: "Aktivní" },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";

  return (
    <AppShell>
        <Stack gap="xl">
          <div>
            <Title order={1} mb="xs">
              Přehled smluv
            </Title>
            <Text c="dimmed">
              Vaše pojistné smlouvy a nabídky v přehledu.
            </Text>
          </div>

          {isNew && (
            <Card withBorder padding="lg" radius="md" bg="var(--mantine-color-green-0)">
              <Text size="sm" fw={500} c="green.8">
                Nabídka byla vytvořena. Níže ji najdete v přehledu; můžete si zobrazit smlouvu.
              </Text>
            </Card>
          )}

          <Stack gap="md">
            {MOCK_CONTRACTS.map((c) => (
              <Card key={c.id} shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" wrap="wrap">
                  <div>
                    <Text fw={500}>{c.name}</Text>
                    <Text size="sm" c="dimmed">
                      Od {c.date} · {c.premium}
                    </Text>
                  </div>
                  <Group gap="sm">
                    <Badge variant="light" color={c.status === "Aktivní" ? "green" : "blue"}>
                      {c.status}
                    </Badge>
                    <Button component={Link} href={`/contract/${c.id}`} variant="light" size="sm">
                      Zobrazit smlouvu
                    </Button>
                  </Group>
                </Group>
              </Card>
            ))}
          </Stack>

          <Text size="xs" c="dimmed">
            Prototyp – data jsou pouze ukázková, nic se neukládá.
          </Text>
        </Stack>
    </AppShell>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <Suspense fallback={
        <RequireAuth>
          <AppShell>
            <Text>Načítání…</Text>
          </AppShell>
        </RequireAuth>
      }>
        <DashboardContent />
      </Suspense>
    </RequireAuth>
  );
}

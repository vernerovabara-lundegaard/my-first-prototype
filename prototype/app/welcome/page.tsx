"use client";

import Link from "next/link";
import { Button, Title, Text, Stack, Card, Group } from "@mantine/core";
import { RequireAuth } from "@/components/RequireAuth";
import { AppShell } from "@/components/AppShell";

export default function WelcomePage() {
  return (
    <RequireAuth>
      <AppShell>
        <Stack gap="xl">
          <div>
            <Title order={1} mb="xs">
              Vítejte v klientské zóně
            </Title>
            <Text c="dimmed">
              Pojištění odpovědnosti – povinné ručení nebo odpovědnost za škodu. Jednoduché a rychlé.
            </Text>
          </div>

          <Group grow align="stretch" wrap="wrap">
            <Card shadow="sm" padding="lg" radius="md" withBorder component={Link} href="/onboarding" style={{ textDecoration: "none", color: "inherit" }}>
              <Title order={3} mb="xs">
                Sjednat pojištění
              </Title>
              <Text size="sm" c="dimmed" mb="md">
                Povinné ručení nebo odpovědnost za škodu – vyplňte formulář a získejte nabídku.
              </Text>
              <Button variant="light" fullWidth>
                Začít
              </Button>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder component={Link} href="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
              <Title order={3} mb="xs">
                Přehled smluv
              </Title>
              <Text size="sm" c="dimmed" mb="md">
                Prohlédněte si své smlouvy a nabídky v jednoduchém přehledu.
              </Text>
              <Button variant="light" fullWidth>
                Otevřít přehled
              </Button>
            </Card>
          </Group>

          <Text size="xs" c="dimmed">
            Prototyp – žádná data se neukládají. Styling inspirován JerryPoj (Lundegaard).
          </Text>
        </Stack>
      </AppShell>
    </RequireAuth>
  );
}

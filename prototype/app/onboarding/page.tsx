"use client";

import { Title, Text, Stack } from "@mantine/core";
import { RequireAuth } from "@/components/RequireAuth";
import { AppShell } from "@/components/AppShell";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <RequireAuth>
      <AppShell>
        <Stack gap="md">
          <div>
            <Title order={1} mb="xs">
              Sjednat pojištění
            </Title>
            <Text c="dimmed">
              Vyplňte údaje – povinné ručení nebo odpovědnost za škodu. Hotovo za pár minut.
            </Text>
          </div>
          <OnboardingWizard />
        </Stack>
      </AppShell>
    </RequireAuth>
  );
}

"use client";

import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { theme } from "@/lib/theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isSignedIn } from "../auth";
import { AppShell } from "../components/AppShell";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (!isSignedIn()) throw redirect({ to: "/sign-in" });
  },
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

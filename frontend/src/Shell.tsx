import { AppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Grid } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ROUTES from "./MyRoutes";

const router = createBrowserRouter(ROUTES);

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  useDocumentTitle("CH's Tech Assessment");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: '300',
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Grid>
          <Grid.Col span={1}>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              style={{ marginTop: 16 }}
            />
          </Grid.Col>
          <Grid.Col span={11}>
            <h3>Chris's CTA Tech Assessment</h3>
          </Grid.Col>
        </Grid>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {ROUTES.map((route) => (
          <NavLink
            key={route.path}
            href={route.path}
            label={route.label}
            leftSection={route.icon}
            active={window.location.pathname === route.path}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <RouterProvider router={router} />
      </AppShell.Main>
    </AppShell>
  );
}

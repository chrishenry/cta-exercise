import { Home } from './Pages/Home';
import { PrimaryResults } from './Pages/PrimaryResults';
import { IpTools } from './Pages/IpTools';
import { IconHome2, IconActivity, IconCircleOff } from '@tabler/icons-react';

const ROUTES = [
  {
    path: "/",
    label: "Home",
    element: <Home />,
    icon: <IconHome2 size="1rem" stroke={1.5} />,
  },
  {
    path: "/primary-results",
    label: "Primary Results",
    element: <PrimaryResults />,
    icon: <IconCircleOff size="1rem" stroke={1.5} />,
  },
  {
    path: "/ip-tools",
    label: "IP Tools",
    element: <IpTools />,
    icon: <IconActivity size="1rem" stroke={1.5} />,
  }
];

export default ROUTES;

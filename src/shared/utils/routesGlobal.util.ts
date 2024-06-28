type Route = {
  name: string;
  path: string;
};

type RoutesGlobal = {
  frontend: Route[];
  backend: Route[];
};

export const routesGlobal: RoutesGlobal = {
  frontend: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Apolice",
      path: "/apolice",
    },
  ],
  backend: [
    {
      name: "Apolice",
      path: "/apolice",
    },
  ],
};

import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import { PolarisVizLightTheme, PolarisVizProvider } from '@shopify/polaris-viz';
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  NavigationTabs,
} from "./components";

import { navStructure } from "./services/data";
import { Frame } from "@shopify/polaris";

export default function App () {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisVizProvider
      themes={{
        Default: {
          ...PolarisVizLightTheme,
          grid: {
            ...PolarisVizLightTheme.grid,
            horizontalOverflow: false
          },
        },
      }}
    >

      <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <NavigationTabs />
              <NavigationMenu
                navigationLinks={navStructure}
              />
              <Frame>
                <Routes pages={pages} />
              </Frame>
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </PolarisProvider>
    </PolarisVizProvider>
  );
}

import { useNavigate } from '@shopify/app-bridge-react';
import { Tabs } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { navStructure } from '../services/data';
import { useLocation } from "react-router-dom";

const IDENTIFIER_PREFIX = 'checkout_app_';

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function NavigationTabs () {
    
    const navigate = useNavigate();

    const currentURL = window.location.href;
    let selectedIndex = 0;
    navStructure.forEach((tab, index) => {
        if (currentURL.includes(`${tab.destination}`)) {
            selectedIndex = index;
        }

    });

    // watch for changes in the URL If the URL changes, update the selected tab
    const location = useLocation();
    useEffect(() => {
        navStructure.forEach((tab, index) => {
            if (location.pathname.includes(`${tab.destination}`)) {
                setSelected(index);
            }
        })
    }, [location]);
     
    const [selected, setSelected] = useState(selectedIndex);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            setSelected(selectedTabIndex);
            navigate(`${navStructure[selectedTabIndex].destination}`)
        },
        [],
    );

  const generateTabsData = (tabs) => {
    let tempTabs = [];
    tabs.forEach(element => {
      tempTabs.push(
        {
          id: `${IDENTIFIER_PREFIX} ${element.label}`,
          content: capitalize(element.label),
          accessibilityLabel: `Main ${capitalize(element.label)}`,
          panelID: IDENTIFIER_PREFIX + `${element.label}-content`,
        })
    });
    return tempTabs;
  }

  return (
    <Tabs
      tabs={generateTabsData(navStructure)}
      selected={selected}
      onSelect={handleTabChange}
      disclosureText="More views">
    </Tabs>
  );
}
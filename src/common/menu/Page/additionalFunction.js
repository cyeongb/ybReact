import React from 'react';

import {
    NotificationsNone as NotificationsIcon,
    FormatSize as TypographyIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,

  } from "@material-ui/icons";

import Dot from "common/Sidebar/components/Dot";
import SidebarLink from "common/Sidebar/components/SidebarLink/SidebarLink";

const additionalFunction = ({location, isSidebarOpened}) => {
    const additionalFunction = [
        
        { menuCode: 'b1', type: "divider" },
        { menuCode: 'b2', type: "title", menuName: "부가 기능 설명" },
        {
          menuCode: 'a1',
          menuName: `Typography`,
          menuUrl: "/app/typography",
          icon: <TypographyIcon />,
        },
    
        { menuCode: 'a2', menuName: "Tables", menuUrl: "/app/tables", icon: <TableIcon /> },
        {
          menuCode: 'a3',
          menuName: "Notifications",
          menuUrl: "/app/notifications",
          icon: <NotificationsIcon />,
        },
        {
          menuCode: 'a4',
          menuName: "UI Elements",
          menuUrl: "/app/ui",
          icon: <UIElementsIcon />,
          subMenuList: [
            { menuCode: 'a41', menuName: "Icons", menuUrl: "/app/ui/icons" },
            { menuCode: 'a42', menuName: "Charts", menuUrl: "/app/ui/charts" },
            { menuCode: 'a43', menuName: "Maps", menuUrl: "/app/ui/maps" },
          ],
        },
        { menuCode: 'a5', type: "divider" },
        { menuCode: 'a6', type: "title", menuName: "HELP" },
        { menuCode: 'a7', menuName: "Library", menuUrl: "", icon: <LibraryIcon /> },
        { menuCode: 'a8', menuName: "Support", menuUrl: "", icon: <SupportIcon /> },
        { menuCode: 'a9', menuName: "FAQ", menuUrl: "", icon: <FAQIcon /> },
        { menuCode: 'a10', type: "divider" },
        { menuCode: 'a11', type: "title", menuName: "PROJECTS" },
        {
          menuCode: 'a12',
          menuName: "My recent",
          menuUrl: "",
          icon: <Dot size="large" color="warning" />,
        },
        {
          menuCode: 'a13',
          menuName: "Starred",
          menuUrl: "",
          icon: <Dot size="large" color="primary" />,
        },
        {
          menuCode: 'a14',
          menuName: "Background",
          menuUrl: "",
          icon: <Dot size="large" color="secondary" />,
        },
      ];
    return (
        <div>
            {additionalFunction.map(link => (
                <SidebarLink
                    key={link.menuCode}
                    location={location}
                    isSidebarOpened={isSidebarOpened}
                    {...link}
                />
            ))}
        </div>
    );
};

export default additionalFunction;
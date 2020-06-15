import React, { useState, useEffect } from "react";

import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "common/Sidebar/styles";

// components
import MenuStructure from "common/menu/Page/menuStructure";
import AdditionalFuncion from "common/menu/Page/additionalFunction";
import SidebarLink from "common/Sidebar/components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "common/context/LayoutContext";

function Sidebar(props) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();

    return () => {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  // 메뉴바가 아닌 일반적인 기능들을 하게될 메뉴 만들기위한 structure
  const mainStructure = [
    { id: 0, menuName: "메인 홈", menuUrl: "/hboard", icon: <HomeIcon /> },
  ];

  console.log("sidebar");
  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        <div>
          {mainStructure.map(link => (
            <SidebarLink
              key={link.id}
              location={props.location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </div>
        <MenuStructure
          isSidebarOpened={isSidebarOpened}
          location={props.location}
        />
        <AdditionalFuncion
          isSidebarOpened={isSidebarOpened}
          location={props.location}
        />
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);

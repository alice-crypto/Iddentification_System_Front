import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  AccountBox as AdministrationIcon,
  CreditCard as IdentityCartIcon,
  Search as AvisIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Administration",
    link: "/app/user",
    icon: <AdministrationIcon />,
    children: [
      { label: "New User", link: "/app/user/createuser" },
      { label: "All Users", link: "/app/user/listuser" },
    ],
  },
  {
    id: 2,
    label: "Cartes d'identités",
    link: "/app/card",
    icon: <IdentityCartIcon />,
    children: [
      { label: "Post New Card", link: "/app/card/createCard" },
      { label: "List All Card", link: "/app/card/listCard" },
    ],
  },
  {
    id: 3,
    label: "Avis de recherches",
    link: "/app/avis",
    icon: <AvisIcon />,
    children: [
      { label: "Create Avis", link: "/app/avis/createAvis" },
      { label: "List Avis", link: "/app/avis/listAvis" },
    ],
  },
  { id: 4, type: "divider" },
  { id: 5, type: "title", label: "REPORTING" },
  {
    id: 6,
    label: "Reporting",
    link: "/app/reporting",
    icon: <UIElementsIcon />,
    children: [
      { label: "Create", link: "/app/reporting/CreateReporting" },
      { label: "List", link: "/app/reporting/charts" },
    ],
  }
  
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

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
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
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

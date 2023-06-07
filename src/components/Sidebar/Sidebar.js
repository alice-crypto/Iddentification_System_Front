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
    label: "Typography",
    link: "/app/typography",
    icon: <TypographyIcon />,
  },
  { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  {
    id: 3,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "Administration",
    link: "/app/ui",
    icon: <AdministrationIcon />,
    children: [
      { label: "New User", link: "/app/ui/icons" },
      { label: "All Users", link: "/app/ui/charts" },
    ],
  },
  {
    id: 5,
    label: "Cartes d'identités",
    link: "/app/ui",
    icon: <IdentityCartIcon />,
    children: [
      { label: "Post New Card", link: "/app/ui/createCard" },
      { label: "List All Card", link: "/app/ui/listCard" },
    ],
  },
  {
    id: 6,
    label: "Avis de recherches",
    link: "/app/ui",
    icon: <AvisIcon />,
    children: [
      { label: "Create Avis", link: "/app/ui/createAvis" },
      { label: "List Avis", link: "/app/ui/listAvis" },
    ],
  },
  { id: 15, type: "divider" },
  { id: 16, type: "title", label: "REPORTING" },
  {
    id: 17,
    label: "Reporting",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Create", link: "/app/ui/CreateReporting" },
      { label: "List", link: "/app/ui/charts" },
    ],
  },
  {
    id: 18,
    label: "Department",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Create", link: "/app/ui/icons" },
      { label: "List", link: "/app/ui/charts" },
    ],
  },
  {
    id: 19,
    label: "Borought",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Create", link: "/app/ui/icons" },
      { label: "List", link: "/app/ui/charts" },
    ],
  },
  {
    id: 20,
    label: "Authority",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Create", link: "/app/ui/icons" },
      { label: "List", link: "/app/ui/charts" },
    ],
  },
  {
    id: 20,
    label: "Commissariat",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Create", link: "/app/ui/icons" },
      { label: "List", link: "/app/ui/charts" },
    ],
  },


  
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

import { ChevronLeft, SettingsOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { sideBarItems } from "data";
const Sidebar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
  isNonMobile,
}) => {
  const { pathname } = useLocation();

  const [active, setactive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setactive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            width: drawerWidth,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.background.default,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary[300],
              borderRadius: "4px",
              border: `2px solid ${theme.palette.background.alt}`,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  ECOMVISION
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <List>
            {sideBarItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setactive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box bottom="2rem" m="1rem 0 0 0">
          <Divider />
          <FlexBetween m="1rem 1rem">
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              width="40px"
              height="40px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography>
            </Box>
            <SettingsOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
          </FlexBetween>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

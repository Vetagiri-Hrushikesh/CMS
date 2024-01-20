// // Layout.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import CssBaseline from '@mui/material/CssBaseline';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={toggleSidebar}
//             edge="start"
//             sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <h1>My App</h1>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
//         }}
//         open={isSidebarOpen}
//       >
//         <Toolbar />
//         <List>
//           <ListItem button component={Link} to="/mp/1">
//             <ListItemText primary="MP 1" />
//           </ListItem>
//           {/* Add more links as needed */}
//         </List>
//       </Drawer>
//       <div style={{ flexGrow: 1, padding: '20px' }}>{children}</div>
//     </div>
//   );
// };

// export default Layout;

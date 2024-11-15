// // Layout.js
// import { Box, AppBar, Typography, Toolbar, IconButton, Drawer, Divider } from '@mui/material';
// import { Link } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useState } from 'react';
// import '../Style/style.css'

// const Layout = ({ children, showBackgroundImage = true }) => {
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };

//     const drawer = (
//         <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//             <Typography color={"goldenrod"} variant='h6' component="div" sx={{ flexGrow: 1, my: 2 }}>Fio Products</Typography>
//             <Divider />
//             <ul className='mobilename'>
//                 <li><Link to={'/'}>Home</Link></li>
//                 <li><Link to={'/about'}>About</Link></li>
//                 <li><Link to={'/product'}>Product</Link></li>
//                 <li><Link to={'/contect'}>Contact</Link></li>
//             </ul>
//         </Box>
//     );

//     return (
//         <Box>
//             <AppBar component={"nav"} style={{ backgroundColor: "black" }}>
//                 <Toolbar>
//                     <IconButton color='inherit' aria-label='open drawer' edge="start" sx={{ mr: 2, display: { sm: "none" } }} onClick={handleDrawerToggle}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography color='white' variant='h6' component="div" sx={{ flexGrow: 1 }}>Fio Products</Typography>
//                     <Box sx={{ display: { xs: "none", sm: "block" } }}>
//                         <ul className='navication'>
//                             <li><Link to={'/'}>Home</Link></li>
//                             <li><Link to={'/about'}>About</Link></li>
//                             <li><Link to={'/product'}>Product</Link></li>
//                             <li><Link to={'/contect'}>Contact</Link></li>
//                         </ul>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Box component="nav">
//                 <Drawer
//                     variant='temporary'
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     sx={{
//                         display: { xs: 'block', sm: "none" },
//                         "& .MuiDrawer-paper": {
//                             boxSizing: 'border-box',
//                             width: "240px"
//                         }
//                     }}
//                 >
//                     {drawer}
//                 </Drawer>
//             </Box>
//             <Box
//                 sx={{
//                     minHeight: '100vh',
//                     width: '100%',
//                     // position: 'relative',
//                     position:'fixed',
//                     right:0,
//                     // color: 'white',
//                     marginTop:"56px"
//                 }}
//             >
//                 {children}
//             </Box>
//         </Box>
//     );
// };

// export default Layout;

import { Box, AppBar, Typography, Toolbar, IconButton, Drawer, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import '../Style/style.css';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography color={"goldenrod"} variant='h6' component="div" sx={{ flexGrow: 1, my: 2 }}>Fio Products</Typography>
            <Divider />
            <ul className='mobilename'>
                <li><ScrollLink to='home' smooth={true} duration={500}>Home</ScrollLink></li>
                <li><ScrollLink to='about' smooth={true} duration={500}>About</ScrollLink></li>
                <li><ScrollLink to='product' smooth={true} duration={500}>Product</ScrollLink></li>
                <li><ScrollLink to='contact' smooth={true} duration={500}>Contact</ScrollLink></li>
            </ul>
        </Box>
    );

    return (
        <Box>
            <AppBar component={"nav"} style={{ backgroundColor: "black" }}>
                <Toolbar>
                    <IconButton color='inherit' aria-label='open drawer' edge="start" sx={{ mr: 2, display: { sm: "none" } }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography color='white' variant='h6' component="div" sx={{ flexGrow: 1 }}>Fio Products</Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <ul className='navication'>
                            <li><ScrollLink to='home' smooth={true} duration={500}>Home</ScrollLink></li>
                            <li><ScrollLink to='about' smooth={true} duration={500}>About</ScrollLink></li>
                            <li><ScrollLink to='product' smooth={true} duration={500}>Product</ScrollLink></li>
                            <li><ScrollLink to='contact' smooth={true} duration={500}>Contact</ScrollLink></li>
                        </ul>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        display: { xs: 'block', sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: 'border-box',
                            width: "240px"
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: '100%',
                    position: 'relative',
                    marginTop: "56px"
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;


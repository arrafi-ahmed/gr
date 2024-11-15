


import React, { useEffect, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

const ShopOwnerUpdateProduct = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [pinnumber, setPinNumber] = useState('');
    const { userId } = location.state || {};
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        if (userId) {
            setCurrentUser(userId);
        } else {
            console.error('User ID not found in state');
        }
    }, [userId]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const getOrderDetails = await axios.get(`http://localhost:4000/shopsDetails/${currentUser}`);
                if (getOrderDetails.data.length > 0) {
                    const pincode = getOrderDetails.data[0].shoppin;  // Assuming 'shoppin' represents the pincode
                    setPinNumber(pincode);
                }
            } catch (err) {
                console.log('Error fetching order details:', err);
            }
        };

        if (currentUser) {
            fetchOrderDetails();
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchProductsByPincode = async () => {
            if (pinnumber) {
                try {
                    const res = await axios.get(`http://localhost:4000/products`, {
                        params: { shopid: pinnumber }
                    });
                    setFormData(res.data);
                } catch (error) {
                    console.error("Error fetching products:", error.response?.data || error.message);
                }
            }
        };

        fetchProductsByPincode();
    }, [pinnumber]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAlerSubmit = (label) => {
        if (label === "Add inventory") {
            navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
        } else if (label === "View Order") {
            navigate('/updateProductsDetails', { state: { userId: currentUser } });
        } else if (label === 'Update product') {
            navigate('/shopownerUpdateproduct', { state: { userId: currentUser } });
        } else if (label === 'Logout') {
            navigate('/shopownerlogoutPage', { state: { userId: currentUser } });
        }else if(label === 'PrivatePolicy'){
            navigate('/shopOwnerPrivatePolicy',{ state: { userId: currentUser } })

        }
    };

    const handleDeleteOpen = (product) => {
        console.log(product);
        console.log("***********");
        
        
        setProductToDelete(product);
        setOpenDeleteDialog(true);
        console.log(product);
        
    };

    const handleDeleteClose = () => {
        setOpenDeleteDialog(false);
        setProductToDelete(null);
    };


    const handleDelete = async () => {
        console.log(productToDelete);
        
        if (productToDelete) {
            try {
                await axios.delete(`http://localhost:4000/delete${productToDelete.type.charAt(0).toUpperCase() + productToDelete.type.slice(1)}/${productToDelete.id}`);
                setFormData(formData.filter(product => product.id !== productToDelete.id));
            } catch (error) {
                console.error("Error deleting product:", error);
            } finally {
                handleDeleteClose();
            }
        }
    };

    const handleEdit = (product) => {
        console.log(product);
        
        if (editingProduct && editingProduct.id === product.id) {
            // Save changes
            const updateProduct = async () => {
                try {
                    await axios.put(`http://localhost:4000/update${product.type.charAt(0).toUpperCase() + product.type.slice(1)}/${product.id}`, editingProduct);
                    setFormData(formData.map(p => (p.id === product.id ? editingProduct : p)));
                    setEditingProduct(null);
                } catch (error) {
                    console.error("Error updating product:", error);
                }
            };
            updateProduct();
        } else {
            // Start editing
            setEditingProduct(product);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct((prev) => ({ ...prev, [name]: value }));
    };

    const filteredProducts = formData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
             <AppBar position="fixed">
                <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add inventory', 'View Order', 'Update product', 'PrivatePolicy', 'Logout'].map((label) => (
                <Button
                    key={label}
                    onClick={() => handleAlerSubmit(label)}
                    color="inherit"
                    sx={{
                        margin: '0 10px',
                        fontSize: '13px',
                        marginRight: '100px',
                        ':hover': {
                            backgroundColor: 'primary.main', // Adjust color
                            color: '#800040', // Adjust text color on hover
                        },
                    }}
                >
                    {label}
                </Button>
            ))}
        </Box>
        
        {/* Username and Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        <IconButton
        color="inherit"
        onClick={() => navigate('/shopOwnerProfile', { state: { userId: currentUser } })}
      >
        <AccountCircle />
      </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
    </Toolbar>
</AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List className="drawer">
                    {['Add inventory', 'View Order', 'Update product',  'PrivatePolicy','Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle} className="list-item">
                            <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box sx={{ padding: 2,mt:"84px" }}>
                <Typography variant="h4" gutterBottom>
                    Products
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        sx={{ marginLeft: 150,marginBottom:"10px" }}
                    />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Image</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Unit</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Price</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Qty</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Actions</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Delete</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>
                                        {editingProduct && editingProduct.id === product.id ? (
                                            <TextField
                                                name="name"
                                                value={editingProduct.name}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingProduct && editingProduct.id === product.id ? (
                                            <TextField
                                                name="image_url"
                                                value={editingProduct.image_url}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingProduct && editingProduct.id === product.id ? (
                                            <TextField
                                                name="unit"
                                                value={editingProduct.unit}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            product.unit
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingProduct && editingProduct.id === product.id ? (
                                            <TextField
                                                name="price"
                                                value={editingProduct.price}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingProduct && editingProduct.id === product.id ? (
                                            <TextField
                                                name="qty"
                                                value={editingProduct.qty}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            product.qty
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(product)} color="primary" variant="contained" size="small" sx={{ marginRight: 2,marginBottom:1 }}>
                                            {editingProduct && editingProduct.id === product.id ? 'Save' : 'Edit'}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                    <Button onClick={() => handleDeleteOpen(product)} color="secondary" variant="contained" size="small">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Delete Confirmation Dialog */}
                <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the product: {productToDelete?.name}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default ShopOwnerUpdateProduct;


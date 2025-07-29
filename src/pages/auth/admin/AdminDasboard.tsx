import { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardActionArea,
    Avatar,
    useTheme,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const drawerWidth = 200;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const chartData = [
    { name: "Packages", value: 10 },
    { name: "Users", value: 25 },
    { name: "Bookings", value: 15 },
    { name: "Other", value: 5 },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [darkMode, setDarkMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const features = [
        {
            title: "Add Package",
            description: "Create new travel packages",
            icon: <AddBoxIcon fontSize="large" />,
            path: "/admin/packages/add",
            color: theme.palette.primary.main
        },
        {
            title: "View Packages",
            description: "Browse and manage all packages",
            icon: <Inventory2Icon fontSize="large" />,
            path: "/admin/packages",
            color: theme.palette.success.main
        },
        {
            title: "Users",
            description: "Manage registered users",
            icon: <GroupIcon fontSize="large" />,
            path: "/admin/users",
            color: theme.palette.info.main
        },
        {
            title: "Bookings",
            description: "See all bookings",
            icon: <ReceiptLongIcon fontSize="large" />,
            path: "/admin/bookings",
            color: theme.palette.warning.main
        }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
                }}
            >
                <Toolbar />
                <List>
                    {features.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => navigate(item.path)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg">
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                        👨‍💼 Admin Dashboard
                    </Typography>

                    <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                            md: 'repeat(4, 1fr)'
                        }}}>
                        {features.map((feature, idx) => (
                            <Card key={idx} elevation={4} sx={{ borderRadius: 3 }}>
                                <CardActionArea onClick={() => navigate(feature.path)}>
                                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: feature.color,
                                                width: 56,
                                                height: 56,
                                                mx: "auto",
                                                mb: 2
                                            }}
                                        >
                                            {feature.icon}
                                        </Avatar>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>

                    <Box mt={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            📊 Analytics Overview
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {chartData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

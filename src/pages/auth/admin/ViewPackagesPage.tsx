// src/pages/admin/ViewPackagesPage.tsx
import { useEffect } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    CircularProgress,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages, deletePackage } from "../../../store/slices/packageSlice";
import  type { RootState, AppDispatch } from '../../../store';
import { useNavigate } from "react-router-dom";

const ViewPackagesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { packages, loading} = useSelector((state: RootState) => state.package);

    useEffect(() => {
        dispatch(getAllPackages());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            dispatch(deletePackage(id));
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                📦 All Travel Packages
            </Typography>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Package Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price Per Person</TableCell>
                                <TableCell>Duration (Days)</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {packages.map((pkg) => (
                                <TableRow key={pkg._id}>
                                    <TableCell>{pkg.name}</TableCell>
                                    <TableCell>{pkg.description}</TableCell>
                                    <TableCell>${pkg.pricePerPerson.toFixed(2)}</TableCell>
                                    <TableCell>{pkg.durationDays}</TableCell>
                                    <TableCell>
                                        <img
                                            src={pkg.imageURL}
                                            alt={pkg.name}
                                            style={{ width: 80, borderRadius: 8 }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/admin/packages/edit/${pkg._id}`)}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(pkg._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {packages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No packages found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default ViewPackagesPage;

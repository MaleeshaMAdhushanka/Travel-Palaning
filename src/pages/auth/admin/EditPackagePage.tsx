// src/pages/admin/EditPackagePage.tsx
import { useEffect, useState } from "react";
import type { FormEvent } from "react"; // ✅ type-only import
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
    getPackagesById,
    updatePackage,
} from "../../../store/slices/packageSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPackagePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pricePerPerson, setPricePerPerson] = useState<number>(0);
    const [durationDays, setDurationDays] = useState<number>(1);
    const [image, setImage] = useState<File | null>(null);

    const { packages, loading } = useSelector((state: RootState) => state.package);

    useEffect(() => {
        if (id) {
            const pkg = packages.find((p) => p._id === id);
            if (pkg) {
                setName(pkg.name);
                setDescription(pkg.description);
                setPricePerPerson(pkg.pricePerPerson);
                setDurationDays(pkg.durationDays);
            } else {
                dispatch(getPackagesById(id));
            }
        }
    }, [dispatch, id, packages]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("pricePerPerson", pricePerPerson.toString());
        formData.append("durationDays", durationDays.toString());
        if (image) {
            formData.append("image", image);
        }

        const result = await dispatch(updatePackage({ id, formData })); // ✅ correct param
        if (updatePackage.fulfilled.match(result)) {
            navigate("/admin/packages");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    ✏️ Edit Travel Package
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        required
                        label="Package Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={3}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        required
                        label="Price per Person"
                        type="number"
                        value={pricePerPerson}
                        onChange={(e) => setPricePerPerson(Number(e.target.value))}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        required
                        label="Duration Days"
                        type="number"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        margin="normal"
                    />

                    <Box sx={{ mt: 2 }}>
                        <InputLabel>Change Image (optional)</InputLabel>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImage(file);
                            }}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        Update Package
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditPackagePage;

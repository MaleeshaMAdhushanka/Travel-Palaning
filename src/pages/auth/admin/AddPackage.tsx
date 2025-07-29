import { useState, type FormEvent } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type {AppDispatch} from "../../../store";
import { createPackage } from "../../../store/slices/packageSlice";
import { useNavigate } from "react-router-dom";

const AddPackagePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pricePerPerson, setPricePerPerson] = useState<number>(0);
    const [durationDays, setDurationDays] = useState<number>(1);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("pricePerPerson", pricePerPerson.toString());
        formData.append("durationDays", durationDays.toString());
        formData.append("image", image);

        const resultAction = await dispatch(createPackage(formData));

        if (createPackage.fulfilled.match(resultAction)) {
            navigate("/admin/packages");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    ➕ Add New Travel Package
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
                        inputProps={{ min: 0 }}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Duration (in Days)"
                        type="number"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        margin="normal"
                        inputProps={{ min: 1 }}
                    />

                    <Box sx={{ mt: 2 }}>
                        <InputLabel sx={{ mb: 1 }}>Upload Image</InputLabel>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImage(file);
                            }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Create Package
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddPackagePage;

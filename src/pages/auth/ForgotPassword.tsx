import { TextField, Button, Typography, Paper, Box, Container, Divider } from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store";
import {forgotPassword} from "../../store/slices/authSlice.ts";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [emailSent, setEmailSent] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailSent(false);
        
        if (!validateForm()) return;

        const resultAction = await dispatch(forgotPassword(email));

        if (forgotPassword.fulfilled.match(resultAction)) {
            setEmailSent(true);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6">
            <Container maxWidth="xs">
                <Paper elevation={4} className="rounded-2xl overflow-hidden shadow-md">
                    {/* Header with streamlined design */}
                    <Box className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white relative">
                        {/* Decorative pattern overlay */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTcgMTdjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3IDE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3IDE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6Ii8+PC9nPjwvc3ZnPg==')]"></div>
                        
                        <Typography variant="h5" component="h1" className="font-bold text-center relative z-10">
                            Forgot Password
                        </Typography>
                        <Typography variant="body2" className="text-center text-blue-100 mt-1 relative z-10">
                            Enter your email to reset your password
                        </Typography>
                    </Box>

                    {/* Form section with tighter spacing */}
                    <Box className="px-5 pt-4 pb-3">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <TextField
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                fullWidth
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) {
                                        setErrors((prev) => ({ ...prev, email: "" }));
                                    }
                                }}
                                error={!!errors.email}
                                helperText={errors.email}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4F46E5',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#4F46E5',
                                    },
                                }}
                                margin="dense"
                            />
                            
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                className="bg-indigo-600 hover:bg-indigo-700 normal-case"
                                disabled={isLoading}
                                sx={{
                                    bgcolor: '#4F46E5',
                                    '&:hover': {
                                        bgcolor: '#4338CA',
                                    },
                                    mt: 1.5,
                                    py: 1,
                                    fontSize: '0.95rem',
                                    borderRadius: '10px'
                                }}
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                            
                            {emailSent && (
                                <Box className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                                    If an account with that email exists, a password reset link has been sent.
                                </Box>
                            )}
                            
                            {error && (
                                <Box className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                    {error}
                                </Box>
                            )}
                        </form>
                    </Box>

                    <Divider className="mx-5" />

                    <Box className="p-4 text-center">
                        <Typography variant="body2" className="text-gray-600">
                            Remember your password?{" "}
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                                Back to login
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </div>

    );
};

export default ForgotPassword;
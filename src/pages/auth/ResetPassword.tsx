import { TextField, Button, Typography, Paper, Box, Container, Divider, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPassword } from "../../store/slices/authSlice";
import type {AppDispatch, RootState} from "../../store";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useParams<{ token: string }>();

    const { isLoading } = useSelector((state: RootState) => state.auth);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (!token) {
            console.error("Token is missing");
            return;
        }

        await dispatch(resetPassword({ token, password }));
        navigate("/login");
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
                            Reset Password
                        </Typography>
                        <Typography variant="body2" className="text-center text-blue-100 mt-1 relative z-10">
                            Create a new password for your account
                        </Typography>
                    </Box>

                    {/* Form section with tighter spacing */}
                    <Box className="px-5 pt-4 pb-3">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <TextField
                                id="password"
                                name="password"
                                label="New Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) {
                                        setErrors((prev) => ({ ...prev, password: "" }));
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: '#6366F1' }}
                                            >
                                                {showPassword ? (
                                                    <span className="material-icons text-sm">visibility_off</span>
                                                ) : (
                                                    <span className="material-icons text-sm">visibility</span>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
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

                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (errors.confirmPassword) {
                                        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: '#6366F1' }}
                                            >
                                                {showConfirmPassword ? (
                                                    <span className="material-icons text-sm">visibility_off</span>
                                                ) : (
                                                    <span className="material-icons text-sm">visibility</span>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
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
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Button>
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

export default ResetPassword;

import axios, {type AxiosError} from "axios";
import {toast} from "sonner";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface Package {
    _id: string;
    name: string;
    description: string;
    pricePerPerson: number;
    durationDays: number;
    imageURL: string;

}

interface PackageState{
    packages: Package[];
    selectedPackage: Package| null;
    loading: boolean;
    error: string | null;
}

const initialState: PackageState = {
    packages: [],
    selectedPackage: null,
    loading: false,
    error: null,
};

//create a new package
const API_URL = import.meta.env.VITE_API_URL;


export const createPackage = createAsyncThunk (
    "package/create",
    async (formData: FormData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/packages`, formData);
            toast.success("Package created successfully!");
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            const msg = error.response?.data?.message || "Failed to create package";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }


);

//get All package
export const getAllPackages = createAsyncThunk(
    "package/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/packages`);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            const msg = error.response?.data?.message || "Failed to fetch packages";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

//get single package

export const getPackagesById = createAsyncThunk(
    "package/fetchById",
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/packages/${id}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            const msg = error.response?.data?.message || "Failed to fetch packages";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const updatePackage = createAsyncThunk(
    "package/update",
    async ({id, formData}: {id: string, formData: FormData}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${API_URL}/packages/${id}`, formData);
            toast.success("Package updated successfully!");
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            const msg = error.response?.data?.message || "Failed to update packages";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

//Delete package
export const deletePackage = createAsyncThunk(
    "package/delete",
    async (id: string, {rejectWithValue}) => {
        try {
            await axios.delete(`${API_URL}/packages/${id}`);
            toast.success("Package deleted successfully!");
            return id; // Return the ID of the deleted package
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            const msg = error.response?.data?.message || "Failed to delete packages";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

const packageSlice = createSlice({
    name:"package",
    initialState,
    reducers: {
        clearSelectedPackage: (state) => {
            state.selectedPackage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPackages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.packages = action.payload;
            })
            .addCase(getAllPackages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getPackagesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackagesById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPackage = action.payload;
            })
            .addCase(getPackagesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createPackage.fulfilled, (state, action) => {
                state.packages.push(action.payload);
            })

            .addCase(updatePackage.fulfilled, (state, action) => {
                state.packages = state.packages.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
            })

            .addCase(deletePackage.fulfilled, (state, action) => {
                state.packages = state.packages.filter((p) => p._id !== action.payload);
            });
    },
});

export const { clearSelectedPackage } = packageSlice.actions;


export default packageSlice.reducer;
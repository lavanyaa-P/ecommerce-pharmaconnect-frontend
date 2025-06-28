import React, { useState } from "react";
import {
    TextField,
    Grid,
    CircularProgress,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { uploadToCoudinary } from "../../../Util/uploadToCoudinary";

// CATEGORY IMPORTS
import { mainCategory } from "../../../data/category/mainCategory";
import { babyMotherCareLevelTwo } from "../../../data/category/level two/babyMotherCareLevelTwo";
import { babyMotherCareLevelThree } from "../../../data/category/level three/babyMotherCareLevelThree";
import { healthcareProductsLevelTwo } from "../../../data/category/level two/healthcareProductsLevelTwo";
import { healthcareLevelThree } from "../../../data/category/level three/healthcareLevelThree";
import { personalCareLevelTwo } from "../../../data/category/level two/personalCareLevelTwo";
import { personalCareLevelThree } from "../../../data/category/level three/personalCareLevelThree";
import { wellnessNutritionLevelTwo } from "../../../data/category/level two/wellnessNutritionLevelTwo";
import { wellnessNutritionLevelThree } from "../../../data/category/level three/wellnessNutritionLevelThree";

const AddProduct = () => {
    const [uploading, setUploading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            mrpPrice: "",
            sellingPrice: "",
            quantity: "",
            images: [],
            category: "",
            subCategory: "",
            subSubCategory: "",
        },
        onSubmit: (values) => {
            console.log("Form Submitted:", values);
        },
    });

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const imageUrl = await uploadToCoudinary(file);
        formik.setFieldValue("images", [...formik.values.images, imageUrl]);
        setUploading(false);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };

    // Dynamic level 2 options
    const getLevelTwoOptions = () => {
        switch (formik.values.category) {
            case "babyMotherCare":
                return babyMotherCareLevelTwo;
            case "healthcare":
                return healthcareProductsLevelTwo;
            case "personalCare":
                return personalCareLevelTwo;
            case "wellnessNutrition":
                return wellnessNutritionLevelTwo;
            default:
                return [];
        }
    };

    // Dynamic level 3 options
    const getLevelThreeOptions = () => {
        let allOptions = [];
        switch (formik.values.category) {
            case "babyMotherCare":
                allOptions = babyMotherCareLevelThree;
                break;
            case "healthcare":
                allOptions = healthcareLevelThree;
                break;
            case "personalCare":
                allOptions = personalCareLevelThree;
                break;
            case "wellnessNutrition":
                allOptions = wellnessNutritionLevelThree;
                break;
            default:
                return [];
        }
        // Filter level 3 based on selected subCategory
        return allOptions.filter(item => item.parentCategoryId === formik.values.subCategory);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
            <Grid container spacing={2}>
                {/* Image Upload */}
                <Grid item xs={12} className="flex flex-wrap gap-5">
                    <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="fileInput" className="relative">
                        <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                            <AddPhotoAlternateIcon className="text-gray-700" />
                        </span>
                        {uploading && (
                            <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center bg-white/80">
                                <CircularProgress />
                            </div>
                        )}
                    </label>

                    <div className="flex flex-wrap gap-2">
                        {formik.values.images.map((image: string, index: number) => (
                            <div className="relative" key={index}>
                                <img
                                    className="w-24 h-24 object-cover border"
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                />
                                <IconButton
                                    onClick={() => handleRemoveImage(index)}
                                    size="small"
                                    color="error"
                                    sx={{ position: "absolute", top: 0, right: 0 }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </Grid>

                {/* Prices */}
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="mrpPrice"
                        name="mrpPrice"
                        label="MRP Price"
                        type="number"
                        value={formik.values.mrpPrice}
                        onChange={formik.handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="sellingPrice"
                        name="sellingPrice"
                        label="Selling Price"
                        type="number"
                        value={formik.values.sellingPrice}
                        onChange={formik.handleChange}
                    />
                </Grid>

                {/* Level 1 - Main Category */}
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={formik.values.category}
                            onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue("subCategory", "");
                                formik.setFieldValue("subSubCategory", "");
                            }}
                            label="Category"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {mainCategory.map((item) => (
                                <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Level 2 - Sub Category */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth required disabled={!formik.values.category}>
                        <InputLabel id="subCategory-label">Sub Category</InputLabel>
                        <Select
                            labelId="subCategory-label"
                            id="subCategory"
                            name="subCategory"
                            value={formik.values.subCategory}
                            onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue("subSubCategory", "");
                            }}
                            label="Sub Category"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {getLevelTwoOptions().map((sub) => (
                                <MenuItem key={sub.categoryId} value={sub.categoryId}>{sub.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Level 3 - Sub Sub Category */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth required disabled={!formik.values.subCategory}>
                        <InputLabel id="subSubCategory-label">Sub Sub Category</InputLabel>
                        <Select
                            labelId="subSubCategory-label"
                            id="subSubCategory"
                            name="subSubCategory"
                            value={formik.values.subSubCategory}
                            onChange={formik.handleChange}
                            label="Sub Sub Category"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {getLevelThreeOptions().map((sub3) => (
                                <MenuItem key={sub3.categoryId} value={sub3.categoryId}>{sub3.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddProduct;

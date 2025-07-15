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
import { babyMotherCareLevelThree } from "../../../data/category/level three/babyMotherCareLevelThree";
import { healthcareLevelThree } from "../../../data/category/level three/healthcareLevelThree";
import { personalCareLevelThree } from "../../../data/category/level three/personalCareLevelThree";
import { wellnessNutritionLevelThree } from "../../../data/category/level three/wellnessNutritionLevelThree";
import { coldFluLevelThree } from "../../../data/category/level three/coldFluLevelThree";
import { womenCareLevelThree } from "../../../data/category/level three/womenCareLevelThree";
import { ayurvedicLevelThree } from "../../../data/category/level three/ayurvedicLevelThree";
import { boneJointPainLevelThree } from "../../../data/category/level three/boneJointPainLevelThree";
import { homeopathyLevelThree } from "../../../data/category/level three/homeopathyLevelThree";
import { vitaminsSupplementsLevelThree } from "../../../data/category/level three/vitaminsSupplementsLevelThree";

import { useAppDispatch } from "../../../State/Store";
import { createProduct } from "../../../State/seller/sellerProductSlice";

const AddProduct = () => {
  const [uploading, setUploading] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      images: [] as string[],
      category: "",
      subCategory: "",
      subSubCategory: "",
    },
    onSubmit: (values) => {
      console.log("Final Payload:", values);
      dispatch(
        createProduct({
          request: values,
          jwt: localStorage.getItem("jwt"),
        })
      )
        .then((res) => {
          console.log("Product created successfully:", res);
        })
        .catch((err) => {
          console.error("Product creation failed:", err);
        });
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

  const getLevelTwoOptions = () => {
    const selectedMain = mainCategory.find(cat => cat.categoryId === formik.values.category);
    return selectedMain ? selectedMain.levelTwoCategory : [];
  };

  const getLevelThreeOptions = () => {
    switch (formik.values.category) {
      case "baby_mother_care":
        return babyMotherCareLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "healthcare_products":
        return healthcareLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "personal_care":
        return personalCareLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "wellness_nutrition":
        return wellnessNutritionLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "cold_flu":
        return coldFluLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "women_care":
        return womenCareLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "ayurvedic":
        return ayurvedicLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "bone_joint_pain":
        return boneJointPainLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "homeopathy":
        return homeopathyLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      case "vitamins_supplements":
        return vitaminsSupplementsLevelThree.filter(item => item.parentCategoryId === formik.values.subCategory);
      default:
        return [];
    }
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
            {formik.values.images.map((image, index) => (
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

        {/* Quantity */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
          />
        </Grid>

        {/* Main Category */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue("category", value);
                formik.setFieldValue("subCategory", "");
                formik.setFieldValue("subSubCategory", "");
              }}
              label="Category"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {mainCategory.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryId}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sub Category */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required disabled={!formik.values.category}>
            <InputLabel id="subCategory-label">Sub Category</InputLabel>
            <Select
              labelId="subCategory-label"
              id="subCategory"
              name="subCategory"
              value={formik.values.subCategory}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue("subCategory", value);
                formik.setFieldValue("subSubCategory", "");
              }}
              label="Sub Category"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {getLevelTwoOptions().map((sub) => (
                <MenuItem key={sub.categoryId} value={sub.categoryId}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sub Sub Category */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth disabled={!formik.values.subCategory}>
            <InputLabel id="subSubCategory-label">Sub Sub Category</InputLabel>
            <Select
              labelId="subSubCategory-label"
              id="subSubCategory"
              name="subSubCategory"
              value={formik.values.subSubCategory}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue("subSubCategory", value);
              }}
              label="Sub Sub Category"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {getLevelThreeOptions().map((sub3) => (
                <MenuItem key={sub3.categoryId} value={sub3.categoryId}>
                  {sub3.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <button
            type="submit"
            style={{
              backgroundColor: "#003399",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProduct;

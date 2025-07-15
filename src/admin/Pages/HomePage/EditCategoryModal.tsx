// EditCategoryModal.tsx
import React, { useState } from 'react';
import { HomeCategory } from '../../../types/homeCategoryType';
import { useAppDispatch } from '../../../State/Store';
import {
  updateHomeCategory,
  fetchHomeCategories
} from '../../../State/admin/adminSlice';

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  open: boolean;
  onClose: () => void;
  category: HomeCategory;
};

const EditCategoryModal = ({ open, onClose, category }: Props) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(category.name || '');
  const [image, setImage] = useState(category.image || '');

  const handleUpdate = async () => {
    try {
      // ✅ Update category
      await dispatch(updateHomeCategory({
        id: category.id!,
        data: {
          ...category,
          name,
          image
        }
      })).unwrap();

      // ✅ Re-fetch updated list
      dispatch(fetchHomeCategories());

      // ✅ Show toast and close modal
      toast.success('Category updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update category!');
      console.error('Update error:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: 400
      }}>
        <Typography variant="h6" gutterBottom>Edit Category</Typography>
        <TextField
          fullWidth
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleUpdate}>Update</Button>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;

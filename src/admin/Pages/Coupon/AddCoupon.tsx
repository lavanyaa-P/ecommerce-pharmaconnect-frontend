import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';

interface CouponFormValues {
    code: string;
    discountPercentage: number;
    validityStartDate: Dayjs | null;
    validityEndDate: Dayjs | null;
    minimumOrderValue: number;
}

const AddCoupon = () => {
    const formik = useFormik<CouponFormValues>({
        initialValues: {
            code: '',
            discountPercentage: 0,
            validityStartDate: null,
            validityEndDate: null,
            minimumOrderValue: 0,
        },
        onSubmit: (values) => {
            const formatedValues = {
                ...values,
                validityStartDate: values.validityStartDate?.toISOString(),
                validityEndDate: values.validityEndDate?.toISOString(),
            };
            console.log('form submitted', values, formatedValues);
        },
    });

    return (

        <div>
        <h1 className="text-2xl font-bold text-primary-color pb-5 text-center">Create New Coupon</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="code"
                                label="Coupon Code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
                            />
                        </Grid2>

                        <Grid2 xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="discountPercentage"
                                label="Discount Percentage"
                                type="number"
                                value={formik.values.discountPercentage}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.discountPercentage &&
                                    Boolean(formik.errors.discountPercentage)
                                }
                                helperText={
                                    formik.touched.discountPercentage &&
                                    formik.errors.discountPercentage
                                }
                            />
                        </Grid2>

                        <Grid2 xs={12} sm={6}>
                            <DatePicker
                                label="Validity Start Date"
                                value={formik.values.validityStartDate}
                                onChange={(value) =>
                                    formik.setFieldValue('validityStartDate', value)
                                }
                                sx={{ width: '100%' }}
                                slotProps={{
                                    textField: {
                                        error:
                                            formik.touched.validityStartDate &&
                                            Boolean(formik.errors.validityStartDate),
                                        helperText:
                                            formik.touched.validityStartDate &&
                                            formik.errors.validityStartDate,
                                    },
                                }}
                            />
                        </Grid2>

                        <Grid2 xs={12} sm={6}>
                            <DatePicker
                                label="Validity End Date"
                                value={formik.values.validityEndDate}
                                onChange={(value) =>
                                    formik.setFieldValue('validityEndDate', value)
                                }
                                sx={{ width: '100%' }}
                                slotProps={{
                                    textField: {
                                        error:
                                            formik.touched.validityEndDate &&
                                            Boolean(formik.errors.validityEndDate),
                                        helperText:
                                            formik.touched.validityEndDate &&
                                            formik.errors.validityEndDate,
                                    },
                                }}
                            />
                        </Grid2>

                        <Grid2 xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="minimumOrderValue"
                                label="Minimum Order Value"
                                type="number"
                                value={formik.values.minimumOrderValue}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.minimumOrderValue &&
                                    Boolean(formik.errors.minimumOrderValue)
                                }
                                helperText={
                                    formik.touched.minimumOrderValue &&
                                    formik.errors.minimumOrderValue
                                }
                            />
                        </Grid2>
                        <Grid2 xs={12}>
                            <Button variant='contained' fullWidth sx={{py:".8rem"}}>
                                Create Coupon
                            </Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </LocalizationProvider>
        </div>
    );
};

export default AddCoupon;

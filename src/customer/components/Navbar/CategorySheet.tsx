import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { healthcareProductsLevelTwo } from '../../../data/category/level two/healthcareProductsLevelTwo';
import { babyMotherCareLevelTwo } from '../../../data/category/level two/babyMotherCareLevelTwo';
import { personalCareLevelTwo } from '../../../data/category/level two/personalCareLevelTwo';
import { wellnessNutritionLevelTwo } from '../../../data/category/level two/wellnessNutritionLevelTwo';

import { healthcareLevelThree } from '../../../data/category/level three/healthcareLevelThree';
import { babyMotherCareLevelThree } from '../../../data/category/level three/babyMotherCareLevelThree';
import { personalCareLevelThree } from '../../../data/category/level three/personalCareLevelThree';
import { wellnessNutritionLevelThree } from '../../../data/category/level three/wellnessNutritionLevelThree';

const categoryTwo = {
    'Healthcare Products': healthcareProductsLevelTwo,
    'Baby & Mother Care': babyMotherCareLevelTwo,
    'Personal Care': personalCareLevelTwo,
    'Wellness & Nutrition': wellnessNutritionLevelTwo,
};

const categoryThree = {
    Healthcare_Products: healthcareLevelThree,
    BabyMotherCare: babyMotherCareLevelThree,
    PersonalCare: personalCareLevelThree,
    WellnessNutrition: wellnessNutritionLevelThree,
};

const categoryKeyMap: { [key: string]: keyof typeof categoryThree } = {
    'Healthcare Products': 'Healthcare_Products',
    'Baby & Mother Care': 'BabyMotherCare',
    'Personal Care': 'PersonalCare',
    'Wellness & Nutrition': 'WellnessNutrition',
};

type CategorySheetProps = {
    selectedCategory: string;
    setShowSheet?: (show: boolean) => void;
};

const CategorySheet: React.FC<CategorySheetProps> = ({ selectedCategory }) => {
    const navigate = useNavigate();

    const level2List = categoryTwo[selectedCategory as keyof typeof categoryTwo];
    const key = categoryKeyMap[selectedCategory as keyof typeof categoryKeyMap];
    const level3List = key ? categoryThree[key] : [];

    const getChildren = (level3Array: any[], parentId: string) => {
        return level3Array?.filter((item) => item.parentCategoryId === parentId) || [];
    };

    if (!level2List || !Array.isArray(level2List)) {
        return (
            <Box sx={{ zIndex: 2 }} className="bg-white shadow-lg lg:h-[500px] overflow-y-auto p-6">
                <p className="text-gray-500">No category selected or invalid category.</p>
            </Box>
        );
    }

    return (
        <Box sx={{ zIndex: 2 }} className="bg-white shadow-lg lg:h-[500px] overflow-y-auto p-6">
            <div className="flex flex-wrap gap-4 justify-between text-sm">
                {level2List.map((level2, index) => (
                    <div
                        key={level2.categoryId}
                        className={`lg:w-[22%] w-full text-left p-4 rounded-md ${index % 2 === 0 ? 'bg-slate-50' : ''
                            }`}
                    >
                        <p className="text-primary-color mb-4 font-semibold text-[18px]">{level2.name}</p>
                        <ul className="list-disc pl-5 space-y-3 text-gray-800 text-[15px] leading-relaxed">
                            {getChildren(level3List, level2.categoryId).map((level3) => (
                                <li
                                    onClick={() => navigate("/products/" + level3.categoryId)}
                                    key={level3.categoryId}
                                    className="hover:text-primary-color cursor-pointer"
                                >
                                    {level3.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default CategorySheet;

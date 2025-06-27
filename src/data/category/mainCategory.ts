export const mainCategory = [
    {
        name: "Healthcare Products",
        categoryId: "healthcare_products",
        level: 1,
        levelTwoCategory: [
            {
            name: "Health Monitors",
            categoryId: "health_monitors",
            parentCategoryId: "healthcare_products",
            level: 2
            },
            {
            name: "Supplements",
            categoryId: "supplements",
            parentCategoryId: "healthcare_products",
            level: 2
            },
            {
            name: "Supports & Braces",
            categoryId: "supports_braces",
            parentCategoryId: "healthcare_products",
            level: 2
            }
        ]
    },
    {
        name: "Baby & Mother Care",
        categoryId: "baby_mother_care",
        level: 1,
        levelTwoCategory: [
            {
            name: "Baby Essentials",
            categoryId: "baby_essentials",
            parentCategoryId: "baby_mother_care",
            level: 2
            },
            {
            name: "Baby Lotion",
            categoryId: "baby_lotion",
            parentCategoryId: "baby_mother_care",
            level: 2
            }
        ]
    },
    {
        name: "Wellness & Nutrition",
        categoryId: "wellness_nutrition",
        level: 1,
        levelTwoCategory: [
            {
            name: "Vitamins",
            categoryId: "vitamins",
            parentCategoryId: "wellness_nutrition",
            level: 2
            },
            {
            name: "Multivitamin Tablets",
            categoryId: "multivitamin_tablets",
            parentCategoryId: "wellness_nutrition",
            level: 2
            }
        ]
    },
    {
        name: "Personal Care",
        categoryId: "personal_care",
        level: 1,
        levelTwoCategory: [
        {
            name: "Hair Care",
            categoryId: "hair_care",
            parentCategoryId: "personal_care",
            level: 2
        },
        {
            name: "Shampoo",
            categoryId: "shampoo",
            parentCategoryId: "personal_care",
            level: 2
        }
    ]
    }
];

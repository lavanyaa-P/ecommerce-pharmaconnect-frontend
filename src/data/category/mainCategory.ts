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
        level: 2,
        levelThreeCategory: [
          { name: "Digital Thermometers", categoryId: "digital_thermometers", level: 3 },
          { name: "Blood Pressure Monitors", categoryId: "bp_monitors", level: 3 },
          { name: "Glucometers", categoryId: "glucometers", level: 3 },
          { name: "Pulse Oximeters", categoryId: "pulse_oximeters", level: 3 },
          { name: "ECG Devices", categoryId: "ecg_devices", level: 3 },
          { name: "Weighing Scales", categoryId: "weighing_scales", level: 3 },
          { name: "Nebulizers", categoryId: "nebulizers", level: 3 },
          { name: "Cholesterol Testing Kits", categoryId: "cholesterol_testing_kits", level: 3 }
        ]
      },
      {
        name: "Support & Mobility",
        categoryId: "support_mobility",
        parentCategoryId: "healthcare_products",
        level: 2,
        levelThreeCategory: [
          { name: "Walking Sticks", categoryId: "walking_sticks", level: 3 },
          { name: "Wheelchairs", categoryId: "wheelchairs", level: 3 },
          { name: "Knee & Elbow Supports", categoryId: "knee_elbow_supports", level: 3 },
          { name: "Back Braces", categoryId: "back_braces", level: 3 }
        ]
      },
      {
        name: "First Aid & Safety",
        categoryId: "first_aid_safety",
        parentCategoryId: "healthcare_products",
        level: 2,
        levelThreeCategory: [
          { name: "Bandages & Gauze", categoryId: "bandages_gauze", level: 3 },
          { name: "Hot & Cold Packs", categoryId: "hot_cold_packs", level: 3 },
          { name: "Antiseptic Creams", categoryId: "antiseptic_creams", level: 3 },
          { name: "First Aid Kits", categoryId: "first_aid_kits", level: 3 }
        ]
      },
      {
        name: "Medical Devices",
        categoryId: "medical_devices",
        parentCategoryId: "healthcare_products",
        level: 2,
        levelThreeCategory: [
          { name: "Surgical Gloves", categoryId: "surgical_gloves", level: 3 },
          { name: "Face Masks", categoryId: "face_masks", level: 3 },
          { name: "Syringes & Needles", categoryId: "syringes_needles", level: 3 },
          { name: "IV Cannulas", categoryId: "iv_cannulas", level: 3 }
        ]
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
        level: 2,
        levelThreeCategory: [
          { name: "Baby Powder", categoryId: "baby_powder", level: 3 },
          { name: "Baby Detergent", categoryId: "baby_detergent", level: 3 },
          { name: "Baby Nail Cutter", categoryId: "baby_nail_cutter", level: 3 },
          { name: "Baby Comb Sets", categoryId: "baby_comb_sets", level: 3 },
          { name: "Baby Wipes", categoryId: "baby_wipes", level: 3 }
        ]
      },
      {
        name: "Baby Bath & Hygiene",
        categoryId: "baby_bath_hygiene",
        parentCategoryId: "baby_mother_care",
        level: 2,
        levelThreeCategory: [
          { name: "Baby Lotion", categoryId: "baby_lotion", level: 3 },
          { name: "Baby Soap & Shampoo", categoryId: "baby_soap_shampoo", level: 3 },
          { name: "Baby Massage Oil", categoryId: "baby_massage_oil", level: 3 }
        ]
      },
      {
        name: "Diapers & Wipes",
        categoryId: "diapers_wipes",
        parentCategoryId: "baby_mother_care",
        level: 2,
        levelThreeCategory: [
          { name: "Newborn Diapers", categoryId: "newborn_diapers", level: 3 },
          { name: "Pants Style Diapers", categoryId: "pants_style_diapers", level: 3 },
          { name: "Diaper Rash Cream", categoryId: "diaper_rash_cream", level: 3 }
        ]
      },
      {
        name: "Mother Care",
        categoryId: "mother_care",
        parentCategoryId: "baby_mother_care",
        level: 2,
        levelThreeCategory: [
          { name: "Maternity Wear", categoryId: "maternity_wear", level: 3 },
          { name: "Nursing Pads", categoryId: "nursing_pads", level: 3 },
          { name: "Stretch Mark Cream", categoryId: "stretch_mark_cream", level: 3 }
        ]
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
        level: 2,
        levelThreeCategory: [
          { name: "Multivitamin Tablets", categoryId: "multivitamin_tablets", level: 3 },
          { name: "Vitamin C Chewables", categoryId: "vitamin_c_chewables", level: 3 },
          { name: "Vitamin D Drops", categoryId: "vitamin_d_drops", level: 3 },
          { name: "B-Complex Capsules", categoryId: "b_complex_capsules", level: 3 },
          { name: "Prenatal Vitamins", categoryId: "prenatal_vitamins", level: 3 },
          { name: "Kids Gummies", categoryId: "kids_gummies", level: 3 },
          { name: "Hair, Skin & Nails Vitamins", categoryId: "hair_skin_nails_vitamins", level: 3 },
          { name: "Elderly Support Supplements", categoryId: "elderly_support_supplements", level: 3 }
        ]
      },
      {
        name: "Protein & Fitness",
        categoryId: "protein_fitness",
        parentCategoryId: "wellness_nutrition",
        level: 2,
        levelThreeCategory: [
          { name: "Whey Protein", categoryId: "whey_protein", level: 3 },
          { name: "Plant Protein", categoryId: "plant_protein", level: 3 },
          { name: "Mass Gainers", categoryId: "mass_gainers", level: 3 },
          { name: "Pre-Workout", categoryId: "pre_workout", level: 3 },
          { name: "Post-Workout", categoryId: "post_workout", level: 3 }
        ]
      },
      {
        name: "Herbal Supplements",
        categoryId: "herbal_supplements",
        parentCategoryId: "wellness_nutrition",
        level: 2,
        levelThreeCategory: [
          { name: "Ashwagandha Capsules", categoryId: "ashwagandha_capsules", level: 3 },
          { name: "Turmeric Tablets", categoryId: "turmeric_tablets", level: 3 },
          { name: "Ginger Extracts", categoryId: "ginger_extracts", level: 3 },
          { name: "Neem Capsules", categoryId: "neem_capsules", level: 3 }
        ]
      },
      {
        name: "Weight Management",
        categoryId: "weight_management",
        parentCategoryId: "wellness_nutrition",
        level: 2,
        levelThreeCategory: [
          { name: "Fat Burners", categoryId: "fat_burners", level: 3 },
          { name: "Meal Replacements", categoryId: "meal_replacements", level: 3 },
          { name: "Appetite Suppressants", categoryId: "appetite_suppressants", level: 3 },
          { name: "Keto Supplements", categoryId: "keto_supplements", level: 3 }
        ]
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
        level: 2,
        levelThreeCategory: [
          { name: "Shampoo", categoryId: "shampoo", level: 3 },
          { name: "Conditioner", categoryId: "conditioner", level: 3 },
          { name: "Hair Oil", categoryId: "hair_oil", level: 3 },
          { name: "Hair Serum", categoryId: "hair_serum", level: 3 },
          { name: "Hair Masks", categoryId: "hair_masks", level: 3 },
          { name: "Anti-dandruff Solutions", categoryId: "anti_dandruff_solutions", level: 3 },
          { name: "Hair Fall Control Products", categoryId: "hair_fall_control", level: 3 },
          { name: "Hair Color", categoryId: "hair_color", level: 3 }
        ]
      },
      {
        name: "Skin Care",
        categoryId: "skin_care",
        parentCategoryId: "personal_care",
        level: 2,
        levelThreeCategory: [
          { name: "Face Wash", categoryId: "face_wash", level: 3 },
          { name: "Moisturizers", categoryId: "moisturizers", level: 3 },
          { name: "Sunscreens", categoryId: "sunscreens", level: 3 },
          { name: "Night Creams", categoryId: "night_creams", level: 3 }
        ]
      },
      {
        name: "Oral Care",
        categoryId: "oral_care",
        parentCategoryId: "personal_care",
        level: 2,
        levelThreeCategory: [
          { name: "Toothpaste", categoryId: "toothpaste", level: 3 },
          { name: "Toothbrushes", categoryId: "toothbrushes", level: 3 },
          { name: "Mouthwash", categoryId: "mouthwash", level: 3 },
          { name: "Tongue Cleaners", categoryId: "tongue_cleaners", level: 3 }
        ]
      },
      {
        name: "Men's Grooming",
        categoryId: "mens_grooming",
        parentCategoryId: "personal_care",
        level: 2,
        levelThreeCategory: [
          { name: "Beard Oil", categoryId: "beard_oil", level: 3 },
          { name: "Shaving Cream", categoryId: "shaving_cream", level: 3 },
          { name: "Razors", categoryId: "razors", level: 3 },
          { name: "Aftershave", categoryId: "aftershave", level: 3 }
        ]
      }
    ]
  }
];

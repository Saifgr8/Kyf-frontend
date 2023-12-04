function calculateMacronutrients(
  weight,
  height,
  age,
  gender,
  activityLevel,
  dietType
) {
  // Calculate Basal Metabolic Rate (BMR) using the Harris-Benedict equation
  let bmr;
  if (gender === "male") {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else if (gender === "female") {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);
  } else {
    bmr = 300 + (11 * weight) + (3.3 * height) - (4.8 * age);
  }

  // Adjust BMR based on activity level
  const activityFactors = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725,
  };

  if (!activityFactors[activityLevel]) {
    throw new Error("Invalid activity level");
  }

  const maintenanceCalories = bmr * activityFactors[activityLevel];

  // Define macronutrient percentages based on diet type
  const dietTypeToMacronutrients = {
    maintain: {  protein: 22.5, fat: 27.5, carbohydrate: 55, sugars: 5 },
    cut: { protein: 30, fat: 25, carbohydrate: 45, sugars: 3 },
    bulk: { protein: 30, fat: 27.5, carbohydrate: 55, sugars: 4 },
  };

  if (!dietTypeToMacronutrients[dietType]) {
    throw new Error("Invalid diet type");
  }

  const caloriesAcctoDietType = () => {
    if (dietType === "maintain") {
      return maintenanceCalories;
    } else if (dietType === "cut") {
      return maintenanceCalories - 500;
    } else if (dietType === "bulk") {
      return maintenanceCalories + 500;
    }
  };

  const macroNutrientObject = {};

  macroNutrientObject.calories = caloriesAcctoDietType().toFixed(2);
  macroNutrientObject.protein = (
    (caloriesAcctoDietType() * dietTypeToMacronutrients[dietType].protein) /
    400
  ).toFixed(2);
  macroNutrientObject.fat = (
    ((caloriesAcctoDietType() * dietTypeToMacronutrients[dietType].fat) /
    100)/9
  ).toFixed(2);
  macroNutrientObject.carbs = (
    (caloriesAcctoDietType() *
      dietTypeToMacronutrients[dietType].carbohydrate) /
    400
  ).toFixed(2);
  macroNutrientObject.sugars = (
    (caloriesAcctoDietType() * dietTypeToMacronutrients[dietType].sugars) /
    400
  ).toFixed(2);
  macroNutrientObject.fiber = (
    (caloriesAcctoDietType() * 0.14) /
    8
  ).toFixed(2);
  
  return macroNutrientObject;
}

module.exports = calculateMacronutrients;

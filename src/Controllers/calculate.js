const { meals } = require("../data/meals");

exports.calculateTable = async (req, res) => {
  const { calories } = req.body;

  const breakfastCalories = Math.round(calories * 0.3);
  const lunchCalories = Math.round(calories * 0.4);
  const dinnerCalories = Math.round(calories * 0.3);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const separateByCalories = (foods, maxCalories) => {
    let firstArray = [];
    let secondArray = [];
    let totalCalories = 0;

    for (let i = 0; i < foods.length; i++) {
      let food = foods[i];
      if (totalCalories + food.calory <= maxCalories && i < 3) {
        firstArray.push(food);
        totalCalories += food.calory;
      } else if(secondArray.length < 3){
        secondArray.push(food);
      }
    }

    return { currentFoods: firstArray, moreFoods: secondArray };
  };

  let breakfastFoods = meals.filter((food) => {
    return food.calory <= breakfastCalories && food.types === "bf";
  });
  breakfastFoods = shuffle(breakfastFoods);

  let lunchFoods = meals.filter((food) => {
    return food.calory <= lunchCalories && food.types === "ln";
  });
  lunchFoods = shuffle(lunchFoods);

  let dinnerFoods = meals.filter((food) => {
    return food.calory <= dinnerCalories && food.types === "dn";
  });
  dinnerFoods = shuffle(dinnerFoods);

  return res.status(200).json({
    breakfast: separateByCalories(breakfastFoods, breakfastCalories),
    lunch: separateByCalories(lunchFoods, lunchCalories),
    dinner: separateByCalories(dinnerFoods, dinnerCalories),
  });
};

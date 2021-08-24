const fs = require("fs");


//loading Input file

function loadFile() {
  try {
    const data = require('./bmi_data.json');
    return data.BMI_DATA;

  } catch (error) {
    console.log("Failed Loading File " + error)
  }

}

// BMI calculation 
function calculateBMI(bmiData) {
  try {
    if (bmiData.length == 0) throw "Empty Input File"
    for (let record of bmiData) {
      if (record.HeightCm <= 0 || record.WeightKg <= 0) throw "Height ang Weight should be greater than zero "

      let bmiIndex = record.WeightKg / Math.pow(record.HeightCm / 100, 2)
      record["BMI_Value"] = bmiIndex

    }
  } catch (error) {
    console.log(error);
  }
}

// adding fields according to caculated BMI INDEX

function addResults(bmiData) {
  try {


    for (i of bmiData) {

      if (i["BMI_Value"] <= 18.4) {
        i["BMI_Category"] = "Underweight"
        i["Health_Risk"] = "Malnutrition risk"
      } else if (i["BMI_Value"] >= 18.5 && i["BMI_Value"] <= 24.9) {
        i["BMI_Category"] = "Normal Weight"
        i["Health_Risk"] = "Low risk"
      } else if (i["BMI_Value"] >= 25 && i["BMI_Value"] <= 29.9) {
        i["BMI_Category"] = "Overweight"
        i["Health_Risk"] = "Enhanced risk"
      } else if (i["BMI_Value"] >= 30 && i["BMI_Value"] <= 34.9) {
        i["BMI_Category"] = "Moderately obese"
        i["Health_Risk"] = " Medium risk"
      } else if (i["BMI_Value"] >= 35 && i["BMI_Value"] <= 39.9) {
        i["BMI_Category"] = "Severely obese"
        i["Health_Risk"] = "High risk"
      } else {
        i["BMI_Category"] = "Very severely obese"
        i["Health_Risk"] = "Very high risk"
      }

    }


  } catch (error) {
    console.log(error)

  }

}


//counts number of people according to particular category

function count_On_BMI_Category(bmiData, category) {

  var count = 0
  try {
    for (i of bmiData) {
      if (i["BMI_Category"] == category) {
        count++;
      }

    }


    console.log("Then number of " + category + " people are: " + count)

  } catch (error) {
    console.log(error);
  }
}


//saves results into new JSON file

function saveResults(file, content) {
  let jsonData = JSON.stringify(content)
  fs.writeFileSync(file, jsonData)
}

//Functions are called inside try catch
try {
  var bmiData = loadFile();

  calculateBMI(bmiData);

  addResults(bmiData)

  count_On_BMI_Category(bmiData, "Overweight")

  saveResults("bmi_data_Results.json", bmiData)
} catch (err) {
  console.log(err)
}

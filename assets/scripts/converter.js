var property = new Array();
var unit = new Array();
var factor = new Array();
var current_property;

property[0] = "Area";
unit[0] = new Array("Square Millimeter", "Square centimeter", "Square decimeter", "Square meter", "Square kilometer", "Square micrometer", "Square nanometer");
factor[0] = new Array(0.000001, .0001, 0.01, 1, 1000000, 1E+12, 1E+18);

property[1] = "Length";
unit[1] = new Array("Millimeter", "Centimeter", "Decimeter", "Meter", "Kilometer", "Micrometre", "Nanometre");
factor[1] = new Array(0.001, .01, 0.1, 1, 1000, 0.000001, 0.000000001);

property[2] = "Volume & Capacity";
unit[2] = new Array("Cubic Meter", "Cubic decimeter", "Cubic centimeter", "Cubic millimeter", "Liter",  "Deciliter", "Centiliter");
factor[2] = new Array(1, 0.001, .000001, .000000001, 0.001, 0.0001, 0.00001);

property[3] = "Mass";
unit[3] = new Array("Kilogram", "Gram", "Milligram", "Microgram", "Nanogram", "Tonne");
factor[3] = new Array(1, .001, 1E+6, 1E+9, 1E+12, 1000);
/*
FillMenuWithArray(document.form_AA.unit_menu, unit[0],  document.form_A);
FillMenuWithArray(document.form_BB.unit_menu, unit[0], document.form_B);
*/
function UpdateUnitMenu(index_units, unitMenu, value1_menu) {
     // Updates the units displayed in the unitMenu according to the selection of property in the propMenu.
     var i;
     i = index_units;
     FillMenuWithArray(unitMenu, unit[i], value1_menu);
}



function FillMenuWithArray(myMenu, myArray, value1_menu) {
     // Fills the options of myMenu with the elements of myArray.
     // !CAUTION!: It replaces the elements, so old ones will be deleted.
     var i;
     myMenu.length = myArray.length;
     for (i = 0; i < myArray.length; i++) {
          myMenu.options[i].text = myArray[i];
     }
     
     myMenu.selectedIndex = null;
     value1_menu.unit_input.value = 0;    
}

function reverse(myMenu1, myMenu2, value1_menu, value2_menu){
     index_1 = myMenu1.selectedIndex;
     index_2 = myMenu2.selectedIndex;
     myMenu2.selectedIndex = index_1;
     myMenu1.selectedIndex = index_2;

     value1 = value1_menu.unit_input.value;
     value2 = value2_menu.unit_input.value;
     
     value1_menu.unit_input.value = value2;
     value2_menu.unit_input.value = value1;
}

function CalculateUnit(sourceForm, sourceProp, targetForm, targetProp) {
     // A simple wrapper function to validate input before making the conversion
     var sourceValue = sourceForm.unit_input.value;

     // First check if the user has given numbers or anything that can be made to one...
     sourceValue = parseFloat(sourceValue);
     if (!isNaN(sourceValue) || sourceValue == 0) {
          // If we can make a valid floating-point number, put it in the text box and convert!
          sourceForm.unit_input.value = sourceValue;
          ConvertFromTo(sourceForm, sourceProp, targetForm, targetProp);
     }
}

function new_prop(number){
     current_property = number;
}
function get_new_prop() {
     return current_property;
}

function ConvertFromTo(sourceForm, sourceProp, targetForm, targetProp) {
     // Converts the contents of the sourceForm input box to the units specified in the targetForm unit menu and puts the result in the targetForm input box.In other words, this is the heart of the whole script...
     var propIndex;
     var sourceIndex;
     var sourceFactor;
     var targetIndex;
     var targetFactor;
     var result;

     // Start by checking which property we are working in...
     propIndex = current_property;

     // Let's determine what unit are we converting FROM (i.e. source) and the factor needed to convert that unit to the base unit.
     sourceIndex = sourceProp.unit_menu.selectedIndex;
     sourceFactor = factor[propIndex][sourceIndex];

     // Cool! Let's do the same thing for the target unit - the units we are converting TO:
     targetIndex = targetProp.unit_menu.selectedIndex;
     targetFactor = factor[propIndex][targetIndex];

     // Simple, huh? let's do the math: a) convert the source TO the base unit: (The input has been checked by the CalculateUnit function).

     result = sourceForm.unit_input.value;
     result = result * sourceFactor;
     // not done yet... now, b) use the targetFactor to convert FROM the base unit
     // to the target unit...
     result = result / targetFactor;


     // Ta-da! All that's left is to update the target input box:
     if (sourceForm.unit_input.value == null){
          targetForm.unit_input.value = 0;
     }
     else {
          targetForm.unit_input.value = result;
     }
}


function toggleCheckMetric() {
     var prop = get_new_prop();
 
     /*IF both are checked */
     if (document.getElementById("check1").checked == false) {
          if (document.getElementById("check2").checked == true) {
               unit[0] = new Array("Perch", "Rood", "Acre");
               factor[0] = new Array(25.29285264, 1011.7141056, 4046.8564224);
               

               unit[1] = new Array("Thou", "Inch", "Foot", "Yard", "Chain", "Furlong", "Mile", "League");
               factor[1] = new Array(0.0000254, 0.0254, 0.3048, 0.9144, 20.1168, 201.168, 1609.344, 4828.032);
               

               unit[2] = new Array("Fluid ounce", "Tablespoon", "Teaspoon", "Pint", "Quart", "Gallon", "Cup");
               factor[2] = new Array(2.8413E-5, 1.7758E-5, 5.9194E-6, 0.000568261, 0.00113652, 0.00454609, 0.000284131);
               

               unit[3] = new Array("Ounce", "Pound", "Stone", "Quarter", "Hundredweight", "Ton");
               factor[3] = new Array(0.0283, 0.45359237, 6.35029, 12.70059, 50.80235, 1016.04691);
               UpdateUnitMenu(prop, document.form_AA.unit_menu, document.form_A);
               UpdateUnitMenu(prop, document.form_BB.unit_menu, document.form_B);
               new_prop(prop);
          } else {
               unit[0] = [];
               factor[0] = [];
               

               unit[1] = [];
               factor[1] = [];
               

               unit[2] = [];
               factor[2] = [];
               

               unit[3] = [];
               factor[3] = [];
               UpdateUnitMenu(prop, document.form_AA.unit_menu, document.form_A);
               UpdateUnitMenu(prop, document.form_BB.unit_menu, document.form_B);
               new_prop(prop);
          }
     } else {
          if (document.getElementById("check2").checked == true) {
               unit[0] = new Array("Square Millimeter", "Square centimeter", "Square decimeter", "Square meter", "Square kilometer", "Square micrometer", "Square nanometer", "Perch", "Rood", "Acre");
               factor[0] = new Array(0.000001, .0001, 0.01, 1, 1000000, 1E+12, 1E+18, 25.29285264, 1011.7141056, 4046.8564224);
               

               unit[1] = new Array("Millimeter", "Centimeter", "Decimeter", "Meter", "Kilometer", "Micrometre", "Nanometre", "Thou", "Inch", "Foot", "Yard", "Chain", "Furlong", "Mile", "League");
               factor[1] = new Array(0.001, .01, 0.1, 1, 1000, 0.000001, 0.000000001, 0.0000254, 0.0254, 0.3048, 0.9144, 20.1168, 201.168, 1609.344, 4828.032);
               

               unit[2] = new Array("Cubic Meter", "Cubic decimeter", "Cubic centimeter", "Cubic millimeter", "Liter", "Deciliter", "Centiliter", "Fluid ounce", "Tablespoon", "Teaspoon", "Pint", "Quart", "Gallon", "Cup");
               factor[2] = new Array(1, 0.001, .000001, .000000001, 0.001, 0.0001, 0.00001, 2.8413E-5, 1.7758E-5, 5.9194E-6, 0.000568261, 0.00113652, 0.00454609, 0.000284131);
               

               unit[3] = new Array("Kilogram", "Gram", "Milligram", "Microgram", "Nanogram", "Tonne", "Ounce", "Pound", "Stone", "Quarter", "Hundredweight", "Ton");
               factor[3] = new Array(1, .001, 1E+6, 1E+9, 1E+12, 1000, 0.0283, 0.45359237, 6.35029, 12.70059, 50.80235, 1016.04691);
               UpdateUnitMenu(prop, document.form_AA.unit_menu, document.form_A);
               UpdateUnitMenu(prop, document.form_BB.unit_menu, document.form_B);
               new_prop(prop);
          } else {
               unit[0] = new Array("Square Millimeter", "Square centimeter", "Square decimeter", "Square meter", "Square kilometer", "Square micrometer", "Square nanometer");
               factor[0] = new Array(0.000001, .0001, 0.01, 1, 1000000, 1E+12, 1E+18);
               

               unit[1] = new Array("Millimeter", "Centimeter", "Decimeter", "Meter", "Kilometer", "Micrometre", "Nanometre");
               factor[1] = new Array(0.001, .01, 0.1, 1, 1000, 0.000001, 0.000000001);
               

               unit[2] = new Array("Cubic Meter", "Cubic decimeter", "Cubic centimeter", "Cubic millimeter", "Liter", "Deciliter", "Centiliter");
               factor[2] = new Array(1, 0.001, .000001, .000000001, 0.001, 0.0001, 0.00001);
               

               unit[3] = new Array("Kilogram", "Gram", "Milligram", "Microgram", "Nanogram", "Tonne");
               factor[3] = new Array(1, .001, 1E+6, 1E+9, 1E+12, 1000);
               UpdateUnitMenu(prop, document.form_AA.unit_menu, document.form_A);
               UpdateUnitMenu(prop, document.form_BB.unit_menu, document.form_B);
               new_prop(prop);
          }

     }
     
}


window.addEventListener('load', function() {
  var form = document.getElementById('userData');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var height1 = form.elements.userHeight1.value;
    var height2 = form.elements.userHeight2.value;
    var weight = form.elements.userWeight.value;
    var age = form.elements.userAge.value;
    var maleChecked = document.getElementById('malecheck').checked;
    var femaleChecked = document.getElementById('femalecheck').checked;
    var calMod = document.getElementById('calMod').value;
    console.log(calMod)
    var userState = "placeholder"
    var userBMI = 0
    var userBMR = 0
    var trueCals = 0
    console.log(maleChecked)
    console.log(femaleChecked)
    async function main(){
      let pyodide = await loadPyodide();
        pyodide.runPython(`
          age = ${age}
          weight = ${weight}
          userState = "placeholder"
          NewWeight = weight * 703
          FeetHeight = ${height1}
          InchesHeight = ${height2}
          NewFH = FeetHeight * 12
          TotalInches = NewFH + InchesHeight
          BMIinches = TotalInches ** 2
          BMI = NewWeight/BMIinches
          BMI = round(BMI, 1)
          print(BMI)
          if BMI < 18.5:
            userState = "Underweight"
          elif (18.5 <= BMI) and (BMI <= 24.9):
            userState = "Healthy Weight"
          elif (25 <= BMI) and (BMI <= 29.9):
            userState = "Overweight"
          else:
            userState = "Obese"
          if "${maleChecked}" == "true":
            BMR = round(((10*(weight/2.2))+(6.25*(TotalInches*2.54))-(5*age)+5),0)
          elif "${femaleChecked}" == "true":
            BMR = round(((10*(weight/2.2))+(6.25*(TotalInches*2.54))-(5*age)-161),0)
          print(BMR)
          trueCals = round((BMR * ${calMod}),0)
          print(trueCals)
        `);
    let userState = pyodide.globals.get("userState");
    let userBMI = pyodide.globals.get("BMI");
    let userBMR = pyodide.globals.get("BMR");
    let trueCals = pyodide.globals.get("trueCals")
    console.log(userState);
    if (userState == "Underweight"){
      window.location = 'page2.html?userState=' + userState + '&bmi=' + userBMI + '&bmr=' + userBMR + '&trueCals=' + trueCals + '&weight=' + weight;
    } else if (userState == "Healthy Weight"){
        window.location = 'page3.html?userState=' + userState + '&bmi=' + userBMI + '&bmr=' + userBMR + '&trueCals=' + trueCals + '&weight=' + weight;
    } else if (userState == "Overweight"){
      window.location = 'page4.html?userState=' + userState + '&bmi=' + userBMI + '&bmr=' + userBMR + '&trueCals=' + trueCals + '&weight=' + weight;
    } else if (userState == "Obese"){
        window.location = 'page5.html?userState=' + userState + '&bmi=' + userBMI + '&bmr=' + userBMR + '&trueCals=' + trueCals + '&weight=' + weight;
    }
    };
    main();
  });
});
    
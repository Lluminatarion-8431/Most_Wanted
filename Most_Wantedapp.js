"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption.toLowerCase){
    case "info":
    // TODO: get person's info
    displayPerson(person)
    break;
    case "family":
    // TODO: get person's family
    displayFamily(person, people)
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(person, people)
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}


function searchForTrait(people){
  let searchCriteria = promptFor("What trait(s) did you want to search by(separated by comma)? (gender, dob, weight, height, eyeColor, occupation)", chars);
  

  switch(searchCriteria){
     
    case "gender":
      searchByGender();
      break;
    case "dob":
      searchByDob();
      break;
    case "weight":
      searchByWeight();
      break;

    case "height":
      searchByHeight();
      break;

    case "eyeColor":
      searchByEyeColor();
      break;

    case "occupation":
      searchByOccupation();

    case "Finished":

  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })[0]
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByGender(){
  let gender = promptFor("What is the gender you are searching for?", chars)
  let genderChosen = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return genderChosen;
}

function searchByDob(){
  let dob = promptFor("What is the date of birth you are searching for? <x/x/xxxx>", chars)
  let dobChosen = people.filter(function(person){
    if(person.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  return dobChosen;
}

function searchByOccupation(){
  let occupation = promptFor("What is the occupation you are searching for?", chars)
  let occupationChosen = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return occupationChosen;
}

function searchByEyeColor(){
  let eyeColor = promptFor("What is the eye color you are searching for?", chars)
  let eyeColorChosen = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return eyeColorChosen;
}

function searchByWeight(){
  let weight = promptFor("What is the weight you are searching for?", chars)
  let weightChosen = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
  return weightChosen;
}

function searchByHeight(){
  let height = promptFor("What is the height you are searching for?", chars)
  let heightChosen = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  return heightChosen;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "EyeColor: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Spouse: " + person.currentSpouse + "\n"
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamily(person, people)
{
  let personFamilyInfo;
  let parent = displayParents(person, people);
  let spouse = displaySpouse(person, people);
  let siblings = displaySiblings(person, people);

  function displayParents(person, people){
    let parentsToArray = [];
    let parentsToReturn = "";
    parentsToArray = people.filter(function(el){
      if (el.id === person.parents[0] || el.id === person.parents[1]) {
        return true;
      }
    });
    parentsToReturn += parentsToArray[0].firstName + " " + parentsToArray[0].lastName + ", " + parentsToArray[1].firstName + " " + parentsToArray[1].lastName;
    return parentsToReturn;
  }

  function displaySiblings(person, people)
  {
    let siblingsToArray = [];
    let siblingsToReturn = "";
    siblingsToArray = people.filter(function(el){
      if (el.parents.length === 0) {
        return false;
      }
      else if (el === person) {
        return false;
      }
      else if (el.parents[0] === person.parents[0] || el.parents[0] === person.parents[1]) {
        return true;
      }
      else if (el.parents[1] === person.parents[0] || el.parents[1] === person.parents[1]) {
        return true;
      }
    });
    for (var i = 0; i < siblingsToArray.length; i++) {
      siblingsToReturn += siblingsToArray[i].firstName + " " + siblingsToArray[i].lastName + ". ";
    }
    return siblingsToReturn;
  }
  personFamilyInfo = "Parents: " + parent + "\n";
  personFamilyInfo += "Siblings: " + siblings + "\n";
  personFamilyInfo += "Spouse: " + spouse + "\n";
  alert(personFamilyInfo);
}

function displayDescendants(person, people)
{
  let findDescendantsToDisplay = findDescendants(person, people);
  let personDescendantsInfo;

  function findDescendants(person, people) 
  {
    let descendant = getDescendants(person, people);
    let descendantsToReturn = ""; 
    for (let i = 0; i < descendant.length; i++) {
        descendantsToReturn += descendant[i].firstName + " " + descendant[i].lastName + ". ";  
        if (i >= 0) {
            let grandChildren = findDescendants(descendant[i], people);
            descendantsToReturn += grandChildren;
        }
    }
    return descendantsToReturn;
  }
  function getDescendants(person, people) {
    let descendantsToArray = [];  
    descendantsToArray = people.filter(function (el) {
        if (el.parents[0] === person.id || el.parents[1] === person.id) {
          return true;
        }
    }); 
    return descendantsToArray;
  }
  
  personDescendantsInfo += "Descendants: " + findDescendantsToDisplay + "\n";
  alert(personDescendantsInfo);
  app(people);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

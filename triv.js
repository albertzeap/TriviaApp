let fetchQuestion = async () => {

    try{
        let response = await fetch("https://the-trivia-api.com/api/questions");

        if(!response){
            const message = `Error: ${response.status}, ${response.statusText}`;
            const error = new Error(message);
            throw error;
        }

        const questions = await response.json();
        return questions;

    } catch(err) {
        console.error(err.message)
    }
    

}


let questionData;
let index = 0;
let score = 0;
// let question_container = document.getElementById("questions-container");
const question_prompt = document.getElementById("question");
const allAns = document.querySelectorAll(".answer");
const firstAns = document.getElementById("a_text");
const secondAns = document.getElementById("b_text");
const thirdAns = document.getElementById("c_text");
const fourthAns = document.getElementById("d_text");


// Traverses through the array of answers
let createOptions = (incorrect, correct) => {
    let combinedAnswers = new Array();

    // Push all answers into a new array
    incorrect.forEach(incorrectAns => {
        combinedAnswers.push(incorrectAns);
    });
    combinedAnswers.push(correct);
    combinedAnswers.sort();

    // Set the options to the available answers
    firstAns.innerHTML = combinedAnswers[0];
    secondAns.innerHTML = combinedAnswers[1];
    thirdAns.innerHTML = combinedAnswers[2];
    fourthAns.innerHTML = combinedAnswers[3];

}

let saveQuestions = () => {
    fetchQuestion().then((questionObject) => {
        questionData = questionObject;
        console.log(questionObject);
        console.log(questionData);
    });
}


let deselectAnswers = () => {
    allAns.forEach(allAns => allAns.checked = false);
}


let renderQuestion = (i) => {
    // if (index == 9) index = 0;

    // Deselect checked radio inputs
    deselectAnswers();

    i = index;
    question_prompt.innerHTML = questionData[i].question;
    createOptions(questionData[i].incorrectAnswers, questionData[i].correctAnswer);

    index++;
}


saveQuestions();
document.getElementById("submit").addEventListener("click", renderQuestion);

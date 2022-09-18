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
const score_container = document.getElementById("score");
const question_container = document.getElementById("questions-container");
const question_header = document.getElementById("question-header");
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

        // Renders the first question when ready
        question_prompt.innerHTML = questionData[0].question;
        createOptions(questionData[0].incorrectAnswers, questionData[0].correctAnswer);

        console.log(questionObject);
        console.log(questionData);
    });
}

// Deselects all checked answers by setting them to false
let deselectAnswers = () => {
    allAns.forEach(allAns => allAns.checked = false);
}

// Finds checked answer and returns label element's innerHTML
let getAnswer = () => {
    let selectedAnswer;
    allAns.forEach(answer => {
        
        if(answer.checked){
            selectedAnswer = answer.nextElementSibling.innerHTML
        }
    });

    return selectedAnswer;
}


let renderQuestion = () => {

    // Retrieve first selected answer
    const selectedAnswer = getAnswer();
    console.log(`Selected: ${selectedAnswer}`);
    console.log(`Correct: ${questionData[index].correctAnswer}`);

    // Check to see if it is equal to the correct answer
    if(selectedAnswer == questionData[index].correctAnswer){
        score++;
        console.log(score);
    }

    // Update score on screen
    score_container.innerHTML = `<p>${score}/10</p>`;

    // Increment index for next question
    index++;

    if(index < 10){
        question_prompt.innerHTML = questionData[index].question;
        createOptions(questionData[index].incorrectAnswers, questionData[index].correctAnswer);
    }
   

    // Deselect all checked answers;
    deselectAnswers();
}

// Saves the API object into local object
saveQuestions();

document.getElementById("submit").addEventListener("click", () => {


    if (index < 10){
        renderQuestion();
    }
    else{
        question_container.innerHTML = `
        <h2>You scored ${score}/10</h2>

        <button onclick="location.reload()">Reload</button>
        `;
    }
    
});

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

let question_container = document.getElementById("questions-container");
let question_prompt = document.getElementById("question-prompt");


// Traverses through the array of answers
let createOptions = (incorrect, correct, ul) => {
    let combinedAnswers = new Array();

    // Push all answers into a new array
    incorrect.forEach(incorrectAns => {
        combinedAnswers.push(incorrectAns);
    });
    combinedAnswers.push(correct);
    combinedAnswers.sort();

    // Display unordered list of buttons for answers
    combinedAnswers.forEach(option =>{
        let optionLi = document.createElement("button");
        optionLi.innerHTML = option;
        ul.append(optionLi);
    });
}

let renderQuestions = () => {
    fetchQuestion().then((questionObject) => {

        // Traverses through each question array in the object
        questionObject.forEach(question => {
            let question_ = document.createElement("h4");
            let options_list = document.createElement("ul");
            question_.innerHTML = question.question;

            createOptions(question.incorrectAnswers,question.correctAnswer, options_list);


            // Append all the questions and answers into the questions container
            question_container.append(question_);
            question_container.append(options_list);
            // console.log(question.question);
        });
        console.log(questionObject);
    });
}


renderQuestions();
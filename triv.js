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

let questions_array = document.getElementById("questions-container");

let renderQuestions = () => {
    fetchQuestion().then((questionObject) => {
        questions_array.innerHTML = questionObject[0].question;
        console.log(questionObject);
    });
}


renderQuestions();
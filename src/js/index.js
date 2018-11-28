/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */

const getData = async () => {
  const response = await fetch('http://104.248.143.87:1338/question1');
  const json = await response.json();
  console.log(json);
  question(json.question);
  alternatives(json.alternatives);
};
const question = question => {
  const questionDiv = document.getElementById('Question');
  questionDiv.textContent = question;
};
const alternatives = answeres => {
  answeres.forEach(item => {
    console.log(item);
    const alternativesDiv = document.getElementById('alternativesDiv');
    const answere = document.importNode(alternativesDiv.content, true);

    const answereText = answere.getElementById('answereText');
    answereText.textContent = item;

    const template = document.getElementById('template');
    template.appendChild(answere);
    const answeres = document.getElementById('answereInput');
  });
  const answereSend = document.getElementById('answereSend');
  answereSend.addEventListener('click', () => {
    const anwereInput = document.getElementsByClassName('anwereInput');
    const inputArr = Array.from(anwereInput);
    inputArr.forEach(item => {
      If (answereInput.checked) {

      }
    });
  });
};
getData();

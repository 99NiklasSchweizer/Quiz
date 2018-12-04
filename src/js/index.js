/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
import password from './config';

const sendFunction = async option => {
  const response2 = await fetch('http://104.248.143.87:1338/question1', option);
  const json2 = await response2.json();
  getData(json2.nextQuestion);
};
const getData = async url => {
  const response = await fetch(url);
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

    const answereInput = answere.getElementById('answereInput');
    const answereText = answere.getElementById('answereText');
    answereText.textContent = item;
    answereInput.value = item;

    const template = document.getElementById('template');
    template.appendChild(answere);
  });
  const answereSend = document.getElementById('answereSend');
  answereSend.addEventListener('click', () => {
    console.log('osossoo');
    const answereInput = document.getElementsByClassName('answereInput');
    const inputArr = Array.from(answereInput);
    inputArr.forEach(item => {
      if (item.checked) {
        const send = {
          password,
          answer: item.value
        };
        const sendJSON = JSON.stringify(send);
        const option = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: sendJSON
        };
        sendFunction(option);
      }
    });
  });
};
getData('http://104.248.143.87:1338/question1');

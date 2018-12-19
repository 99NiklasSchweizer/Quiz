/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
import password from './config';

let isQuizOver = false;

const sendFunction = async (option, url) => {
  if (url) {
    console.log(url);
    const response2 = await fetch(url, option);
    const json2 = await response2.json();
    console.log({ json2 });
    if (json2.error) {
      console.log('ssssss');
      const wrong = document.getElementById('Question');
      wrong.textContent = json2.error;
      clear();
      return;
    }
    if (json2.nextQuestion === null) {
      quizOver();
    } else {
      console.log('asdasdasd');
      getData(json2.nextQuestion);
    }
  }
};

const getData = async url => {
  if (url && !isQuizOver) {
    const response = await fetch(url);
    const json = await response.json();
    console.log({ json });
    question(json.question);
    if (json.alternatives) {
      alternatives(json.alternatives, url);
    } else {
      textInput(json.question, url);
    }
  }
};
const question = question => {
  const questionDiv = document.getElementById('Question');
  questionDiv.textContent = question;
};
const clear = () => {
  const div = document.getElementById('template');
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  const answere = document.getElementById('answereSend');
  answere.classList.add('hidden');
};
const quizOver = () => {
  clear();
  const text = document.getElementById('Question');
  text.textContent = 'The Quiz is over!';
  isQuizOver = true;
};
const textInput = (input, url) => {
  const div = document.getElementById('template');
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  const inputTemplate = document.getElementById('inputTemplate');
  const Input = document.importNode(inputTemplate.content.firstElementChild, true);
  console.log(Input.value);
  div.appendChild(Input);
  const answereSend = document.getElementById('answereSend');
  answereSend.addEventListener('click', () => {
    const send = {
      password,
      answer: Input.value
    };
    const sendJSON = JSON.stringify(send);
    console.log(sendJSON);
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: sendJSON
    };
    sendFunction(option, url);
  });
  const answere = document.getElementById('answereSend');
  answere.classList.remove('hidden');
};
const alternatives = (answeres, url) => {
  const div = document.getElementById('template');
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
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
        sendFunction(option, url);
      }
    });
  });
  const answere = document.getElementById('answereSend');
  answere.classList.remove('hidden');
};
getData('http://104.248.143.87:1338/question1');

const restart = document.getElementById('restart');
restart.addEventListener('click', () => {
  getData('http://104.248.143.87:1338/question1');
  const answere = document.getElementById('answereSend');
  answere.classList.remove('hidden');
  isQuizOver = false;
});
// function removeElement(id) {
// const removeBtn = document.getElementById(id);
// removeBtn.parentNode.removeChild(removeBtn);
// }
// removeElement('answereSend');

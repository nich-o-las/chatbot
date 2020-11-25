import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import { animateScroll } from 'react-scroll';
import AnimateHeight from 'react-animate-height';
import './style.scss';

const tutors = [
  {
    name: 'Nick',
    avatar: '👦',
    email: 'nick@email.com',
    age: ['8-10', '11-12', '13-15'],
    proficiency: [3,4,5],
    focus: ['Academic', 'Colloquial'],
    gender: ['Man', 'No Preference'],
    schedule: ['M/W/F', 'T/R']
  },
  {
    name: 'Jo',
    avatar: '👩🏾',
    email: 'jo@email.com',
    age: ['5-7','8-10', '11-12'],
    proficiency: [1,2,3,4,5],
    focus: ['Academic', 'Colloquial'],
    gender: ['Woman', 'No Preference'],
    schedule: ['M/W/F', 'Sat/Sun']
  },
  {
    name: 'Dan',
    avatar: '👨🏻',
    email: 'dan@email.com',
    age: ['5-7', '11-12', '13-15'],
    proficiency: [1,2,3,4],
    focus: ['Academic', 'Colloquial'],
    gender: ['Man', 'No Preference'],
    schedule: ['M/W/F', 'Sat/Sun', 'T/R']
  },
  {
    name: 'Sally',
    avatar: '👱🏻‍♀️',
    email: 'sally@email.com',
    age: ['5-7', '8-10', '11-12', '13-15'],
    proficiency: [1,2,3,4,5],
    focus: ['Academic', 'Colloquial'],
    gender: ['Woman', 'No Preference'],
    schedule: ['Sat/Sun', 'T/R']
  },
  {
    name: 'Ja',
    avatar: '🧑🏿',
    email: 'ja@email.com',
    age: ['5-7', '8-10', '11-12'],
    proficiency: [1,2,3,4,5],
    focus: ['Academic', 'Colloquial'],
    gender: ['Man', 'No Preference'],
    schedule: ['Sat/Sun', 'T/R']
  },
  {
    name: 'Randy',
    avatar: '🧔',
    email: 'randy@email.com',
    age: ['5-7', '8-10', '11-12', '13-15'],
    proficiency: [1,2,3,4,5],
    focus: ['Academic', 'Colloquial'],
    gender: ['Man', 'No Preference'],
    schedule: ['Sat/Sun', 'T/R', 'M/W/F']
  },
  {
    name: 'Carla',
    avatar: '👩‍🦰',
    email: 'carla@email.com',
    age: ['5-7', '8-10', '11-12', '13-15'],
    proficiency: [1,2,3,4,5],
    focus: ['Academic', 'Colloquial'],
    gender: ['Woman', 'No Preference'],
    schedule: ['Sat/Sun', 'T/R', 'M/W/F']
  }
];

const questions = [
  {
    question: "How old is your child?",
    title: "age",
    options: ['5-7', '8-10', '11-12', '13-15']
  },
  {
    question: "On a scale of 1 to 5, 5 being the best, how would you rate your child's English proficiency?",
    title: "proficiency",
    options: [1,2,3,4,5]
  },
  {
    question: "What area of English do you want your child to focus on?",
    title: "focus",
    options: ['Academic', 'Colloquial']
  },
  {
    question: "Do you or your child have a gender preference for their teacher?",
    title: "gender",
    options: ['Man', 'Woman', 'No Preference']
  },
  {
    question: "Which class days best fit your schedule?",
    title: "schedule",
    options: ['M/W/F', 'T/R', 'Sat/Sun']
  }
];

export default function Chatbot(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setSpinning] = useState(false);
  const [nextLoaded, setNextLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState({});
  const [matches, setMatches] = useState([]);

  useEffect(()=>{
    if(nextLoaded){
      animateScroll.scrollToBottom({
        containerId: "Chat-message-container"
      });
    }
  },[nextLoaded]);

  useEffect(()=>{
    if(isActive === true){
      setTimeout(()=>{
        setNextLoaded(true);
      },2000);
    }
    if(results !== {}){
      getResults();
    }
  },[isActive]);

  const toggleShowing = () => {
    setSpinning(true);
    setIsOpen(!isOpen);
    setTimeout(()=>{
      setSpinning(false)
    }, 2000);
  };

  const startOver = () => {
    setCurrentQ(0);
    setHistory([]);
    setMatches([]);
    setResults({});
    setIsActive(true);
  };

  const getResults = () => {
    let possibles = tutors.filter(i=>(
      i.age.includes(results.age) &&
      i.gender.includes(results.gender) &&
      i.proficiency.includes(parseInt(results.proficiency)) &&
      i.focus.includes(results.focus) &&
      i.schedule.includes(results.schedule)
    ));
    setMatches(possibles);
  };

  const answerQuestion = (e) => {
    let current = questions[currentQ];
    let value = e.target.dataset.value;
    if(e.target){
      setResults({...results, [current.title]: value});
      setHistory([...history, {question: current.question, answer: value}]);
    }
    if(currentQ <= questions.length -1){
      setNextLoaded(false);
      setCurrentQ(currentQ + 1);
      setTimeout(()=>{
        setNextLoaded(true);
      }, 2000);
    }
    if(currentQ >= questions.length - 1){
      setTimeout(()=>{
        setIsActive(false)
      }, 1000);
    }
  };

  return (
    <div className="Chatbot">
      <AnimateHeight
        duration={500}
        height={isOpen ? "auto" : '0%'}
        className="Chat"
      >
        <div className="Chat-content">
          <div className="Chat-heading-container">
            <p className="Chat-heading">🤖Chat With DoDobot🤖</p>
            <div className="Chat-heading-close" onClick={toggleShowing}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="Chat-message-container" id="Chat-message-container">
              {/* {!isActive &&  */}
            <AnimateHeight
              duration={500}
              height={!isActive ? '105%' : '0'}
              className={`Chat-overlay`}
            >
              <div>
                {(!history.length ? 
                  <>
                    <p>Hi 👋</p>
                    <p>Answering a few questions will help us match your child with a tutor.</p>
                    <button className="overlay-button" onClick={()=>setIsActive(true)}>
                      Let's get started!🚀
                    </button>
                  </>
                : 
                  <>
                    {matches.length && <p>{matches.length === 1 ? "You have a match!" : "You have matches!"}🎉</p>}
                    {
                      matches.length ?
                      <>
                        <p>Here is how to contact your potential teachers:</p>
                        <ul>
                        {matches.map((i,idx)=>(
                          <li key={`match-${idx}`}>
                            {i.avatar}{' '}{i.name}:{' '}<a href={`mailto:${i.email}`}>{i.email}</a>
                          </li>
                        ))}
                        </ul>
                      </>
                    :
                      <p>No matches to show 😭</p>
                    }
                    <button className="overlay-button" onClick={startOver}>
                      Start over 🔙
                    </button>
                  </>
                )}
              </div>
            </AnimateHeight>
              {/* } */}
            {history.map((i, idx) => (
              <div className="Chat-pair" key={`history-${idx}`}>
                <div className="clearfix">
                  <span className="Chat-question clearfix" key={`history-q-${idx}`}>
                    {i.question}
                  </span>
                </div>
                <div className="clearfix">
                  <span className="Chat-answer clearfix" key={`history-a-${idx}`}>
                    {i.answer}
                  </span>
                </div>
              </div>
            ))}
            {currentQ < questions.length ? (
              nextLoaded ? (
                <div className="Chat-question">
                  {questions[currentQ].question}
                </div>
              ) : (
                <div className="Chat-question">
                  <div className="loading"></div>
                </div>
              )
            ) : (
              ""
            )}
            {currentQ < questions.length ? (
              <>
                <div className="Chat-option-container" id="option-container">
                  {questions[currentQ].options.map(
                    (i, idx) =>
                      nextLoaded && (
                        <span
                          data-value={i}
                          className="Chat-option"
                          key={`q${currentQ}option${idx}`}
                          onClick={answerQuestion}
                        >
                          {i}
                        </span>
                      )
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </AnimateHeight>
      <div className="Chat-icon-container" onClick={toggleShowing}>
        <FontAwesomeIcon icon={faComments} spin={isSpinning} />
      </div>
    </div>
  );
}

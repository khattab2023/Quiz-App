import Quiz from "./components/Quiz/Quiz";
import { jsQuizz } from "./constants";

function App() {

  // const [question, setQuestions] = useState([]);

  // useEffect (() => {
  //   getQuestions();
  
  // }, []);
  
  // const getQuestions = async () => {
  //   try {
  //     const response = await fetch()
  //     const questionsResponse = await response.json();
  // console.log(questionsResponse);
  // setQuestions(questionsResponse);
  //   } catch (error) {
  //     console.log (error);
  //   }
  
  // }
  
  
  //   return (questions.length && <Quiz questions={question} />);
  // }
  


  
  return <Quiz questions={jsQuizz.questions} />;
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/GeneralStyle.css';
import AboutScreen from "./screens/AboutScreen";
import EvaluationScreen from "./screens/EvaluationScreen";
import TestScreen from "./screens/TestScreen";
import ResultScreen from "./screens/ResultScreen";
import Navbar from "./components/Navbar";
import useFetchUser from "./hooks/useUser";
import useTests from "./hooks/useTests";
import TestLogicScreen from "./screens/TestLogicScreen";
import TestComponentScreen from "./screens/TestComponentScreen";
import WelcomeScreenV2 from "./screens/WelcomeScreenV2";
import StatScreen from "./screens/StatScreen";


/**
 * Main component of the application
 * It contains the Switch that handle the url
 * It also contains all the pages of the application
 * @returns {JSX.Element}
 */
function App() {
    //call the custom hooks  and then send the props to the different screens
    const {user, createUser, deleteCookie} = useFetchUser()
    const {test, results, fetchResults, fetchTest, sendTest} = useTests()

    return (
        <div >
            <Router>
                <Navbar/>

                <Switch>
                    <Route path="/logicTest">
                        <TestLogicScreen
                            results={results}
                            user={user}
                            test={test}
                            fetchResults={fetchResults}
                            fetchTest={fetchTest}
                            createUser={createUser}
                            deleteCookie={deleteCookie}
                            sendTest={sendTest}
                        />
                    </Route>
                    <Route path="/component">
                        <TestComponentScreen/>
                    </Route>
                    <Route path="/aboutus">
                        <AboutScreen/>
                    </Route>
                    <Route path="/evaluation">
                        <EvaluationScreen
                            createUser={createUser}
                        />
                    </Route>
                    <Route path="/test">
                        <TestScreen
                            test={test}
                            sendTest={sendTest}
                            fetchTest={fetchTest}
                            user={user}
                        />

                    </Route>
                    <Route path="/result">
                        <ResultScreen
                            results={results}
                            fetchResults={fetchResults}
                        />
                    </Route>
                    <Route path="/stats">
                        <StatScreen
                            user={user}
                            results={results}
                            fetchResults={fetchResults}
                        />
                    </Route>
                    <Route path="/welcomeV2">
                        <WelcomeScreenV2
                            user={user}
                        />
                    </Route>
                    <Route path="/">
                        <WelcomeScreenV2
                            user={user}
                        />
                    </Route>
                </Switch>

            </Router>
        </div>
    );
}

export default App;

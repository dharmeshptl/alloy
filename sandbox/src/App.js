import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <section>
        <div className="mbox"></div>
        <button onClick={() => {
          window.atag("collect", {
            params: {
              event: "login",
              userName: "Joe Khoury"
            },
            callback: () => {
              console.log("HIT HAS BEEN SENT!!!");
            }
          })
        }}>Log In</button>

        <button onClick={() => {
          window.atag("collect", {
            params: {
              event: "video",
              videoName: "Funiest cat ever."
            },
            callback: () => {
              console.log("HIT HAS BEEN SENT!!!");
            }
          })
        }}>Watch Video</button>

      <button onClick={() => {
          window.atag("collect", {
            params: {
              event: "custom-event",
              videoName: "Random event."
            },
            callback: () => {
              console.log("HIT HAS BEEN SENT!!!");
            }
          })
        }}>Do Something</button>
      </section>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default BasicExample;
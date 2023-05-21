import * as React from "react";
import PropTypes from 'prop-types';
import { fetchPopularRepos } from "../utils/api";
import Table from './Table';

function LanguagesNav({ selectedLanguage, updateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <div>
      <select onChange={(e) => updateLanguage(e.target.value)}
      selected={selectedLanguage}>
        {languages.map((lang) => <option key={lang}>{lang}</option>)}
      </select>
    </div>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  } // component is launched the first time


  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) => this.setState({
        repos,
        error: null, // succesfful operation of fetching the repos of languages
      }))
      .catch((error) => {
        console.warn("Error fetching repos: ", error)

        this.setState({
          error: `There was an error fetching the repository`,
        });
      }); // we put fetch in update
  }
  render() {

    const { selectedLanguage, repos, error } = this.state;
    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Popular</h1>
          <LanguagesNav selectedLanguage={this.state.selectedLanguage} updateLanguage={this.updateLanguage} />
          {/*JSON.stringify(this.state, null, 2)*/}
        </div>
        
        {error && <p className="text-center error">{error}</p>}
        {repos && <Table repos={repos} />}
      </main>
    );
  }
}

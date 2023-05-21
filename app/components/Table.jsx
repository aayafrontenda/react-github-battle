import * as React from 'react';
import PropTypes from 'prop-types';
import { hashtag } from './icons';

function TableHead () {
    return (
        <thead>
            <tr>
                <th style={{width: '5%'}}>{hashtag}</th>
                <th style={{width: '5%'}}>Repository</th>
                <th style={{width: '5%'}}>Stars</th>
                <th style={{width: '5%'}}>Forks</th>
                <th style={{width: '5%'}}>Open Issues</th>
            </tr>
        </thead>
    );
}

TableRow.propTypes = {
    index: PropTypes.number.isRequired,
    owner: PropTypes.object.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    open_issues: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}

function TableRow ({ index, owner, stargazers_count, forks, open_issues, name }) {
    const { login, avatar_url } = owner;

    return (
        <tr>
            <td>{index + 1}</td> {/* no idea why does it work, but it works */}
            <td>
                <div className='row gap-md'>
                    <img  
                        width={32} 
                        height={32} 
                        className="avatar" 
                        src={avatar_url} 
                        alt={`Avatar for ${login}`}
                        />
                    <a href={`https://github.com/${login}`}>{name}</a>
                </div>
            </td>
            <td>{stargazers_count}</td>
            <td>{forks}</td>
            <td>{open_issues}</td>
        </tr>
    );
}

export default function Table ({ repos }) {
    return (
        <table>
            <TableHead />
            <tbody>
                {repos.map((repo, index) => {
                    return <TableRow key={index} index={index} {...repo} /> 
                })}
            </tbody>
        </table>
    );
    // since table has no state, we use a function, not a class
}
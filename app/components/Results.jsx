import * as React from 'react'
import { battle } from '../utils/api'

export default class Results extends React.Component {
    render() {
        return (
            <div>
                Results
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
}
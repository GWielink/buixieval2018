import React, {Component} from 'react';

export default class AuthContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            value: "",
        };
    }

    handleChange = ({target: {value}}) => {
        this.setState({value: value});
    };


    authenticate = () => {
        if (this.state.value === 'HashtagHype') {
            this.props.grantAccess();
            return;
        }
        this.setState({ error: true });
    };

    render () {
        return (
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className="loader"
            >
                <div style={{ width: '50%', textAlign: 'center', padding: 20, background: 'rgba(1,1,1, 0.4)'}}>
                    <h2>Should you even be here?</h2>
                    <input type="password" placeholder="Secret passkey..." className="form-control" onChange={this.handleChange} value={this.state.value} />
                    <button className="btn btn-primary" onClick={this.authenticate} style={{ marginTop: 5, marginBottom: 5 }} >Yes.</button>
                    {this.state.error && <h2>Shoo!!</h2>}
                </div>
            </div>
        )
    };
}


// s9WdDUAyPYHdm8
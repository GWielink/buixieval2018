import React, {Component} from 'react';
import { Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';

import updateBacker from '../../functions/update-backer';
import addBacker from '../../functions/add-backer';

export default class BackerForm extends Component {
    constructor (props) {
        super (props);

        this.state = Object.assign({}, this.props.backer, {
            touched: false
        });
    }

    setField = (name, value) => {
        this.setState({
            [name]: value,
            touched: true
        });
    };

    handleFile = (file) => {
        this.setField('img', file.base64);
    };

    saveChanges = () => {
        this.setState({loading: true});

        if (this.state.new) {
            addBacker({
                name: this.state.name,
                contributed: this.state.contributed,
                team: this.state.team,
                img: this.state.img,
            }).then(id => {
                this.setState({
                    id: id,
                    loading: false,
                    touched: false,
                    new: false,
                })
            }).catch(e => {
                console.log(e);
            });

            return;
        }

        updateBacker(this.state.id, {
            name: this.state.name,
            contributed: this.state.contributed,
            team: this.state.team,
            img: this.state.img,
        }).then(() => {
            this.setState({
                loading: false,
                touched: false,
            });
        }).catch(e => {
            console.log(e);
        })
    };

    render () {
        return (
            <Panel
                collapsible
                header={(this.state.new ? '*' : '') + this.state.name}
                eventKey={this.state.id}
            >
                <form>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            onChange={({target: {value}}) => this.setField('name', value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Contributed</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.contributed}
                            onChange={({target: {value}}) => this.setField('contributed', value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Team</ControlLabel>
                        <FormControl
                            componentClass="select" placeholder="team"
                            value={this.state.team}
                            onChange={({target: {value}}) => this.setField('team', value)}
                        >
                            <option value="p">Pink</option>
                            <option value="b">Blue</option>
                        </FormControl>
                    </FormGroup>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <FileBase64
                            multiple={false}
                            onDone={(file) => this.handleFile(file)}
                        />
                        <img src={this.state.img} style={{ maxHeight: '100px', maxWidth: '100px'}} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                        <a
                            className="btn btn-primary"
                            disabled={!this.state.touched}
                            onClick={this.saveChanges}
                        >
                            {this.state.loading ? 'Loading...' : 'Save'}
                        </a>
                    </div>
                </form>
            </Panel>
        )
    }

};

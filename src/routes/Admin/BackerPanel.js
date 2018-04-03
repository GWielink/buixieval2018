import React, {Component} from 'react';
import { Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import {connect} from 'react-redux';
import {setBackers} from '../../store/actions';
import path from '../../apiPath';

import fetchBackers from '../../functions/fetch-backers';
import updateBacker from '../../functions/update-backer';
import addBacker from '../../functions/add-backer';

class BackerForm extends Component {
    constructor (props) {
        super (props);

        this.state = {
            touched: false,
            name: this.props.backer.name,
            contributed: this.props.backer.contributed,
            team: this.props.backer.team,
            id: this.props.backer.id,
            f_id: this.props.backer.f_id,
            new: this.props.backer.new,
        };
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
                f_id: this.state.f_id,
                img: this.state.img,
            }).then(id => {
                this.setState({
                    id: id,
                    loading: false,
                    touched: false,
                    new: false,
                });
                this.refetchBackers();
            }).catch(e => {
                console.log(e);
            });

            return;
        }

        updateBacker(this.state.id, {
            name: this.state.name,
            contributed: this.state.contributed,
            team: this.state.team,
            f_id: this.state.f_id,
            img: this.state.img,
        }).then(() => {
            this.setState({
                loading: false,
                touched: false,
            });
            this.refetchBackers();
        }).catch(e => {
            console.log(e);
        })
    };

    refetchBackers = () => {
        fetchBackers().then(backers => {
            this.props.updateBackers(backers);
        });
    }

    render () {
        return (
            <Panel
                collapsible
                header={(this.state.new ? '*' : '') + this.state.name}
                eventKey={this.state.id}
                bsStyle={this.props.backer.team === 'bstuur' ? 'warning' : (this.props.backer.team === 'p' ? 'danger' : 'info')}
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
                            <option value="bstuur">Bstuur</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Francken id</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.f_id}
                            onChange={({target: {value}}) => this.setField('f_id', value)}
                        />
                    </FormGroup>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <FileBase64
                            multiple={false}
                            onDone={(file) => this.handleFile(file)}
                        />
                        <img src={this.state.img || path + '/image/' + this.state.id} style={{ maxHeight: '100px', maxWidth: '100px'}} />
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

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
    updateBackers: backers => dispatch(setBackers(backers))
});

export default connect(mapStateToProps, mapDispatchToProps)(BackerForm);
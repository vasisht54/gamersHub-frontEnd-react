import React from "react";
import {createGroup} from "../../../service/GameGroupService";
import {Link} from "react-router-dom";
import {findMyGameByName, getAllGames} from "../../../service/GameService";
import "../../Prototype.css"

export class CreateGroupComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        group: {
            name: '',
            description: '',
        },
        profile: JSON.parse(localStorage.getItem('profile')),
        games: [],
        gameId: ''
    }

    componentDidMount() {
        getAllGames()
            .then(games => this.setState({
                                             games: games
                                         }))
    }

    getGameId = (name) => {
        findMyGameByName(name)
            .then(game => this.setState({
                                              gameId: game.id
                                          }))
    }

    createGroup = (group) =>
        createGroup(group, this.state.profile.id, this.state.gameId)
            .then(response => this.props.history.push("/search"))

    render() {
        return (

            <div>
                <nav>
                    <ul className="topnav" id="dropDown">
                        <li style={{cursor: "pointer"}}>
                            <Link to={`/search`}>
                                <i className="fas fa-home"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {localStorage.getItem("profile") === null && this.props.history.push('login')}
                {localStorage.getItem("profile") !== null &&
                <div>
                    <br/>
                    <h1>Create a new group</h1>
                    <br/>
                    <form>

                        {/*<div className="form-group row">*/}
                        {/*    <label className="col-sm-2 col-form-label"></label>*/}
                        {/*    <div className="col-sm-10">*/}
                        {/*        <label className="alert alert-success wbdv-message col-sm-12"*/}
                        {/*               role="alert">*/}
                        {/*            Profile successfully saved</label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Group Name</label>
                            {/*{!this.state.editing && */}
                            {/* <div className="col-sm-10">*/}
                            {/*    {this.state.profile.username}*/}
                            {/*</div>}*/}
                            {/*{this.state.editing && */}
                            <div className="col-sm-10">
                                <input
                                    onChange={(e) => this.setState({
                                                                       group: {
                                                                           ...this.state.group,
                                                                           name: e.target.value
                                                                       }
                                                                   })}
                                    value={this.state.group.name}
                                    className="form-control wbdv-field wbdv-username"
                                    placeholder="Username"/>

                            </div>
                        </div>

                        {/*{this.state.editing && */}
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Game</label>
                            <div className="col-sm-10">
                                <select
                                    onChange={(e) =>this.getGameId(e.target.value)}
                                    value={this.state.group.gameId}
                                    className="form-control wbdv-field wbdv-password"
                                    placeholder="Id">

                                    {this.state.games.map(game =>
                                                              <option>{game.name}</option>
                                    )}

                                </select>
                            </div>
                        </div>
                        {/*}*/}


                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Description</label>
                            {/*{!this.state.editing && <div className="col-sm-10">*/}
                            {/*    {this.state.profile.dob}*/}
                            {/*</div>}*/}
                            {/*{this.state.editing && */}
                            <div className="col-sm-10">
                            <textarea
                                onChange={(e) =>
                                    this.setState({
                                                      group: {
                                                          ...this.state.group,
                                                          description: e.target.value
                                                      }
                                                  })}
                                value={this.state.group.description}
                                type="date" className="form-control wbdv-field wbdv-dob"/>
                            </div>

                        </div>

                        {/*<div className="form-group row">*/}
                        {/*    <label className="col-sm-2"></label>*/}
                        {/*    {!this.state.editing && <div className="col-sm-10">*/}
                        {/*        <button onClick={() =>*/}
                        {/*            // console.log(this.state.profile)*/}
                        {/*            this.setState({*/}
                        {/*                              editing: true*/}
                        {/*                          })*/}
                        {/*        }*/}
                        {/*                type="button"*/}
                        {/*                className="btn btn-primary form-control wbdv-button wbdv-update">*/}
                        {/*            Edit*/}
                        {/*        </button>*/}
                        {/*    </div>}*/}
                        {/*{this.state.editing && <div className="col-sm-10">*/}

                        {/*    <button onClick={() => {*/}
                        {/*        this.setState({*/}
                        {/*                          editing:false*/}
                        {/*                      })*/}
                        {/*        // console.log(this.state.profile)*/}
                        {/*        this.updateProfile(this.state.profile)*/}
                        {/*    }}*/}
                        {/*            type="button"*/}
                        {/*            className="btn btn-success form-control wbdv-button wbdv-update">*/}
                        {/*        Update*/}
                        {/*    </button>*/}
                        {/*</div>}*/}
                        {/*</div>*/}

                        {/*<div className="form-group row">*/}
                        {/*    <label className="col-sm-2"></label>*/}
                        {/*    <div className="col-sm-10">*/}
                        {/*        <button type="button" onClick={this.logout}*/}
                        {/*                className="btn btn-danger form-control wbdv-button wbdv-logout">*/}
                        {/*            Logout*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <button type="button" className="btn btn-primary form-control col-10"
                                onClick={() => this.createGroup(this.state.group)}>
                            Create Group
                        </button>

                    </form>
                </div>}

            </div>
        )
    }

}

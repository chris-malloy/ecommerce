import React, { Component } from 'react';
// materialize components

class Search extends Component{
    render(){
        return(
            <div id="search" className="row">
                <form action="" className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix green-text text-darken-1">search</i>
                            <input type="text" className="validate" id="icon_prefix" /> 
                            <label htmlFor="icon_prefix">Search</label>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Search;

// TODO 
// increase search bar width
// put icon inside of button
// too much use of word search

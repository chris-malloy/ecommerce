import React, { Component } from 'react';

class Search extends Component{
    render(){
        return(
                <div className="row">
                    <form action="" className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" placeholder="search for a product" className="validate" /> 
                            </div>
                            <div className="input-field col s6">
                                <a className="waves-effect waves-light btn">button</a>
                            </div>

                        </div>
                    </form>
                </div>
        )
    }
}

export default Search;

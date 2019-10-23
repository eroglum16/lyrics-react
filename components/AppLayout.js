import NavigationBar from './NavigationBar';
import React from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchString : ""
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleSearch(event){
        this.setState({
            searchString : event.target.value,
            searchResult : []
        });
        this.doSearch(event.target.value);
    }
    handleClick(){
        this.setState({
            searchString: ""
        });
    }
    doSearch(searchString){
        var url = 'http://127.0.0.1:8000/api/search?searchString='+searchString;

        axios.get(url)
            .then(res => {
                const songs = res.data;
                this.setState({
                    searchResult : songs
                });
            })
    }
    render() {
        const searchPage = <SearchResult songList={this.state.searchResult}
                                         searchString={this.state.searchString}
                                         handleClick={this.handleClick} /> ;
        return (
            <div style={{backgroundColor:'whitesmoke', paddingBottom:'50px'}}>
                <NavigationBar handleSearch={this.handleSearch} />
                {this.state.searchString.length > 0 ? searchPage : this.props.children}
            </div>
        );
    }
}

export default Layout;
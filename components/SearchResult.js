import SongCard from "./SongCard";

class SearchResult extends React.Component{
    render() {
        const songs = this.props.songList;
        const songCards = songs.map((song)=>
            <SongCard artistImage={song.artist.image}
                      name={song.name}
                      artistName={song.artist.name}
                      searchString={this.props.searchString}
                      handleClick={this.props.handleClick}
                      id={song.id} />
        );
        return (
            <div className="container" style={{ paddingTop:'3%'}}>
                <h1>Arama Sonuçları</h1>
                <hr/>
                <div className="row" style={{marginBottom:'30px'}}>
                    {songCards}
                </div>
            </div>

        );
    }
}

export default SearchResult;
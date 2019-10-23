import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle} from "reactstrap";
import Link from "next/link";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class SongCard extends React.Component{
    render() {
        let songName = this.props.name;
        let artistName = this.props.artistName;
        let searchString = this.props.searchString;

        if (songName.toLowerCase().includes(searchString.toLowerCase())){
            let start = songName.toLowerCase().indexOf(searchString.toLowerCase());
            let end = start + searchString.length;

            songName = songName.substr(0,start) + "<span class='bg-warning'>"
                + songName.substr(start, end-start) + "</span>" + songName.substr(end);
        }
        if (artistName.toLowerCase().includes(searchString.toLowerCase())){
            let start = artistName.toLowerCase().indexOf(searchString.toLowerCase());
            let end = start + searchString.length;

            artistName = artistName.substr(0,start) + "<span class='bg-warning' >"
                + artistName.substr(start, end-start) + "</span>" + artistName.substr(end);
        }
        return (
            <div className="col-md-3 mb-5">
                <Card style={{boxShadow: '0px 10px 5px 0px #ccc'}}>
                    <CardImg top width="100%"
                             src={this.props.artistImage}
                             alt="Card image cap" />
                    <CardBody>
                        <CardTitle> {ReactHtmlParser(songName)} </CardTitle>
                        <CardSubtitle className="text-muted"> {ReactHtmlParser(artistName)} </CardSubtitle>
                        <hr/>
                        <Link href={'/p/[id]'} as={`/p/${this.props.id}`} >
                            <a onClick={this.props.handleClick} className="btn btn-warning">Sözleri Gör</a>
                        </Link>
                        <style jsx>{`
                    h1,
                    a {
                      font-family: 'Arial';
                    }
                    
                    ul {
                      padding: 0;
                    }
            
                    li {
                      list-style: none;
                      margin: 5px 0;
                    }
            
                    a {
                      text-decoration: none;
                      color: #333;
                    }
          
                  `}</style>
                    </CardBody>
                </Card>

            </div>
        );
    }
}

export default SongCard;
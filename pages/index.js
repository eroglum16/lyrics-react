import Layout from '../components/AppLayout';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardImg, CardSubtitle, CardTitle} from "reactstrap";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

class Index extends React.Component{
    render() {
        const songs = this.props.songList;
        const songCards = songs.map((song)=>
            <SongCard artistImage={song.artist.image}
                      name={song.name}
                      artistName={song.artist.name}
                      id={song.id} />
        );
        return (
            <Layout>
                <div className="container" style={{ paddingTop:'3%'}}>
                    <h1>Popüler Şarkılar</h1>
                    <hr/>
                    <div className="row" style={{marginBottom:'30px'}}>
                        {songCards}
                    </div>
                </div>
            </Layout>

        );
    }
}

class SongCard extends React.Component{
    render() {
        return (
            <div className="col-md-3 mb-5">
                <Card style={{boxShadow: '0px 10px 5px 0px #ccc'}}>
                    <CardImg top width="100%"
                             src={this.props.artistImage}
                             alt="Card image cap" />
                    <CardBody>
                        <CardTitle> {this.props.name} </CardTitle>
                        <CardSubtitle className="text-muted"> {this.props.artistName} </CardSubtitle>
                        <hr/>
                        <Link href={'/p/[id]'} as={`/p/${this.props.id}`} >
                            <a className="btn btn-warning">Sözleri Gör</a>
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
Index.getInitialProps = async function(context) {

    const res = await fetch(`http://127.0.0.1:8000/api/songs`, {
        headers:{
            Accept: 'application/json',
        }
    } );
    const songList = await res.json();

    return { songList };
};


export default Index;
import Layout from '../components/AppLayout';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ArtistToast from "../components/ArtistToast";
import fetch from "isomorphic-unfetch";

class Artists extends React.Component{
    render() {
        const artists = this.props.artistList;
        const artistToasts = artists.map((artist)=>
            <ArtistToast artist={artist} />
        );
        return (
            <Layout>
                <div className="container" style={{ paddingTop:'3%'}}>
                    <h1>Popüler Sanatçılar</h1>
                    <hr/>
                    <div className="row">
                        {artistToasts}
                    </div>
                </div>
            </Layout>
        );
    }
}

Artists.getInitialProps = async function() {

    const res = await fetch(`http://127.0.0.1:8000/api/artists`, {
        headers:{
            Accept: 'application/json',
        }
    } );
    const artistList = await res.json();

    return { artistList };
};

export default Artists;
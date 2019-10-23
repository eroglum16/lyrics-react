import Layout from '../../components/AppLayout';
import React from "react";
import fetch from 'isomorphic-unfetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import axios from "axios";
import { NextSeo } from 'next-seo';

class Song extends React.Component{
    constructor(props){
        super(props);

        const songId = this.props.id;

        this.state = {
            song: {
                "name": "Sunucu bekleniyor!",
                "lyrics": "Görüntülemek istediğiniz şarkı sunucudan getiriliyor...",
                "artist": {
                    "name": "-"
                }
            },
            id: songId
        };
    }
    componentDidMount() {
        this.getSongs();
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }
    tick(){
        let currentId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

        if (currentId!=this.state.id){
            this.setState({
                id: currentId
            });
            this.getSongs();
        }
    }
    getSongs(){
        var url = 'http://127.0.0.1:8000/api/songs/'+this.state.id;
        axios.get(url)
            .then(res => {
                const songData = res.data;
                this.setState({
                    song : songData
                });
            });
        if (this.state.song.name==="Sunucu bekleniyor!") this.setState({
            song: {
                "name": "Sonuç bulunamadı!",
                "lyrics": "Sistemde bu şarkı yok gibi gözüküyor.",
                "artist": {
                    "name": "-"
                }
            }
        });
    }
    render() {
        return (
            <Layout>
                <NextSeo
                    title={this.state.song.name+' Şarkı Sözleri'}
                    description={this.state.song.artist.name + ' - ' + this.state.song.name+' şarkı sözleri. Aradığınız şarkının sözleri işte burada.'}
                />
                <div className="container" style={{ paddingTop:'3%'}}>
                    <div className="row">
                        <div className="col-md-6">
                            <h1>{this.state.song.name}</h1>
                            <hr/>
                            <p>
                                {ReactHtmlParser(this.state.song.lyrics)}
                            </p>
                            <hr/>
                            <b>Sanatçı: </b> {this.state.song.artist.name}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

Song.getInitialProps = async function(context) {

    const {id} = context.query;

    return {id};

};

export default Song;
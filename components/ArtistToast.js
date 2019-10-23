import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import Link from "next/link";

class ArtistToast extends React.Component{
    render() {
        const songNames = this.props.artist.songs.map((song)=>
            <li>
                <Link href={'/p/[id]'} as={`/p/${song.id}`} >
                    <a style={{color:'#333'}}>{song.name}</a>
                </Link>
            </li>
        );
        return (
            <div className="col-md-4">
                <div className="p-3 my-2 rounded bg-docs-transparent-grid">
                    <Toast>
                        <ToastHeader>
                            {this.props.artist.name}
                        </ToastHeader>
                        <ToastBody>
                            <ol>
                                {songNames}
                            </ol>
                        </ToastBody>
                    </Toast>
                </div>
            </div>
        );
    }
}

export default ArtistToast;
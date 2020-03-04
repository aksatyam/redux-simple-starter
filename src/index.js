import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
const API_KEY = 'AIzaSyADq1f9heVf4FHDW3N6CrK5qe0xNgInqmM';
import YtSearch from 'youtube-api-search';
import Searchbar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            seletedVideo: null
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YtSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({ videos, seletedVideo: videos[0] });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <Searchbar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.seletedVideo} />
                <VideoList
                    onVideoSelect={seletedVideo => this.setState({ seletedVideo })}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container'));
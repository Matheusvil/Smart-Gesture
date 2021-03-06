import React, {useRef} from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import ReactPlayer from 'react-player';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './style.scss';

const Home = () =>{
    return(
        <div className='player-wrapper'>
            <ReactPlayer className='react-player' url={['https://www.youtube.com/watch?v=M7TKRcA8KDk', 'https://www.youtube.com/watch?v=ilkgp4bA4Bc']} controls={true} width = '75%' height = '75%'/>
            <Webcam className='webcam-display'/>
        </div>
    );
}

export default Home;
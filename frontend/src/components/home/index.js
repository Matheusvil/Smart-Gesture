import React, {useRef, useState} from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import ReactPlayer from 'react-player';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { Container, Content} from 'rsuite';
import {drawHand} from './utilities';

import * as fp from 'fingerpose';

import './style.scss';

const Home = () =>{

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [action, setAction] = useState(null);

    const runHandpose = async () => {
        const net = await handpose.load();
        // console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
        detect(net);
        }, 100);
    };

    const detect = async(net) =>{
        if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            
             // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const hand = await net.estimateHands(video);
            // console.log(hand);

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    fp.Gestures.ThumbsUpGesture,
                    fp.Gestures.VictoryGesture,
                ]);
        

                const gesture = await GE.estimate(hand[0].landmarks, 8);
                // console.log(gesture);

                if(gesture.gestures !== undefined && gesture.gestures.length > 0 ){
                    const confidence = gesture.gestures.map( (prediction ) => prediction.confidence);
                    
                    const maxConfidence  = confidence.indexOf(Math.max.apply(null, confidence));

                    setAction(gesture.gestures[maxConfidence].name);
                    console.log(action);
                }

            }

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
        }
    }

    runHandpose();

    return(
        <div className="show-container">
            <Container>
                <Content>
                    <ReactPlayer className='react-player' url={['https://www.youtube.com/watch?v=M7TKRcA8KDk', 'https://www.youtube.com/watch?v=ilkgp4bA4Bc']} controls={true} />
                    <Webcam className='webcam-display' ref={webcamRef}/>
                    <canvas className='canvas-display' ref={canvasRef}/>
                </Content>
            </Container>
        </div>
    );
}

export default Home;
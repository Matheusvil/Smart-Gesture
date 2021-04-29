import React, {useRef, useState} from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import ReactPlayer from 'react-player';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { Container, Content} from 'rsuite';
import {drawHand} from './utilities';

import * as fp from 'fingerpose';
import {thumbsDownGesture} from './gestures/thumbsDown';
import {pauseGesture} from './gestures/pause';

import './style.scss';

const Home = () =>{

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    const runHandpose = async () => {
        const net = await handpose.load();
        // console.log("Handpose model loaded.");
        //  Loop e detecção das mãos
        setInterval(() => {
        detect(net);
        }, 100);
    };

    const detect = async(net) =>{
        if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            
             // Pega as propriedades do video
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Define a largura do video 
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Define a altura e largura do canvas 
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Realiza a detecção
            const hand = await net.estimateHands(video);
            //console.log(hand);

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    fp.Gestures.ThumbsUpGesture,
                    fp.Gestures.VictoryGesture,
                    thumbsDownGesture,
                    pauseGesture,
                ]);
        

                const gesture = await GE.estimate(hand[0].landmarks, 8);
                //console.log(gesture);

                if(gesture.gestures !== undefined && gesture.gestures.length > 0 ){
                    const confidence = gesture.gestures.map( (prediction ) => prediction.confidence);
                    
                    const action = gesture.gestures.reduce((mxGesture, gesture) =>{
                        if(!mxGesture){
                            return gesture;
                        }
                        if(mxGesture.confidence > gesture.confidence){
                            return mxGesture;
                        }
                        return gesture;
                    })
                    
                    console.log(action);

                    if(action.name === 'victory'){
                        setPlaying(true);
                    }
                    else if(action.name === 'pause'){
                        setPlaying(false);
                    }
                    else if(action.name === 'thumbsDown'){
                        setVolume(Math.max(volume - 0.3, 0));
                    }
                    else if(action.name === 'thumbs_up'){
                        setVolume(Math.min(volume + 0.3, 1));
                    }
                }



            }

            // Desenha o esqueleto da mão
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
        }
    }

    runHandpose();

    return(
        <div className="show-container">
            <Container>
                <Content>
                    <ReactPlayer 
                        className='react-player' 
                        url={'https://www.youtube.com/watch?v=GH5v7oIL_jc'}  
                        controls={true}
                        playing={playing}
                        volume={volume}
                        />
                    <Webcam className='webcam-display' ref={webcamRef}/>
                    <canvas className='canvas-display' ref={canvasRef}/>
                </Content>
            </Container>
        </div>
    );
}

export default Home;
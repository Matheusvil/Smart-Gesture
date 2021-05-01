import React, {useRef, useState, useEffect} from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import ReactPlayer from 'react-player';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { Container, Content} from 'rsuite';
import {drawHand} from './utilities';
import {throttle, debounce} from 'lodash'

import * as fp from 'fingerpose';
import {thumbsDownGesture} from './gestures/thumbsDown';
import {pauseGesture} from './gestures/pause';

import './style.scss';

const runHandpose = async (webcamRef, canvasRef, onAction) => {
    const net = await handpose.load();
    let action = undefined;
    const throttleFunction = throttle(function(){
        if(action){
            onAction(action);
        }
    }, 1000)
    //  Loop e detecção das mãos
    console.log("carregou");
    setInterval(async () => {
    action = await detect(net, webcamRef, canvasRef, onAction);
    if(action){
        throttleFunction();
    }
    }, 100);
};

const detect = async(net, webcamRef, canvasRef, onAction) =>{
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

                return action;

            }

        }

        // Desenha o esqueleto da mão
        const ctx = canvasRef.current.getContext("2d");
        drawHand(hand, ctx);
    }
}


const Home = () =>{

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const handleAction = (action) =>{
        console.log(volume);
        if(action.name === 'victory'){
            setPlaying(true);
        }
        else if(action.name === 'pause'){
            setPlaying(false);
        }
        else if(action.name === 'thumbs_up'){
            setVolume((vol)=> Math.min(vol + 0.1, 1));
        }
        else if(action.name === 'thumbsDown'){
            setVolume((vol) => Math.max(vol - 0.1, 0));
        }
    }
    useEffect( () =>{
        runHandpose(webcamRef, canvasRef, (action) =>{
            handleAction(action);
        });
    }, [webcamRef, canvasRef]);
    
    console.log('recarregou');
    return(
        <div className="show-container">
            {volume}
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
                    <button onClick={() => handleAction({name: 'thumbsDown'})}>click</button>
                </Content>
            </Container>
        </div>
    );
}

export default Home;
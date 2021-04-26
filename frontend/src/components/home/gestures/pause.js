import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const pauseGesture = new GestureDescription('pause');

pauseGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.7);

pauseGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.7);
pauseGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);
pauseGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.5);
pauseGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.5);

pauseGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.7);
pauseGesture.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);
pauseGesture.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.5);
pauseGesture.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.5);

pauseGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 0.7);
pauseGesture.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);
pauseGesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.5);
pauseGesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.5);

pauseGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.7);
pauseGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7);
pauseGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.5);
pauseGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.5);
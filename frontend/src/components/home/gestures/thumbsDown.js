import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//define a descrição do gesto
export const thumbsDownGesture = new GestureDescription('thumbsDown');

// adiciona o dedo, a direção e se o dedo esta curvado.
thumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.5);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.5);

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    thumbsDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
    thumbsDownGesture.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}
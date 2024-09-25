'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { load } from '@tensorflow-models/posenet';

const VideoSet: React.FC<{ increaseCount: () => void }> = ({ increaseCount }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previousPose, setPreviousPose] = useState<any>(null);
  const changeThreshold = 10;

  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;
      if (video) {
        video.width = 640;
        video.height = 480;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            resolve(null);
          };
        });
        video.play();
      }
    };

    const estimatePose = async () => {
      await tf.ready();
      const net = await load();
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (video && video.videoWidth > 0 && video.videoHeight > 0 && ctx) {
        const currentPose = await net.estimateSinglePose(video, {
          flipHorizontal: false,
        });

        // Canvasをクリア
        if (canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // 座標の変化をチェック
        if (previousPose) {
          const leftWrist = currentPose.keypoints.find((kp: any) => kp.part === 'leftWrist');
          const prevLeftWrist = previousPose.keypoints.find((kp: any) => kp.part === 'leftWrist');

          if (leftWrist && prevLeftWrist) {
            const yWristChange = leftWrist.position.y - prevLeftWrist.position.y;

            if (yWristChange < -changeThreshold) {
              increaseCount();
            }
          }
        }
        setPreviousPose(currentPose);
      }
    };

    setupCamera();
    const interval = setInterval(estimatePose, 1000);

    return () => clearInterval(interval);
  }, [previousPose]);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay muted style={{ width: '640px', height: '480px' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '640px', height: '480px' }} />
    </div>
  );
};

export { VideoSet };

import React from 'react';
import{ useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls, Plane, Box, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

import Car from '../public/Car';
import Tunnel from '../public/Tunnel';
import T from '../public/T';
import Start from '../public/Start';


import Safe from '../public/Safe';
import Pull from '../public/Pull';
// import Cone from '../public/Cone';
import Tree1 from '../public/Tree1';
import School from '../public/Schl';
// Function to create a road

const ScoreDisplay = ({ currentScore, highScore }) => (
  <div style={{
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    borderRadius: '10px', // Rounded corners
    padding: '10px 15px', // Padding for better spacing
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
    color: 'white', // Text color
    fontSize: '24px', // Font size
    zIndex: 1, // Ensure it stays above other elements
    fontFamily: 'Arial, sans-serif', // Font family for a cleaner look
    textAlign: 'center', // Center text alignment
    cursor:'pointer'
  }}>
    <div style={{ fontWeight: 'bold' }}>Current Score: {currentScore}</div>
    <div style={{ fontWeight: 'bold' }}>High Score: {highScore}</div>
  </div>
);

const createRoad = (position, size, rotation = [0, 0, 0], color = 'gray') => (
  <Plane args={size} position={position} rotation={rotation}>
    <meshStandardMaterial color={color} />
  </Plane>
);


const createRailing = (position, size, rotation = [0, 0, 0], color = 'orange') => (
  <RigidBody type="fixed" key={`railing-${position[0]}-${position[2]}`}>
    <Box args={size} position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  </RigidBody>
);
const createRailing2 = (position, size, rotation = [0, 0, 0], color = 'orange') => (
  <RigidBody type="fixed" key={`railing-${position[0]}-${position[2]}`}>
    <Box args={size} position={position}  rotation={rotation}>
      <meshStandardMaterial color={color} />
    </Box>
  </RigidBody>
);

const createSlope = (position, size, rotation = [-Math.PI / 4, 0, 0], color = 'gray') => (
  <RigidBody type="fixed" key={`slope-${position[0]}-${position[2]}`}>
    <Plane args={size} position={position} rotation={rotation}>
      <meshStandardMaterial color={color} />
    </Plane>
  </RigidBody>
);

const Ground = () => (
  <RigidBody type="fixed">
    <Plane args={[500, 500]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="lightgreen" />
    </Plane>
  </RigidBody>
);

const Roads = () => {
  const roads = [
    // Vertical road 1
    createRoad([0, 0.5, -50], [10, 150], [-Math.PI / 2, 0, 0]),

    // Horizontal road 2 (closer)
    createRoad([0, 0.5, -130], [90, 10], [-Math.PI / 2, 0, 0]),
  ];

  return <>{roads.map((road, index) => <React.Fragment key={index}>{road}</React.Fragment>)}</>;
};

const Slopes = () => (
  <>
    {createSlope([44.8, 1, -130], [40, 8], [-Math.PI / 2, -Math.PI / 8.5, 0])} {/* Slope going up */}
    {createSlope([140, 1, -46.5], [8, 60], [-Math.PI / 2.35,0, 0])} {/* Slope going down */}
  </>
);

const Railings = () => {
  const railingSize = [0.1, 1.3, 150];
  const railingPositions = [
    [5, 1.1, -50],
    [-5, 1.1, -50],
  ];
  return (
    <>
      {railingPositions.map((pos) => createRailing(pos, railingSize))}
    </>
  );
};

const Cars = ({ carRef,isGameStarted }) => {
  const maxSpeed = 20;  // Maximum speed the car can reach
  const acceleration = 0.1;  // How fast the car accelerates
  const deceleration = 0.1;  // How fast the car decelerates
  const turnSpeed = 0.04;  // How fast the car turns

  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [turnDirection, setTurnDirection] = useState(0);
  const [moveDirection, setMoveDirection] = useState({ forward: false, backward: false, left: false, right: false });

  const moveCar = () => {

    if (isGameStarted&& carRef.current) {
      const velocity = carRef.current.linvel();
      const rotation = carRef.current.rotation();
      const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
      const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion);

      // Apply acceleration or deceleration based on forward or backward keys
      if (moveDirection.forward) {
        setCurrentSpeed((prev) => Math.min(maxSpeed, prev + acceleration));
      } else if (moveDirection.backward) {
        setCurrentSpeed((prev) => Math.max(-maxSpeed, prev - acceleration));
      } else {
        // Decelerate when no key is pressed
        setCurrentSpeed((prev) => {
          if (prev > 0) return Math.max(0, prev - deceleration);
          if (prev < 0) return Math.min(0, prev + deceleration);
          return prev;
        });
      }

      // Apply the movement based on the current speed
      carRef.current.setLinvel({
        x: forwardVector.x * currentSpeed,
        y: velocity.y,
        z: forwardVector.z * currentSpeed,
      }, true);

      // Turning the car
      const euler = new THREE.Euler().setFromQuaternion(quaternion, 'YXZ');
      if (moveDirection.left) {
        setTurnDirection(turnSpeed);
      } else if (moveDirection.right) {
        setTurnDirection(-turnSpeed);
      } else {
        setTurnDirection(0);  // Stop turning if no keys are pressed
      }

      euler.y += turnDirection;
      carRef.current.setRotation(new THREE.Quaternion().setFromEuler(euler), true);
    }
  };

  useEffect(() => {
    const interval = setInterval(moveCar, 16);
    return () => clearInterval(interval);
  }, [moveDirection, currentSpeed, turnDirection]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setMoveDirection((prev) => ({ ...prev, forward: true }));
        break;
      case 'ArrowDown':
        setMoveDirection((prev) => ({ ...prev, backward: true }));
        break;
      case 'ArrowLeft':
        setMoveDirection((prev) => ({ ...prev, left: true }));
        break;
      case 'ArrowRight':
        setMoveDirection((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setMoveDirection((prev) => ({ ...prev, forward: false }));
        break;
      case 'ArrowDown':
        setMoveDirection((prev) => ({ ...prev, backward: false }));
        break;
      case 'ArrowLeft':
        setMoveDirection((prev) => ({ ...prev, left: false }));
        break;
      case 'ArrowRight':
        setMoveDirection((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <RigidBody ref={carRef} position={[0, 0.34, 0]} mass={1} friction={0.8} linearDamping={0.1} angularDamping={0.1}>
      <group scale={[0.02, 0.02, 0.02]}>
        <Car />
      </group>
    </RigidBody>
  );
};


// Camera Component
// Camera Component
const FollowCamera = ({ carRef }) => {
  useFrame((state) => {
    if (carRef.current) {
      const carPosition = carRef.current.translation();
      const carRotation = carRef.current.rotation(); 

      const offset = new THREE.Vector3(0, 1.7, 10); 
      const quaternion = new THREE.Quaternion(carRotation.x, carRotation.y, carRotation.z, carRotation.w); 

      offset.applyQuaternion(quaternion);

      
      state.camera.position.set(
        carPosition.x + offset.x,
        carPosition.y + offset.y,
        carPosition.z + offset.z
      );

      
      state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
    }
  });

  return null;
};


// Main App Component
const Main = () => {
  const navigate=useNavigate();
  const carRef = useRef(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [alerted, setAlerted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); 
  const [countdown, setCountdown] = useState(5); 
  const [userMoney, setUserMoney] = useState(); 
  useEffect(() => {
    setUserMoney(localStorage.getItem('userMoney'));
    let interval;
    if (!isGameStarted && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsGameStarted(true);
    }

    return () => clearInterval(interval); 
  }, [isGameStarted, countdown]); 

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      if (!gameOver && isGameStarted) {
        setCurrentScore((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(scoreInterval); 
  }, [gameOver, isGameStarted]);

  useEffect(() => {
    if (carRef.current) {
      const carPosition = carRef.current.translation();
      if (carPosition.x >= 200 && !alerted) {
        localStorage.setItem('userMoney', 100000/currentScore+userMoney);
        console.log(localStorage.getItem('userMoney'));
        alert(`Your score: ${currentScore}`);
        navigate('/');
        // setAlerted(true);
        // resetGame();
        
         
      }
      if (currentScore > highScore) {
        setHighScore(currentScore);
      }
    }
  }, [carRef, currentScore, highScore, alerted]); 

  
  

  return (
    <>
    <ScoreDisplay currentScore={currentScore} highScore={highScore} />
    {!isGameStarted?<div className='countdown'> {countdown}</div>:null}
    
    <Canvas camera={{ position: [5, 5, 5], fov: 75 }} style={{ width: '100vw', height: '100vh' }}>
      <ambientLight />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <OrbitControls />
      <Physics>
        <Ground />
        <Railings />
        <School position={[55, 0.1, -120]} scale={[0.5, 0.8, 0.5]}  />
       {/* <Grass/> */}
        {createRailing([25, 1.1, -125], [40, 1.3, 0.1],)},
        {createRailing([15, 1.1, -135], [70, 1.3, 0.1],)}
        {createRailing([104, 8, -133], [80, 2, 0.1],)}
        {createRailing([100, 8, -126.5], [70, 2, 0.1],)}
        {createRailing([143, 8, -105], [0.1, 2, 55],)}
        {createRailing([136.5, 8, -102], [0.1, 2, 48],)}
        {createRailing([144, 0.1, -37], [0.1, 2, 7],)}
        {createRailing([142, 0.1, -34], [5, 2, 0.1],)}
        {createRailing2([70, 0.5, -5.3], [0.1, 1.3, 150],[0,-Math.PI/3,0])}
        {createRailing2([80, 0.5, 0.2], [0.1, 1.3, 137],[0,-Math.PI/3,0])}
        {createRailing2([43, 0.5, -133.5], [45, 1.3, 0.1],[0,0,Math.PI/8])}
        {createRailing2([43, 0.5, -126.5], [45, 1.3, 0.1],[0,0,Math.PI/8])}
        {createRailing2([135.8, 0.5, -45.5], [0.1, 2, 70],[Math.PI/13.4,0,0])}
        {createRailing2([143.8, 0.5, -42.5], [0.1, 1.3, 70],[Math.PI/13.4,0,0])}
        {/* <Tok position={[50, 0.34, -90]} /> */}
        <Roads />
        {/* <Tree1 position={[20, 0, -100]}  /> */}
        <Tree1 position={[-10, 0, -150]}  scale={[0.6, 0.6, 0.6]} />
        <Tree1 position={[10, 0, -15]}  scale={[0.6, 0.6, 0.6]} />
        <Tree1 position={[120, 0, -60]}  scale={[1, 1, 1]} />
        <Slopes />
        {/* <RigidBody type='kinematics'>

        <Cone position={[2.2, 1.3, -100]} scale={[2,2,2]} />
        </RigidBody> */}
          
        
        <RigidBody type='fixed' mass={0.1}>
          {createRoad([100, 8, -130], [72, 8], [-Math.PI / 2, 0, 0])}
          {createRoad([140, 8, -105], [8, 58], [-Math.PI / 2,0 , 0])}
          {createRoad([74, 0.1, -2], [10, 150], [-Math.PI / 2,0,-Math.PI / 3])}
          {createRoad([40, 0.1, 100], [10, 150], [-Math.PI / 2,0,-Math.PI / 6])}
          {createRoad([140, 0.1, -38.5], [8, 10], [-Math.PI / 2,0,0])}
          {createRoad([15, 0.1, 125.5], [9, 20], [-Math.PI /2,0,0])}
          {createRoad([100, 0.1, 35], [8, 200], [-Math.PI / 2,0 , Math.PI / 2])}
        </RigidBody>
        <RigidBody type='fixed' mass={0.1} >
        <Safe position={[-5, 0, -127]} scale={[0.01, 0.02, 0.01]}  rotation={[0, +Math.PI / 2, 0]}/>
        {/* <Cone position={[-5, 1.3, -130]} scale={[2,2,2]} />
        <Cone position={[-5, 1.3, -132]} scale={[2,2,2]} />
        <Cone position={[-5, 1.3, -134]} scale={[2,2,2]} /> */}
        </RigidBody>
        <RigidBody type='kinematics'><Safe position={[-3, 0, -50]} scale={[0.01, 0.02, 0.01]} /></RigidBody>
        <T position={[30, -140, 0]} scale={[2, 3, 2]} rotation={[0, -Math.PI / 2, 0]} />
        <Cars isGameStarted={isGameStarted} carRef={carRef} />
        {/* <Mountain position={[0, 0, -200]} scale={[20, 30, 20]} /> */}
        <Start position={[0, 0, -26]} rotation={[0, +Math.PI / 2, 0]} />
        <Start position={[200, 0, 33]} rotation={[0, +Math.PI , 0]} />
        <Pull position={[69.5, 8, -130]} scale={[1.5, 1, 1.5]} rotation={[0, Math.PI / 2, 0]} />
        <Pull position={[140, 8, -122]} scale={[1.5, 1, 1]} rotation={[0,0, 0]} />
        <Tunnel position={[0, -1.2, 72]} scale={[20, 50, 50]} rotation={[0, -Math.PI/2-0.1, 0]} />
        // <FollowCamera carRef={carRef} />
      </Physics>
    </Canvas></>
  );
};

export default Main;

import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Park from "../public/Park";
import Car from "../public/Car";
import Car2 from '../public/Car2';

export default function SelectCars() {
    const [selectedCar, setSelectedCar] = useState(null);
    const [userMoney, setUserMoney] = useState(0);
    const carPrices = { 1: 800, 2: 200 };
    const [showModal, setShowModal] = useState(false);
    const [purchasedCars, setPurchasedCars] = useState({});
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const hoverTimeout = useRef(null);

    useEffect(() => {
        const storedMoney = localStorage.getItem("userMoney");
        if (storedMoney) {
            setUserMoney(parseInt(storedMoney));
        }
        const storedCar = localStorage.getItem("selectedCar");
        if (storedCar) {
            setSelectedCar(parseInt(storedCar));
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("userMoney")) {
            localStorage.setItem("userMoney", userMoney);
        }
        setUserMoney(parseInt(localStorage.getItem("userMoney")));
    }, [userMoney]);

    const handleCarHover = (carId, event) => {
        setSelectedCar(carId);
        setShowModal(true);
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        const { clientX, clientY } = event;
        setModalPosition({ top: clientY - 150, left: clientX - 50 });
    };
    const handleCarLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const handleModalHover = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
    };

    const handleModalLeave = () => {
        setShowModal(false);
    };

    const buyCar = (carId) => {
        const price = carPrices[carId];
        if (userMoney >= price) {
            setPurchasedCars(prev => ({ ...prev, [carId]: true }));
            setUserMoney(userMoney - price);
            localStorage.setItem("userMoney", userMoney - price);
            setTimeout(() => setShowModal(false), 2000);
        } else {
            alert("You don't have enough money to buy this car.");
        }
    };

    const selectCar = (carId) => {
        if (purchasedCars[carId]) {
            setSelectedCar(carId);
            localStorage.setItem("selectedCar", carId);
            alert(`Car ${carId} selected!`);
            setShowModal(false);
        } else {
            alert("You must purchase the car before selecting it.");
        }
    };

    return (
        <>
            <Canvas camera={{ position: [5, 5, 5], fov: 75 }} style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1d' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={0.5} castShadow />
                <directionalLight position={[-5, 10, -5]} intensity={0.5} castShadow />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <spotLight position={[0, 10, -10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <spotLight position={[0, 5, 5]} angle={0.2} penumbra={1} intensity={1.2} castShadow />
                <PerspectiveCamera makeDefault position={[700, 500, 700]} />
                <OrbitControls />
                <Park scale={90} position={[0, -3, 0]} />
                <group scale={1.6} onPointerOver={(event) => handleCarHover(1, event)} onPointerOut={handleCarLeave}>
                    <Car />
                </group>
                <Car2 position={[20, 0, 0]} scale={19} onPointerOver={(event) => handleCarHover(2, event)} onPointerOut={handleCarLeave} />
            </Canvas>

            {showModal && selectedCar && (
                <div 
                    style={{ 
                        ...modalStyle, 
                        top: modalPosition.top, 
                        left: modalPosition.left 
                    }}
                    onMouseEnter={handleModalHover}
                    onMouseLeave={handleModalLeave}
                >
                    <h2>Car {selectedCar}</h2>
                    <p>Price: ${carPrices[selectedCar]}</p>
                    {purchasedCars[selectedCar] ? (
                        <p style={{ color: 'green', fontWeight: 'bold' }}>Car purchased successfully!</p>
                    ) : (
                        <button 
                            onClick={() => buyCar(selectedCar)}
                            disabled={userMoney < carPrices[selectedCar]} 
                            style={buttonStyle}
                        >
                            {userMoney >= carPrices[selectedCar] ? "Purchase Car" : "Not enough money"}
                        </button>
                    )}
                    <button 
                        onClick={() => selectCar(selectedCar)} 
                        style={buttonStyle}
                        disabled={!purchasedCars[selectedCar] && !Object.values(purchasedCars).includes(true)}
                    >
                        Select Car
                    </button>
                </div>
            )}
        </>
    );
}

const modalStyle = {
    position: 'absolute',
    padding: '20px',
    backgroundColor: '#2c2c34',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.5)',
    textAlign: 'center',
    zIndex: 1000
};

const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#ff7043',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s',
};

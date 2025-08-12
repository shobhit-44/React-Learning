import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RotatingBook() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 3, 0.3]} />
      <meshStandardMaterial color="#1565C0" />
    </mesh>
  );
}

function App() {
  const [collegeName, setCollegeName] = useState('');
  const [review, setReview] = useState('');
  const [reviewsList, setReviewsList] = useState([]);

  const handleAddReview = () => {
    if (collegeName.trim() && review.trim()) {
      const newReview = {
        id: Date.now(),
        college: collegeName.trim(),
        reviewText: review.trim(),
      };
      setReviewsList([newReview, ...reviewsList]);
      setCollegeName('');
      setReview('');
    }
  };

  const handleDeleteReview = (id) => {
    setReviewsList(reviewsList.filter((r) => r.id !== id));
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>College Review Website with 3D Animation</h1>

      {/* 3D Canvas */}
      <div style={{ height: 300, marginBottom: 30 }}>
        <Canvas camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingBook />
        </Canvas>
      </div>

      {/* Review Input Form */}
      <div style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="College Name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10, fontSize: 16 }}
        />
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
        <button
          onClick={handleAddReview}
          style={{
            marginTop: 10,
            padding: '10px 20px',
            fontSize: 16,
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
          }}
        >
          Add Review
        </button>
      </div>

      {/* Reviews List */}
      <div>
        {reviewsList.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No reviews yet. Be the first to add!</p>
        ) : (
          reviewsList.map(({ id, college, reviewText }) => (
            <div
              key={id}
              style={{
                border: '1px solid #ddd',
                padding: 15,
                marginBottom: 15,
                borderRadius: 6,
                backgroundColor: '#f9f9f9',
                position: 'relative',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{college}</h3>
              <p style={{ margin: 0 }}>{reviewText}</p>
              <button
                onClick={() => handleDeleteReview(id)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#dc3545',
                  border: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

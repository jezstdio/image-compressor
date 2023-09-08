import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./App.css";

export default function App() {
  const [uploaded, setUploaded] = useState(0);
  const [originalImage, setOriginalImage] = useState([]);
  const [compressedImage, setCompressedImage] = useState([]);
  const [uploading, setUploading] = useState(false);

  // File Upload
  const handleFileUpload = (e) => {
    setOriginalImage(e.target.files);
    setUploaded(1);
  };

  // File Compression
  const handleCompression = (e) => {
    setCompressedImage([]);

    if (uploaded) {
      const options = {
        maxSizeMB: 4,
        useWebWorker: true,
      };

      Array.from(originalImage).forEach((original, i) => {
        imageCompression(original, options).then((img) => {
          setCompressedImage((prev) => [...prev, img]);
        });
      });
    }
  };

  return (
    <div>
      <h1>
        Max 4MB-ig csökkenti a kép méretét 🫡 <br />
      </h1>
      <p>Az oldal megnyitható az alábbi QR kóddal is:</p>
      <div className="qrcode"></div>
      <p>Kép feltöltése itt:</p>
      <div className="container">
        <input type="file" multiple onChange={handleFileUpload} />
      </div>
      <br />
      <p>Kép méretének lecsökkentése ezzel a gombbal:</p>
      <button onClick={handleCompression}>Méretcsökkentés</button>
      <div className="container">
        {/*
        <h3>Eredeti méret: {Math.ceil(originalImage.size / 1024 / 1024)} MB</h3>
        <h3>Új méret: {Math.ceil(compressedImage.size / 1024 / 1024)} MB</h3>
        */}
        <p>Új méretű kép letöltéséhez kattints a képre:</p>
        {uploading && <h3>Képek betöltése folyamatban...</h3>}
        {compressedImage &&
          Array.from(compressedImage).length > 0 &&
          Array.from(compressedImage).map((image, i) => (
            <a
              key={i}
              href={`${URL.createObjectURL(image)}`}
              download={image.name}
            >
              <img className="image" src={`${URL.createObjectURL(image)}`} />
            </a>
          ))}
      </div>
    </div>
  );
}

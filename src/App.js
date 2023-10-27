import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css'; 

const App = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const reset = () => {
        resetTranscript();
        setSummary('');
    };

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    const stopListeningAndSendToAPI = () => {
        SpeechRecognition.stopListening();
        setLoading(true); // Set loading to true while waiting for the response
        sendToAPI(transcript);
    };

    const sendToAPI = (text) => {
        fetch('http://localhost:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
            .then((response) => response.json())
            .then((data) => {
                setSummary(data.summary);
                setLoading(false); // Set loading back to false after receiving the response
            })
            .catch((error) => {
                console.error('Error sending data to API:', error);
                setLoading(false); // Handle errors and set loading back to false
            });
    };

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <>
            <div className="container">
                <h2>Convert</h2>
                <div className="btn-style">
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={stopListeningAndSendToAPI}>Stop Listening</button>
                    <button onClick={reset}>Reset</button>
                </div>
                <div className="main-content">
                    {transcript}
                </div>
                <div className="summary">
                    {loading ? (
                        <div className="loader">
                            <div className="loader-overlay"></div>
                            <div className="loader-content">
                            <ClipLoader
                                loading={loading}
                                size={75}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            </div>
                        </div>
                    ) : summary ? (
                        <div>
                            <h2>Summary:</h2>
                            <p>{summary}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default App;
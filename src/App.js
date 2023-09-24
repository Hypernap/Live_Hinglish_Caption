
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';




const App = () => {

    const reset = () =>{
        const ele = document.getElementsByClassName("main-content");
        ele[0].innerHTML="";
    }
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <div className="container">
                <h2>Convert</h2>
                <div className="btn-style">
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button onClick={reset}>Reset</button>
                </div>
                <div className="main-content" >
                    {transcript}
                </div>
            </div>

        </>
    );
};

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, MousePointerClick, Code, RefreshCw } from 'lucide-react'; 

// အဓိက App Component 
const App = () => {
    // ကလစ်မှတ်၏ လက်ရှိတည်နေရာ (ပထမအစ x: 100, y: 300 နေရာ)
    const [targetPos, setTargetPos] = useState({ x: 100, y: 300 });
    // ကလစ်လုပ်ဆောင်နေသော အခြေအနေ
    const [isRunning, setIsRunning] = useState(false);
    // ကလစ်ကြားကာလ (မီလီစက္ကန့်)
    const [intervalMs, setIntervalMs] = useState(1000); 
    // အသုံးပြုသူ၏ စိတ်ကြိုက် JavaScript Script
    const [scriptCode, setScriptCode] = useState('console.log("ကလစ် အောင်မြင်ပါသည်။ - Click Success.");');
    // ကလစ်ရေတွက်မှု
    const [clickCount, setClickCount] = useState(0); 
    // Interval Timer ကို သိမ်းဆည်းရန်
    const clickerTimer = useRef(null);
    // Dragging လုပ်ဆောင်နေသော အခြေအနေ
    const [isDragging, setIsDragging] = useState(false);
    // Dragging အတွက် ထိတွေ့မှတ်၏ အော့ဖ်ဆက်
    const dragOffset = useRef({ x: 0, y: 0 }); 

    // Mobile touch drag စတင်ခြင်း
    const handleTouchStart = (e) => {
        // ကလစ်မှတ်ကို စတင်ဆွဲယူသည်
        if (isRunning) return; 
        e.preventDefault();
        const targetRect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        
        // ကလစ်မှတ်နှင့် လက်ချောင်း ထိတွေ့မှတ်ကြား အကွာအဝေး (Offset) ကို မှတ်သားသည်
        dragOffset.current = {
            x: touch.clientX - targetRect.left,
            y: touch.clientY - targetRect.top,
        };
        setIsDragging(true);
    };

    // Mobile touch drag ရွေ့လျားခြင်း
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        
        // ကလစ်မှတ်၏ အသစ်တည်နေရာကို တွက်ချက်သည်
        const newX = touch.clientX - dragOffset.current.x;
        const newY = touch.clientY - dragOffset.current.y;

        // မျက်နှာပြင်နယ်နိမိတ်အတွင်း၌သာ ရှိစေရန် ထိန်းချုပ်သည်
        const elementSize = 50; // ကလစ်မှတ်အရွယ်အစား
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        setTargetPos({
            x: Math.max(0, Math.min(newX, viewportWidth - elementSize)), 
            y: Math.max(0, Math.min(newY, viewportHeight - elementSize)),
        });
    };

    // Mobile touch drag ပြီးဆုံးခြင်း
    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // ကလစ်လုပ်ဆောင်ချက် စတင်ခြင်း
    const startClicker = () => {
        if (isRunning) return;
        
        const ms = parseInt(intervalMs, 10);
        if (isNaN(ms) || ms < 50) {
            console.error("ကြားကာလ (Interval) သည် အနည်းဆုံး 50ms ဖြစ်ရမည်။");
            // Custom modal or message box here instead of alert
            return;
        }

        setIsRunning(true);
        setClickCount(0);

        // Interval ကို သတ်မှတ်သည်
        clickerTimer.current = setInterval(() => {
            setClickCount(prev => prev + 1);
            
            try {
                // အသုံးပြုသူ၏ Script ကို run သည် (အလွန်အရေးကြီးသောအဆင့်)
                // ဤနေရာတွင် 'clickX' နှင့် 'clickY' ကို သုံးနိုင်သည်
                const clickX = targetPos.x + 25; // ကလစ်မှတ်အလယ်ဗဟို
                const clickY = targetPos.y + 25; 
                
                // Script Code ထဲသို့ ပတ်ဝန်းကျင်ဆိုင်ရာ variable များ ထည့်သွင်းပေးသည်
                const wrappedScript = `
                    const clickX = ${clickX};
                    const clickY = ${clickY};
                    try {
                        ${scriptCode}
                    } catch (e) {
                        console.error("Script Error:", e);
                    }
                `;
                
                // eval() ကို သုံး၍ Script ကို run သည်
                eval(wrappedScript);

                // UI ပေါ်တွင် ကလစ်မှတ်တုံ့ပြန်မှုကို ခေတ္တပြသည်
                const targetElement = document.getElementById('click-target');
                if (targetElement) {
                    targetElement.style.backgroundColor = 'rgba(239, 68, 68, 0.8)'; // Red Flash
                    setTimeout(() => {
                        targetElement.style.backgroundColor = 'rgba(79, 70, 229, 0.9)'; // Back to Blue
                    }, 50);
                }

            } catch (error) {
                console.error("Script Run Error:", error);
                stopClicker(); // Error ဖြစ်ပါက ရပ်တန့်သည်
            }
        }, ms);
    };

    // ကလစ်လုပ်ဆောင်ချက် ရပ်တန့်ခြင်း
    const stopClicker = () => {
        if (clickerTimer.current) {
            clearInterval(clickerTimer.current);
            clickerTimer.current = null;
        }
        setIsRunning(false);
    };

    // Component ပိတ်သောအခါ Interval ကို ရှင်းလင်းရန်
    useEffect(() => {
        return () => {
            if (clickerTimer.current) {
                clearInterval(clickerTimer.current);
            }
        };
    }, []);

    // ကလစ်မှတ် Element (Movable Target)
    const ClickTarget = () => (
        <div
            id="click-target"
            className={`fixed w-12 h-12 rounded-full shadow-2xl flex items-center justify-center text-white cursor-grab active:cursor-grabbing transition-colors duration-100 ease-in-out z-50 ${isRunning ? 'opacity-50' : 'opacity-90 hover:opacity-100'}`}
            style={{ 
                transform: `translate(${targetPos.x}px, ${targetPos.y}px)`,
                backgroundColor: 'rgba(79, 70, 229, 0.9)', // Indigo 500
                top: 0, 
                left: 0,
                touchAction: 'none' // Mobile dragging အတွက်
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <MousePointerClick className="w-6 h-6" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            {/* Tailwind CSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                /* Use Inter font for better readability */
                .font-sans { font-family: 'Inter', sans-serif; }
                /* Custom styles for better script editor */
                textarea#script-editor {
                    font-family: 'Consolas', 'Monaco', monospace;
                    font-size: 13px;
                }
            `}</style>

            {/* Floating Click Target */}
            <ClickTarget />

            {/* Header */}
            <header className="p-4 bg-indigo-700 text-white shadow-xl">
                <h1 className="text-xl font-bold">အော်တိုကလစ်ကာ စမ်းသပ်မှု (Auto-Clicker Test)</h1>
            </header>

            {/* Control Panel */}
            <main className="p-4 flex-grow overflow-y-auto">
                {/* Status and Instructions */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-4 border-l-4 border-yellow-500">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                        အခြေအနေ (Status): 
                        <span className={`ml-2 px-3 py-1 text-xs font-bold rounded-full ${isRunning ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isRunning ? 'လည်ပတ်နေသည် (Running)' : 'ရပ်နားထားသည် (Stopped)'}
                        </span>
                    </p>
                    <p className="text-xs text-gray-500">
                        <span className="font-bold text-indigo-500">ကလစ်ရေတွက်မှု:</span> {clickCount} / 
                        <span className="font-bold text-indigo-500">တည်နေရာ:</span> (x: {targetPos.x.toFixed(0)}, y: {targetPos.y.toFixed(0)})
                    </p>
                    <p className="text-xs text-indigo-500 mt-2">
                        **လမ်းညွှန်:** <span className='font-normal'>ကလစ်မှတ်ကို ရွှေ့ရန် ဖိဆွဲပါ။ ဤသည်မှာ WebView အတွင်းမှ အတုယူဖန်တီးမှုသာ ဖြစ်သည်။</span>
                    </p>
                </div>

                {/* Interval Input */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-4">
                    <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-2">
                        ကလစ်ကြားကာလ (မီလီစက္ကန့် - ms)
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            id="interval"
                            type="number"
                            min="50"
                            value={intervalMs}
                            onChange={(e) => setIntervalMs(e.target.value)}
                            disabled={isRunning}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="1000"
                        />
                        <button 
                            onClick={() => setIntervalMs(100)} 
                            className="bg-gray-200 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-lg hover:bg-gray-300 transition-colors"
                            disabled={isRunning}
                        >
                            100ms
                        </button>
                    </div>
                </div>

                {/* Script Input */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                    <label htmlFor="script-editor" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-1"/> ထိန်းချုပ် Script (JavaScript)
                    </label>
                    <textarea
                        id="script-editor"
                        rows="8"
                        value={scriptCode}
                        onChange={(e) => setScriptCode(e.target.value)}
                        disabled={isRunning}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-gray-50"
                        placeholder="// ဤနေရာတွင် သင်၏ စိတ်ကြိုက် JavaScript Logic ကို ထည့်ပါ။"
                    />
                    <div className="text-xs text-gray-500 mt-2 flex items-center">
                        <RefreshCw className="w-3 h-3 mr-1"/>
                        သင်၏ Script အတွင်း **clickX** နှင့် **clickY** (ကလစ်မှတ်၏ ဗဟိုတည်နေရာများ) ကို သုံးနိုင်သည်။
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={startClicker}
                        disabled={isRunning}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium text-white shadow-lg transition-all ${
                            isRunning
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 transform hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                    >
                        <Play className="w-5 h-5" />
                        <span>စတင် (Start)</span>
                    </button>
                    <button
                        onClick={stopClicker}
                        disabled={!isRunning}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium text-white shadow-lg transition-all ${
                            !isRunning
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 transform hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                    >
                        <Square className="w-5 h-5" />
                        <span>ရပ်တန့် (Stop)</span>
                    </button>
                </div>
                
            </main>
            
            {/* Listeners for safe touch end/cancel outside the target */}
            <div 
                className={`fixed inset-0 z-40 transition-opacity ${isDragging ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            />

        </div>
    );
};

export default App;

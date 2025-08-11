'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyData {
  keyCode: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
}

interface KeyProps extends KeyData {
  isPressed?: boolean;
  scale: number;
}

interface KeyboardLayoutProps {
  onKeyPress?: (keyCode: string) => void;
  pressedKeys?: Set<string>;
}

const Key: React.FC<KeyProps> = ({ 
  keyCode, 
  label, 
  width = 44,
  height = 44,
  isPressed = false,
  className = '',
  scale
}) => {
  return (
    <motion.div
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
      className={`flex items-center justify-center rounded font-medium transition-all duration-100 ${
        isPressed 
          ? 'bg-blue-400 text-gray-900 shadow-md transform scale-95' 
          : className.includes('text-blue-600')
            ? 'bg-gray-300 text-blue-600 shadow-sm hover:bg-gray-200'
            : 'bg-gray-300 text-gray-800 shadow-sm hover:bg-gray-200 active:scale-95'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      data-key={keyCode}
    >
      <span className="text-center leading-tight whitespace-pre-line" style={{ fontSize: `${12 * scale}px` }}>
        {label}
      </span>
    </motion.div>
  );
};

export default function ModernKeyboardLayout({ 
  pressedKeys = new Set()
}: KeyboardLayoutProps) {
  const [layoutType, setLayoutType] = useState<'tkl' | 'full'>('tkl');
  const [keyboardScale, setKeyboardScale] = useState(1);

  // 반응형 스케일링
  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      let autoScale = 1;
      
      // 키보드가 화면에 맞도록 더 적극적으로 스케일링
      if (screenWidth < 480) { // 매우 작은 모바일
        autoScale = 0.25;
      } else if (screenWidth < 640) { // 모바일
        autoScale = 0.35;
      } else if (screenWidth < 768) { // 큰 모바일
        autoScale = 0.45;
      } else if (screenWidth < 1024) { // 태블릿
        autoScale = 0.55;
      } else if (screenWidth < 1280) { // 작은 데스크톱
        autoScale = 0.65;
      } else if (screenWidth < 1536) { // 일반 데스크톱
        autoScale = 0.75;
      } else { // 큰 데스크톱
        autoScale = 0.85;
      }
      
      setKeyboardScale(autoScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // TKL 키 데이터 (정확한 underthekey 스타일)
  const tklKeyData: KeyData[][] = [
    // Function Row
    [
      { keyCode: "Escape", label: "Esc", width: 44 },
      // 20px gap
      { keyCode: "F1", label: "F1", width: 44 },
      { keyCode: "F2", label: "F2", width: 44 },
      { keyCode: "F3", label: "F3", width: 44 },
      { keyCode: "F4", label: "F4", width: 44 },
      // 10px gap
      { keyCode: "F5", label: "F5", width: 44 },
      { keyCode: "F6", label: "F6", width: 44 },
      { keyCode: "F7", label: "F7", width: 44 },
      { keyCode: "F8", label: "F8", width: 44 },
      // 10px gap
      { keyCode: "F9", label: "F9", width: 44 },
      { keyCode: "F10", label: "F10", width: 44 },
      { keyCode: "F11", label: "F11", width: 44 },
      { keyCode: "F12", label: "F12", width: 44 },
      // 15px gap
      { keyCode: "PrintScreen", label: "Prt Sc", width: 44 },
      { keyCode: "ScrollLock", label: "Scr Lk", width: 44 },
      { keyCode: "Pause", label: "Pause", width: 44 }
    ],
    
    // Number Row
    [
      { keyCode: "Backquote", label: "`", width: 44 },
      { keyCode: "Digit1", label: "1", width: 44 },
      { keyCode: "Digit2", label: "2", width: 44 },
      { keyCode: "Digit3", label: "3", width: 44 },
      { keyCode: "Digit4", label: "4", width: 44 },
      { keyCode: "Digit5", label: "5", width: 44 },
      { keyCode: "Digit6", label: "6", width: 44 },
      { keyCode: "Digit7", label: "7", width: 44 },
      { keyCode: "Digit8", label: "8", width: 44 },
      { keyCode: "Digit9", label: "9", width: 44 },
      { keyCode: "Digit0", label: "0", width: 44 },
      { keyCode: "Minus", label: "-", width: 44 },
      { keyCode: "Equal", label: "=", width: 44 },
      { keyCode: "Backspace", label: "Backspace", width: 88 },
      // 15px gap
      { keyCode: "Insert", label: "Ins", width: 44 },
      { keyCode: "Home", label: "Home", width: 44 },
      { keyCode: "PageUp", label: "PgUp", width: 44 }
    ],

    // QWERTY Row
    [
      { keyCode: "Tab", label: "Tab", width: 66 },
      { keyCode: "KeyQ", label: "Q", width: 44 },
      { keyCode: "KeyW", label: "W", width: 44 },
      { keyCode: "KeyE", label: "E", width: 44 },
      { keyCode: "KeyR", label: "R", width: 44 },
      { keyCode: "KeyT", label: "T", width: 44 },
      { keyCode: "KeyY", label: "Y", width: 44 },
      { keyCode: "KeyU", label: "U", width: 44 },
      { keyCode: "KeyI", label: "I", width: 44 },
      { keyCode: "KeyO", label: "O", width: 44 },
      { keyCode: "KeyP", label: "P", width: 44 },
      { keyCode: "BracketLeft", label: "[", width: 44 },
      { keyCode: "BracketRight", label: "]", width: 44 },
      { keyCode: "Backslash", label: "\\", width: 66 },
      // 15px gap
      { keyCode: "Delete", label: "Del", width: 44 },
      { keyCode: "End", label: "End", width: 44 },
      { keyCode: "PageDown", label: "PgDn", width: 44 }
    ],

    // ASDF Row (Home Row)
    [
      { keyCode: "CapsLock", label: "Caps Lock", width: 77 },
      { keyCode: "KeyA", label: "A", width: 44 },
      { keyCode: "KeyS", label: "S", width: 44 },
      { keyCode: "KeyD", label: "D", width: 44 },
      { keyCode: "KeyF", label: "F", width: 44 },
      { keyCode: "KeyG", label: "G", width: 44 },
      { keyCode: "KeyH", label: "H", width: 44 },
      { keyCode: "KeyJ", label: "J", width: 44 },
      { keyCode: "KeyK", label: "K", width: 44 },
      { keyCode: "KeyL", label: "L", width: 44 },
      { keyCode: "Semicolon", label: ";", width: 44 },
      { keyCode: "Quote", label: "'", width: 44 },
      { keyCode: "Enter", label: "Enter", width: 99 }
    ],

    // ZXCV Row
    [
      { keyCode: "ShiftLeft", label: "Shift", width: 99, className: "text-blue-600" },
      { keyCode: "KeyZ", label: "Z", width: 44 },
      { keyCode: "KeyX", label: "X", width: 44 },
      { keyCode: "KeyC", label: "C", width: 44 },
      { keyCode: "KeyV", label: "V", width: 44 },
      { keyCode: "KeyB", label: "B", width: 44 },
      { keyCode: "KeyN", label: "N", width: 44 },
      { keyCode: "KeyM", label: "M", width: 44 },
      { keyCode: "Comma", label: ",", width: 44 },
      { keyCode: "Period", label: ".", width: 44 },
      { keyCode: "Slash", label: "/", width: 44 },
      { keyCode: "ShiftRight", label: "Shift", width: 121, className: "text-blue-600" },
      // 57px gap to arrow up
      { keyCode: "ArrowUp", label: "↑", width: 44 }
    ],

    // Bottom Row (Space Row)
    [
      { keyCode: "ControlLeft", label: "Ctrl", width: 55, className: "text-blue-600" },
      { keyCode: "MetaLeft", label: "Win", width: 55, className: "text-blue-600" },
      { keyCode: "AltLeft", label: "Alt", width: 55 },
      { keyCode: "Space", label: "", width: 297 },
      { keyCode: "AltRight", label: "Alt", width: 55 },
      { keyCode: "MetaRight", label: "Win", width: 55, className: "text-blue-600" },
      { keyCode: "ContextMenu", label: "Menu", width: 55 },
      { keyCode: "ControlRight", label: "Ctrl", width: 55, className: "text-blue-600" },
      // 13px gap
      { keyCode: "ArrowLeft", label: "←", width: 44 },
      { keyCode: "ArrowDown", label: "↓", width: 44 },
      { keyCode: "ArrowRight", label: "→", width: 44 }
    ]
  ];

  // 풀사이즈 키 데이터 (정확한 underthekey 스타일)
  const fullKeyData: KeyData[][] = [
    // Function Row
    [
      { keyCode: "Escape", label: "Esc", width: 44 },
      // 20px gap
      { keyCode: "F1", label: "F1", width: 44 },
      { keyCode: "F2", label: "F2", width: 44 },
      { keyCode: "F3", label: "F3", width: 44 },
      { keyCode: "F4", label: "F4", width: 44 },
      // 10px gap
      { keyCode: "F5", label: "F5", width: 44 },
      { keyCode: "F6", label: "F6", width: 44 },
      { keyCode: "F7", label: "F7", width: 44 },
      { keyCode: "F8", label: "F8", width: 44 },
      // 10px gap
      { keyCode: "F9", label: "F9", width: 44 },
      { keyCode: "F10", label: "F10", width: 44 },
      { keyCode: "F11", label: "F11", width: 44 },
      { keyCode: "F12", label: "F12", width: 44 },
      // 15px gap
      { keyCode: "PrintScreen", label: "Prt Sc", width: 44 },
      { keyCode: "ScrollLock", label: "Scr Lk", width: 44 },
      { keyCode: "Pause", label: "Pause", width: 44 }
    ],
    
    // Number Row (with Numpad)
    [
      { keyCode: "Backquote", label: "`", width: 44 },
      { keyCode: "Digit1", label: "1", width: 44 },
      { keyCode: "Digit2", label: "2", width: 44 },
      { keyCode: "Digit3", label: "3", width: 44 },
      { keyCode: "Digit4", label: "4", width: 44 },
      { keyCode: "Digit5", label: "5", width: 44 },
      { keyCode: "Digit6", label: "6", width: 44 },
      { keyCode: "Digit7", label: "7", width: 44 },
      { keyCode: "Digit8", label: "8", width: 44 },
      { keyCode: "Digit9", label: "9", width: 44 },
      { keyCode: "Digit0", label: "0", width: 44 },
      { keyCode: "Minus", label: "-", width: 44 },
      { keyCode: "Equal", label: "=", width: 44 },
      { keyCode: "Backspace", label: "Backspace", width: 88 },
      // 15px gap
      { keyCode: "Insert", label: "Ins", width: 44 },
      { keyCode: "Home", label: "Home", width: 44 },
      { keyCode: "PageUp", label: "PgUp", width: 44 },
      // 15px gap
      { keyCode: "NumLock", label: "Num", width: 44 },
      { keyCode: "NumpadDivide", label: "/", width: 44 },
      { keyCode: "NumpadMultiply", label: "*", width: 44 },
      { keyCode: "NumpadSubtract", label: "-", width: 44 }
    ],

    // QWERTY Row (with Numpad)
    [
      { keyCode: "Tab", label: "Tab", width: 66 },
      { keyCode: "KeyQ", label: "Q", width: 44 },
      { keyCode: "KeyW", label: "W", width: 44 },
      { keyCode: "KeyE", label: "E", width: 44 },
      { keyCode: "KeyR", label: "R", width: 44 },
      { keyCode: "KeyT", label: "T", width: 44 },
      { keyCode: "KeyY", label: "Y", width: 44 },
      { keyCode: "KeyU", label: "U", width: 44 },
      { keyCode: "KeyI", label: "I", width: 44 },
      { keyCode: "KeyO", label: "O", width: 44 },
      { keyCode: "KeyP", label: "P", width: 44 },
      { keyCode: "BracketLeft", label: "[", width: 44 },
      { keyCode: "BracketRight", label: "]", width: 44 },
      { keyCode: "Backslash", label: "\\", width: 66 },
      // 15px gap
      { keyCode: "Delete", label: "Del", width: 44 },
      { keyCode: "End", label: "End", width: 44 },
      { keyCode: "PageDown", label: "PgDn", width: 44 },
      // 15px gap
      { keyCode: "Numpad7", label: "7", width: 44 },
      { keyCode: "Numpad8", label: "8", width: 44 },
      { keyCode: "Numpad9", label: "9", width: 44 },
      // Numpad + is double height
      { keyCode: "NumpadAdd", label: "+", width: 44, height: 98 }
    ],

    // ASDF Row (with Numpad)
    [
      { keyCode: "CapsLock", label: "Caps Lock", width: 77 },
      { keyCode: "KeyA", label: "A", width: 44 },
      { keyCode: "KeyS", label: "S", width: 44 },
      { keyCode: "KeyD", label: "D", width: 44 },
      { keyCode: "KeyF", label: "F", width: 44 },
      { keyCode: "KeyG", label: "G", width: 44 },
      { keyCode: "KeyH", label: "H", width: 44 },
      { keyCode: "KeyJ", label: "J", width: 44 },
      { keyCode: "KeyK", label: "K", width: 44 },
      { keyCode: "KeyL", label: "L", width: 44 },
      { keyCode: "Semicolon", label: ";", width: 44 },
      { keyCode: "Quote", label: "'", width: 44 },
      { keyCode: "Enter", label: "Enter", width: 99 },
      // 104px gap to numpad
      { keyCode: "Numpad4", label: "4", width: 44 },
      { keyCode: "Numpad5", label: "5", width: 44 },
      { keyCode: "Numpad6", label: "6", width: 44 }
    ],

    // ZXCV Row (with Numpad)
    [
      { keyCode: "ShiftLeft", label: "Shift", width: 99, className: "text-blue-600" },
      { keyCode: "KeyZ", label: "Z", width: 44 },
      { keyCode: "KeyX", label: "X", width: 44 },
      { keyCode: "KeyC", label: "C", width: 44 },
      { keyCode: "KeyV", label: "V", width: 44 },
      { keyCode: "KeyB", label: "B", width: 44 },
      { keyCode: "KeyN", label: "N", width: 44 },
      { keyCode: "KeyM", label: "M", width: 44 },
      { keyCode: "Comma", label: ",", width: 44 },
      { keyCode: "Period", label: ".", width: 44 },
      { keyCode: "Slash", label: "/", width: 44 },
      { keyCode: "ShiftRight", label: "Shift", width: 121, className: "text-blue-600" },
      // 57px gap to arrow up
      { keyCode: "ArrowUp", label: "↑", width: 44 },
      // 15px gap to numpad
      { keyCode: "Numpad1", label: "1", width: 44 },
      { keyCode: "Numpad2", label: "2", width: 44 },
      { keyCode: "Numpad3", label: "3", width: 44 },
      // Numpad Enter is double height
      { keyCode: "NumpadEnter", label: "Enter", width: 44, height: 98 }
    ],

    // Bottom Row (with Numpad)
    [
      { keyCode: "ControlLeft", label: "Ctrl", width: 55, className: "text-blue-600" },
      { keyCode: "MetaLeft", label: "Win", width: 55, className: "text-blue-600" },
      { keyCode: "AltLeft", label: "Alt", width: 55 },
      { keyCode: "Space", label: "", width: 297 },
      { keyCode: "AltRight", label: "Alt", width: 55 },
      { keyCode: "MetaRight", label: "Win", width: 55, className: "text-blue-600" },
      { keyCode: "ContextMenu", label: "Menu", width: 55 },
      { keyCode: "ControlRight", label: "Ctrl", width: 55, className: "text-blue-600" },
      // 13px gap
      { keyCode: "ArrowLeft", label: "←", width: 44 },
      { keyCode: "ArrowDown", label: "↓", width: 44 },
      { keyCode: "ArrowRight", label: "→", width: 44 },
      // 15px gap
      { keyCode: "Numpad0", label: "0", width: 98 },
      { keyCode: "NumpadDecimal", label: ".", width: 44 }
    ]
  ];

  const currentKeyData = layoutType === 'tkl' ? tklKeyData : fullKeyData;

  // 각 행의 갭 설정
  const rowGaps = layoutType === 'tkl' ? [
    [1, 5, 9, 13],           // Function row: after Esc, F4, F8, F12 
    [14],                    // Number row: after Backspace
    [14],                    // QWERTY row: after Backslash
    [],                      // ASDF row: no gaps
    [12],                    // ZXCV row: after right Shift (arrow cluster)
    [8]                      // Bottom row: after right Ctrl
  ] : [
    [1, 5, 9, 13],           // Function row
    [14, 18],                // Number row: after Backspace, PgUp
    [14, 18],                // QWERTY row: after Backslash, PgDn
    [13],                    // ASDF row: after Enter (numpad section)
    [12, 14],                // ZXCV row: after right Shift, arrow up
    [8, 12]                  // Bottom row: after right Ctrl, right arrow
  ];

  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
      {/* 컨트롤 패널 */}
      <div className="flex items-center justify-center mb-6 space-x-6">
        {/* 수동 스케일 조절 */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm font-medium">크기</span>
          <div className="relative w-48">
            <input
              type="range"
              min="0.25"
              max="1"
              step="0.05"
              value={keyboardScale}
              onChange={(e) => setKeyboardScale(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((keyboardScale - 0.25) / 0.75) * 100}%, #d1d5db ${((keyboardScale - 0.25) / 0.75) * 100}%, #d1d5db 100%)`
              }}
            />
            <div className="absolute -top-6 left-0 right-0 text-center text-gray-600 text-xs">
              {Math.round(keyboardScale * 100)}%
            </div>
          </div>
        </div>

        {/* 레이아웃 전환 */}
        <div className="flex items-center space-x-4">
          <div className="relative h-10 w-32">
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-md"
              animate={{
                left: layoutType === 'tkl' ? '4px' : '50%',
                right: layoutType === 'tkl' ? '50%' : '4px',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <div className="relative flex h-full">
              <button
                onClick={() => setLayoutType('tkl')}
                className={`flex-1 text-sm font-medium transition-colors ${
                  layoutType === 'tkl' ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                TKL
              </button>
              <button
                onClick={() => setLayoutType('full')}
                className={`flex-1 text-sm font-medium transition-colors ${
                  layoutType === 'full' ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                Full
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 키보드 레이아웃 */}
      <div className="flex justify-center">
        <div 
          className="bg-gray-800 rounded-2xl shadow-2xl"
          style={{ 
            padding: `${24 * keyboardScale}px`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={layoutType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ gap: `${8 * keyboardScale}px` }}
              className="flex flex-col"
            >
              {currentKeyData.map((row, rowIndex) => (
                <div 
                  key={`row-${rowIndex}`} 
                  className="flex items-start"
                  style={{ gap: `${6 * keyboardScale}px` }}
                >
                  {row.map((keyData, keyIndex) => {
                    const gapIndex = rowGaps[rowIndex]?.indexOf(keyIndex);
                    const hasGap = gapIndex !== -1;
                    const gapSize = hasGap ? (
                      rowIndex === 0 ? // Function row
                        (keyIndex === 1 ? 20 : keyIndex === 5 || keyIndex === 9 ? 10 : 15) :
                      rowIndex === 1 ? // Number row
                        (layoutType === 'full' && keyIndex === 18 ? 15 : 15) :
                      rowIndex === 2 ? // QWERTY row  
                        (layoutType === 'full' && keyIndex === 18 ? 15 : 15) :
                      rowIndex === 3 && layoutType === 'full' ? // ASDF row (full only)
                        104 :
                      rowIndex === 4 ? // ZXCV row
                        (keyIndex === 12 ? 57 : layoutType === 'full' && keyIndex === 14 ? 15 : 57) :
                      rowIndex === 5 ? // Bottom row
                        (keyIndex === 8 ? 13 : layoutType === 'full' && keyIndex === 12 ? 15 : 13) :
                      0
                    ) : 0;

                    return (
                      <React.Fragment key={`${rowIndex}-${keyIndex}`}>
                        <Key
                          keyCode={keyData.keyCode}
                          label={keyData.label}
                          width={keyData.width}
                          height={keyData.height}
                          isPressed={pressedKeys.has(keyData.keyCode)}
                          className={keyData.className}
                          scale={keyboardScale}
                        />
                        {hasGap && (
                          <div style={{ width: `${gapSize * keyboardScale}px` }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '@/styles/KeyboardTesterNew.module.css';

interface KeyboardTesterProps {
  pressedKeys?: Set<string>;
}

const KeyboardTester: React.FC<KeyboardTesterProps> = ({ 
  pressedKeys = new Set()
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>('retro');
  const [layout, setLayout] = useState<'fullSize' | 'tkl'>('fullSize');
  const [language, setLanguage] = useState<'korean' | 'english'>('korean');
  const keyboardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializeTheme = useCallback(() => {
    const savedTheme = localStorage.getItem('keyboardTheme');
    if (savedTheme && ['retro', 'navyBlue', 'green', 'purple', 'red'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // 키보드 크기 동적 조정
  const updateScale = useCallback(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    let scale;

    if (width > 1392) scale = 0.8;
    else if (width > 1264) scale = 0.75;
    else if (width > 1056) scale = 0.7;
    else if (width > 928) scale = 0.65;
    else if (width > 784) scale = 0.6;
    else if (width > 640) scale = 0.5;
    else if (width > 512) scale = 0.4;
    else if (width > 384) scale = 0.3;
    else scale = 0.25;

    containerRef.current.style.setProperty('--tester-scale', scale.toString());
  }, []);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const changeTheme = useCallback((themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem('keyboardTheme', themeName);
  }, []);

  // 한글 키보드 매핑
  const koreanKeyMap: { [key: string]: string } = {
    // 숫자 행
    'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
    'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
    'Minus': '-', 'Equal': '=', 'Backquote': '`',
    
    // 상단 문자 행 (ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ)
    'KeyQ': 'ㅂ', 'KeyW': 'ㅈ', 'KeyE': 'ㄷ', 'KeyR': 'ㄱ', 'KeyT': 'ㅅ',
    'KeyY': 'ㅛ', 'KeyU': 'ㅕ', 'KeyI': 'ㅑ', 'KeyO': 'ㅐ', 'KeyP': 'ㅔ',
    'BracketLeft': '[', 'BracketRight': ']', 'Backslash': '\\',
    
    // 중간 문자 행 (ㅁㄴㅇㄹㅎㅗㅓㅏㅣ)
    'KeyA': 'ㅁ', 'KeyS': 'ㄴ', 'KeyD': 'ㅇ', 'KeyF': 'ㄹ', 'KeyG': 'ㅎ',
    'KeyH': 'ㅗ', 'KeyJ': 'ㅓ', 'KeyK': 'ㅏ', 'KeyL': 'ㅣ',
    'Semicolon': ';', 'Quote': "'",
    
    // 하단 문자 행 (ㅋㅌㅊㅍㅠㅜㅡ)
    'KeyZ': 'ㅋ', 'KeyX': 'ㅌ', 'KeyC': 'ㅊ', 'KeyV': 'ㅍ', 'KeyB': 'ㅠ',
    'KeyN': 'ㅜ', 'KeyM': 'ㅡ', 'Comma': ',', 'Period': '.', 'Slash': '/'
  };

  // 영문 키보드 매핑
  const englishKeyMap: { [key: string]: string } = {
    // 숫자 행
    'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
    'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
    'Minus': '-', 'Equal': '=', 'Backquote': '`',
    
    // 상단 문자 행
    'KeyQ': 'Q', 'KeyW': 'W', 'KeyE': 'E', 'KeyR': 'R', 'KeyT': 'T',
    'KeyY': 'Y', 'KeyU': 'U', 'KeyI': 'I', 'KeyO': 'O', 'KeyP': 'P',
    'BracketLeft': '[', 'BracketRight': ']', 'Backslash': '\\',
    
    // 중간 문자 행
    'KeyA': 'A', 'KeyS': 'S', 'KeyD': 'D', 'KeyF': 'F', 'KeyG': 'G',
    'KeyH': 'H', 'KeyJ': 'J', 'KeyK': 'K', 'KeyL': 'L',
    'Semicolon': ';', 'Quote': "'",
    
    // 하단 문자 행
    'KeyZ': 'Z', 'KeyX': 'X', 'KeyC': 'C', 'KeyV': 'V', 'KeyB': 'B',
    'KeyN': 'N', 'KeyM': 'M', 'Comma': ',', 'Period': '.', 'Slash': '/'
  };

  const getKeyLabel = (keyCode: string, fallbackLabel: string): string => {
    const keyMap = language === 'korean' ? koreanKeyMap : englishKeyMap;
    return keyMap[keyCode] || fallbackLabel;
  };


  const renderKey = useCallback((keyCode: string, label: string, additionalClass: string = '') => {
    const isPressed = pressedKeys.has(keyCode) || 
                     pressedKeys.has(keyCode.toLowerCase()) || 
                     pressedKeys.has(keyCode.toUpperCase());
    
    const isAccentKey = ['Backquote', 'Backspace', 'Tab', 'CapsLock', 'Enter', 'Space', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'ContextMenu', 'Insert', 'Home', 'PageUp', 'Delete', 'End', 'PageDown', 'NumLock', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract', 'NumpadAdd', 'NumpadEnter', 'PrintScreen', 'ScrollLock', 'Pause', 'Backslash'].includes(keyCode);
    
    const classes = `${styles.key} ${additionalClass} ${isPressed ? styles.keyPressed : ''} ${isAccentKey ? styles.keyAccentColor : ''}`;

    // 언어별 라벨 가져오기
    const displayLabel = getKeyLabel(keyCode, label);

    return (
      <div key={keyCode} className={classes} data-key={keyCode}>
        {displayLabel}
      </div>
    );
  }, [pressedKeys, language]);

  const renderKeyboard = () => {
    return (
      <>
        {/* Function Row */}
        <section className={`${styles.region} ${styles.function}`}>
          {renderKey('Escape', 'Esc')}
          <div className={styles.spacer}></div>
          {renderKey('F1', 'F1')}
          {renderKey('F2', 'F2')}
          {renderKey('F3', 'F3')}
          {renderKey('F4', 'F4')}
          <div className={styles.spacer}></div>
          {renderKey('F5', 'F5')}
          {renderKey('F6', 'F6')}
          {renderKey('F7', 'F7')}
          {renderKey('F8', 'F8')}
          <div className={styles.spacer}></div>
          {renderKey('F9', 'F9')}
          {renderKey('F10', 'F10')}
          {renderKey('F11', 'F11')}
          {renderKey('F12', 'F12')}
        </section>

        {/* System Control */}
        <section className={`${styles.region} ${styles.systemControl}`}>
          {renderKey('PrintScreen', 'Prt Sc')}
          {renderKey('ScrollLock', 'Scr Lk')}
          {renderKey('Pause', 'Pause')}
        </section>

        {/* Main Typewriter */}
        <section className={`${styles.region} ${styles.typewriter}`}>
          <div className={styles.firstRow}>
            {renderKey('Backquote', '`')}
            {renderKey('Digit1', '1')}
            {renderKey('Digit2', '2')}
            {renderKey('Digit3', '3')}
            {renderKey('Digit4', '4')}
            {renderKey('Digit5', '5')}
            {renderKey('Digit6', '6')}
            {renderKey('Digit7', '7')}
            {renderKey('Digit8', '8')}
            {renderKey('Digit9', '9')}
            {renderKey('Digit0', '0')}
            {renderKey('Minus', '-')}
            {renderKey('Equal', '=')}
            {renderKey('Backspace', 'Backspace', styles.keyWide)}
          </div>
          <div className={styles.secondRow}>
            {renderKey('Tab', 'Tab', styles.keyOneHalf)}
            {renderKey('KeyQ', 'Q')}
            {renderKey('KeyW', 'W')}
            {renderKey('KeyE', 'E')}
            {renderKey('KeyR', 'R')}
            {renderKey('KeyT', 'T')}
            {renderKey('KeyY', 'Y')}
            {renderKey('KeyU', 'U')}
            {renderKey('KeyI', 'I')}
            {renderKey('KeyO', 'O')}
            {renderKey('KeyP', 'P')}
            {renderKey('BracketLeft', '[')}
            {renderKey('BracketRight', ']')}
            {renderKey('Backslash', '\\', styles.keyOneHalf)}
          </div>
          <div className={styles.thirdRow}>
            {renderKey('CapsLock', 'Caps Lock', styles.keyOneSeventyFive)}
            {renderKey('KeyA', 'A')}
            {renderKey('KeyS', 'S')}
            {renderKey('KeyD', 'D')}
            {renderKey('KeyF', 'F')}
            {renderKey('KeyG', 'G')}
            {renderKey('KeyH', 'H')}
            {renderKey('KeyJ', 'J')}
            {renderKey('KeyK', 'K')}
            {renderKey('KeyL', 'L')}
            {renderKey('Semicolon', ';')}
            {renderKey('Quote', "'")}
            {renderKey('Enter', 'Enter', styles.keyTwoTwentyFive)}
          </div>
          <div className={styles.fourthRow}>
            {renderKey('ShiftLeft', 'Shift', styles.keyWide)}
            {renderKey('KeyZ', 'Z')}
            {renderKey('KeyX', 'X')}
            {renderKey('KeyC', 'C')}
            {renderKey('KeyV', 'V')}
            {renderKey('KeyB', 'B')}
            {renderKey('KeyN', 'N')}
            {renderKey('KeyM', 'M')}
            {renderKey('Comma', ',')}
            {renderKey('Period', '.')}
            {renderKey('Slash', '/')}
            {renderKey('ShiftRight', 'Shift', styles.keyWide)}
          </div>
          <div className={styles.fifthRow}>
            {renderKey('ControlLeft', 'Ctrl', styles.keyWide)}
            {renderKey('MetaLeft', 'Win', styles.keyWide)}
            {renderKey('AltLeft', language === 'korean' ? '한/영' : 'Alt', styles.keyWide)}
            {renderKey('Space', '', styles.keySpace)}
            {renderKey('AltRight', language === 'korean' ? '한자' : 'Alt', styles.keyWide)}
            {renderKey('MetaRight', 'Win', styles.keyWide)}
            {renderKey('ContextMenu', 'Menu', styles.keyWide)}
            {renderKey('ControlRight', 'Ctrl', styles.keyWide)}
          </div>
        </section>

        {/* Navigation */}
        <section className={`${styles.region} ${styles.navigation}`}>
          {renderKey('Insert', 'Ins')}
          {renderKey('Home', 'Home')}
          {renderKey('PageUp', 'PgUp')}
          {renderKey('Delete', 'Del')}
          {renderKey('End', 'End')}
          {renderKey('PageDown', 'PgDn')}
          <div className={styles.spacer}></div>
          {renderKey('ArrowUp', '↑', styles.arrowUp)}
          <div className={styles.spacer}></div>
          {renderKey('ArrowLeft', '←', styles.arrowLeft)}
          {renderKey('ArrowDown', '↓', styles.arrowDown)}
          {renderKey('ArrowRight', '→', styles.arrowRight)}
        </section>

        {/* Numpad */}
        <section
          className={`${styles.region} ${styles.numpad}`}
          style={{ display: layout === 'fullSize' ? 'grid' : 'none' }}
        >
          {renderKey('NumLock', 'Num')}
          {renderKey('NumpadDivide', '/')}
          {renderKey('NumpadMultiply', '*')}
          {renderKey('NumpadSubtract', '-')}
          {renderKey('Numpad7', '7')}
          {renderKey('Numpad8', '8')}
          {renderKey('Numpad9', '9')}
          {renderKey('NumpadAdd', '+', styles.numpadadd)}
          {renderKey('Numpad4', '4')}
          {renderKey('Numpad5', '5')}
          {renderKey('Numpad6', '6')}
          {renderKey('Numpad1', '1')}
          {renderKey('Numpad2', '2')}
          {renderKey('Numpad3', '3')}
          {renderKey('NumpadEnter', 'Enter', styles.numpadenter)}
          {renderKey('Numpad0', '0', styles.numpad0)}
          {renderKey('NumpadDecimal', '.')}
        </section>
      </>
    );
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.themeAndLayout}>
        {/* 언어 전환 섹션 */}
        <div className={styles.languageSection}>
          <div className={styles.layoutButtons}>
            <button 
              className={`${styles.layoutButton} ${language === 'korean' ? styles.active : ''}`}
              onClick={() => setLanguage('korean')}
            >
              한글
            </button>
            <button 
              className={`${styles.layoutButton} ${language === 'english' ? styles.active : ''}`}
              onClick={() => setLanguage('english')}
            >
              English
            </button>
          </div>
        </div>
        
        {/* 레이아웃 섹션 */}
        <div className={styles.layoutSection}>
          <div className={styles.layoutButtons}>
            <button 
              className={`${styles.layoutButton} ${layout === 'fullSize' ? styles.active : ''}`}
              onClick={() => setLayout('fullSize')}
            >
              Full
            </button>
            <button 
              className={`${styles.layoutButton} ${layout === 'tkl' ? styles.active : ''}`}
              onClick={() => setLayout('tkl')}
            >
              TKL
            </button>
          </div>
        </div>
        
        <div className={styles.themeSection}>
          <div className={styles.retro} onClick={() => changeTheme('retro')}>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
          </div>
          <div className={styles.navyBlue} onClick={() => changeTheme('navyBlue')}>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
          </div>
          <div className={styles.green} onClick={() => changeTheme('green')}>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
          </div>
          <div className={styles.purple} onClick={() => changeTheme('purple')}>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
          </div>
          <div className={styles.red} onClick={() => changeTheme('red')}>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
            <div className={styles.themeColor}></div>
          </div>
        </div>
      </div>

      <div 
        ref={keyboardRef}
        className={`${styles.keyboard} ${styles[layout]} ${styles[`theme${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`]}`}
      >
        {renderKeyboard()}
      </div>
    </div>
  );
};

export default KeyboardTester;
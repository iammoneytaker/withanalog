'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '@/styles/KeyboardTester.module.css';

interface KeyboardTesterProps {
  pressedKeys?: Set<string>;
}

const KeyboardTester: React.FC<KeyboardTesterProps> = ({ 
  pressedKeys = new Set()
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>('retro');
  const [layout, setLayout] = useState<'fullSize' | 'tkl' | 'seventyFivePercent'>('fullSize');
  const [manualScale, setManualScale] = useState<number>(1);
  const [isAutoScale, setIsAutoScale] = useState<boolean>(true);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializeTheme = useCallback(() => {
    const savedTheme = localStorage.getItem('keyboardTheme');
    if (savedTheme && ['retro', 'navyBlue', 'green', 'purple', 'red'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // 키보드 크기 동적 조정
  const adjustKeyboardScale = useCallback(() => {
    if (!keyboardRef.current || !containerRef.current) return;

    let finalScale: number;
    
    if (isAutoScale) {
      const containerWidth = containerRef.current.offsetWidth;
      const keyboardNaturalWidth = layout === 'fullSize' ? 1200 : layout === 'tkl' ? 1000 : 900;
      const padding = 40; // 좌우 패딩
      const availableWidth = containerWidth - padding;
      
      // 최적 스케일 계산
      const optimalScale = Math.min(availableWidth / keyboardNaturalWidth, 1);
      
      // 최소/최대 스케일 제한 (모바일에서는 더 작게)
      const minScale = window.innerWidth <= 768 ? 0.25 : 0.4;
      finalScale = Math.max(minScale, Math.min(1, optimalScale));
    } else {
      finalScale = manualScale;
    }
    
    // CSS 변수로 스케일 적용
    keyboardRef.current.style.setProperty('--scale', finalScale.toString());
  }, [layout, isAutoScale, manualScale]);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    // 초기 스케일 조정
    adjustKeyboardScale();
    
    // 리사이즈 이벤트 리스너
    const handleResize = () => {
      setTimeout(adjustKeyboardScale, 100); // 디바운스
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustKeyboardScale]);

  useEffect(() => {
    // 레이아웃, 스케일 모드, 수동 스케일 변경 시 재조정
    setTimeout(adjustKeyboardScale, 100);
  }, [layout, isAutoScale, manualScale, adjustKeyboardScale]);

  const changeTheme = useCallback((themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem('keyboardTheme', themeName);
  }, []);

  const updateLayout = useCallback((value: number) => {
    switch (value) {
      case 1:
        setLayout('fullSize');
        break;
      case 2:
        setLayout('tkl');
        break;
      case 3:
        setLayout('seventyFivePercent');
        break;
      default:
        break;
    }
  }, []);

  const renderKey = useCallback((keyCode: string, label: string, className: string = '') => {
    // 다양한 케이스로 키 매칭 시도
    const isPressed = pressedKeys.has(keyCode) || 
                     pressedKeys.has(keyCode.toLowerCase()) || 
                     pressedKeys.has(keyCode.toUpperCase());
    
    const isAccentKey = ['Backquote', 'Backspace', 'Tab', 'CapsLock', 'Enter', 'Space', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'ContextMenu', 'Insert', 'Home', 'PageUp', 'Delete', 'End', 'PageDown', 'NumLock', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract', 'NumpadAdd', 'NumpadEnter', 'PrintScreen', 'ScrollLock', 'Pause', 'Backslash'].includes(keyCode);
    
    // Convert className string to actual styles class
    const additionalClass = className ? (styles as any)[className] || className : '';
    
    const classes = [
      styles.key,
      additionalClass,
      isPressed ? styles.keyPressed : '',
      isAccentKey ? styles.keyAccentColor : ''
    ].filter(Boolean).join(' ');

    return (
      <div key={keyCode} className={classes} data-key={keyCode}>
        {label}
      </div>
    );
  }, [pressedKeys]);

  // Spacer element for proper keyboard alignment
  const renderSpacer = useCallback((width: string) => {
    return <div key={`spacer-${Math.random()}`} className={styles.spacer} style={{width}}></div>;
  }, []);

  const renderFunctionRow = () => (
    <div className={`${styles.keyboardRow} ${styles.functionRow}`}>
      {renderKey('Escape', 'Esc')}
      {renderKey('F1', 'F1')}
      {renderKey('F2', 'F2')}
      {renderKey('F3', 'F3')}
      {renderKey('F4', 'F4')}
      {renderKey('F5', 'F5')}
      {renderKey('F6', 'F6')}
      {renderKey('F7', 'F7')}
      {renderKey('F8', 'F8')}
      {renderKey('F9', 'F9')}
      {renderKey('F10', 'F10')}
      {renderKey('F11', 'F11')}
      {renderKey('F12', 'F12')}
      {renderKey('PrintScreen', 'Prt Sc')}
      {renderKey('ScrollLock', 'Scr Lk', layout === 'seventyFivePercent' ? styles.hidden : '')}
      {renderKey('Pause', 'Pause')}
    </div>
  );

  const renderNumberRow = () => (
    <div className={`${styles.keyboardRow} ${styles.numberRow}`}>
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
      {renderKey('Backspace', 'Backspace')}
    </div>
  );

  const renderTopLetterRow = () => (
    <div className={`${styles.keyboardRow} ${styles.topLetterRow}`}>
      {renderKey('Tab', 'Tab')}
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
      {renderKey('Backslash', '\\')}
    </div>
  );

  const renderMiddleLetterRow = () => (
    <div className={`${styles.keyboardRow} ${styles.middleLetterRow}`}>
      {renderSpacer('1.5rem')} {/* Caps Lock 오프셋 */}
      {renderKey('CapsLock', 'Caps Lock')}
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
      {renderKey('Enter', 'Enter')}
    </div>
  );

  const renderBottomLetterRow = () => (
    <div className={`${styles.keyboardRow} ${styles.bottomLetterRow}`}>
      {renderKey('ShiftLeft', 'Shift')}
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
      {renderKey('ShiftRight', 'Shift')}
    </div>
  );

  const renderSpaceRow = () => (
    <div className={`${styles.keyboardRow} ${styles.spaceRow}`}>
      {renderKey('ControlLeft', 'Ctrl')}
      {renderKey('MetaLeft', 'Win')}
      {renderKey('AltLeft', 'Alt')}
      {renderKey('Space', '')}
      {renderKey('AltRight', 'Alt')}
      {renderKey('MetaRight', 'Win', layout === 'seventyFivePercent' ? styles.hidden : '')}
      {renderKey('ContextMenu', 'Menu', layout === 'seventyFivePercent' ? styles.hidden : '')}
      {renderKey('ControlRight', 'Ctrl', layout === 'seventyFivePercent' ? styles.hidden : '')}
    </div>
  );

  const renderNavigationKeys = () => (
    <div className={styles.navigationKeys}>
      <div className={styles.navTopRow}>
        {renderKey('Insert', 'Ins', layout === 'seventyFivePercent' ? styles.hidden : '')}
        {renderKey('Home', 'Home')}
        {renderKey('PageUp', 'PgUp')}
      </div>
      <div className={styles.navBottomRow}>
        {renderKey('Delete', 'Del')}
        {renderKey('End', 'End')}
        {renderKey('PageDown', 'PgDn')}
      </div>
      <div className={styles.arrowKeys}>
        <div className={styles.arrowTopRow}>
          {renderKey('ArrowUp', '↑')}
        </div>
        <div className={styles.arrowBottomRow}>
          {renderKey('ArrowLeft', '←')}
          {renderKey('ArrowDown', '↓')}
          {renderKey('ArrowRight', '→')}
        </div>
      </div>
    </div>
  );

  const renderNumpad = () => (
    <div className={`${styles.numpad} ${layout === 'fullSize' ? '' : styles.hidden}`}>
      {renderKey('NumLock', 'Num')}
      {renderKey('NumpadDivide', '/')}
      {renderKey('NumpadMultiply', '*')}
      {renderKey('NumpadSubtract', '-')}
      {renderKey('Numpad7', '7')}
      {renderKey('Numpad8', '8')}
      {renderKey('Numpad9', '9')}
      {renderKey('NumpadAdd', '+', 'tall')}
      {renderKey('Numpad4', '4')}
      {renderKey('Numpad5', '5')}
      {renderKey('Numpad6', '6')}
      {renderKey('Numpad1', '1')}
      {renderKey('Numpad2', '2')}
      {renderKey('Numpad3', '3')}
      {renderKey('NumpadEnter', 'Enter', 'tall')}
      {renderKey('Numpad0', '0', 'wide')}
      {renderKey('NumpadDecimal', '.')}
    </div>
  );

  const renderMainKeyboard = () => (
    <div className={styles.mainKeyboard}>
      <div className={styles.leftSection}>
        {renderNumberRow()}
        {renderTopLetterRow()}
        {renderMiddleLetterRow()}
        {renderBottomLetterRow()}
        {renderSpaceRow()}
      </div>
      <div className={styles.rightSection}>
        {renderNavigationKeys()}
        {renderNumpad()}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.themeAndLayout}>
        {/* 크기 조절 섹션 */}
        <div className={styles.layoutSection}>
          <div className={styles.sliderContainer}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={isAutoScale}
                onChange={(e) => setIsAutoScale(e.target.checked)}
              />
              자동 크기 조절
            </label>
            {!isAutoScale && (
              <>
                <input
                  type="range"
                  min="0.25"
                  max="1"
                  step="0.05"
                  value={manualScale}
                  className={styles.slider}
                  onChange={(e) => setManualScale(parseFloat(e.target.value))}
                />
                <div className={styles.sliderValue}>
                  {Math.round(manualScale * 100)}%
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* 레이아웃 섹션 */}
        <div className={styles.layoutSection}>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="1"
              max="3"
              value={layout === 'fullSize' ? 1 : layout === 'tkl' ? 2 : 3}
              className={styles.slider}
              onChange={(e) => updateLayout(parseInt(e.target.value))}
            />
            <div className={styles.sliderValue}>
              {layout === 'fullSize' ? 'Full' : layout === 'tkl' ? 'TKL' : '75%'}
            </div>
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
        className={`${styles.keyboard} ${styles[`theme${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`]}`}
      >
        {renderFunctionRow()}
        {renderMainKeyboard()}
      </div>
    </div>
  );
};

export default KeyboardTester;
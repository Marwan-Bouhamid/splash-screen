import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./splash.css";

type AnimatedSplashProps = {
  rtl: boolean;
  onComplete: () => void;
};

export function AnimatedSplash({ rtl, onComplete }: AnimatedSplashProps) {
  const [leaving, setLeaving] = useState(false);
  const complete = useRef(onComplete);
  complete.current = onComplete;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitTimer = window.setTimeout(() => setLeaving(true), reduced ? 900 : 3200);
    const doneTimer = window.setTimeout(() => complete.current(), reduced ? 1100 : 3900);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className={`brandSplash ${leaving ? "brandSplash--leaving" : ""}`} dir={rtl ? "rtl" : "ltr"} aria-label={rtl ? "مرحباً بك في مرحبا المغرب" : "Welcome to Marhba Morocco"}>
      <div className="splashArchitecture" aria-hidden="true">
        <div className="splashArch splashArch--outer" />
        <div className="splashArch splashArch--inner" />
        <div className="splashHorizon" />
      </div>
      <div className="splashTopline"><span>MARHBA</span><span>{rtl ? "المغرب" : "MOROCCO"}</span></div>
      <div className="splashComposition">
        <div className="splashLogoFrame">
          <div className="splashOrbit" aria-hidden="true">
            <svg viewBox="0 0 340 340" fill="none">
              <path d="M38 259C-9 165 36 69 139 43C240 17 326 92 306 183" />
            </svg>
          </div>
          <img className="splashLogo" src="/marhba-logo-forest.png" alt={rtl ? "شعار مرحبا المغرب: حرف إم وطائرة ومسار رحلة" : "Marhba Morocco M, airplane and flight trail logo"} width="760" height="699" fetchPriority="high" />
        </div>
        <div className="splashIdentity">
          <span className="splashEyebrow">{rtl ? "كل رحلة تبدأ بمرحبا" : "EVERY JOURNEY BEGINS WITH MARHBA"}</span>
          <h1 aria-label={rtl ? "مرحبا المغرب" : "Marhaba Morocco"}>
            {rtl ? <><span className="splashWord splashWord--first" aria-hidden="true">مرحبا</span><span className="splashWord splashWord--second" aria-hidden="true">المغرب.</span></> :
              ["Marhaba", "Morocco."].map((word, wordIndex) => (
                <span className={`splashWord ${wordIndex === 0 ? "splashWord--first" : "splashWord--second"}`} key={word} aria-hidden="true">
                  {Array.from(word).map((letter, index) => (
                    <span className="splashLetter" key={index} style={{ "--letter-index": index + wordIndex * 7 } as CSSProperties}>{letter}</span>
                  ))}
                </span>
              ))}
          </h1>
          <p>{rtl ? "اكتشف المغرب، على طريقتك." : "Discover Morocco, your way."}</p>
        </div>
      </div>
      <div className="splashFootnote">
        <div className="splashProgress" aria-hidden="true"><span /></div>
        <span>{rtl ? "عالم من الاكتشاف ينتظرك" : "A WORLD OF DISCOVERY AWAITS"}</span>
      </div>
    </div>
  );
}

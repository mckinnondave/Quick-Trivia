import React from "react";

export default function Timer() {
  const [countdownTime, setCountdownTime] = useState(60);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (countdownTime > 0) {
        setCountdownTime(countdownTime - 1);
      }
      if (seconds === 0) {
          clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
}
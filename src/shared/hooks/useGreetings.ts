import { useState, useEffect } from "react";

export const useGreeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning, Kumpadre!");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon, Kumpadre!");
    } else {
      setGreeting("Good evening, Kumpadre!");
    }
  }, []);

  return greeting;
};

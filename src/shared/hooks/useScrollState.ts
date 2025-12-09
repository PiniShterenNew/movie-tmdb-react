import { useEffect, useState } from "react";

// offset = איפה בערך תרצה שהכיווץ יתחיל
// margin = כמה "רצועת ביטחון" מסביב, כדי שלא יהיה הבהוב בגבול
export function useScrollState(offset = 60, margin = 20) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setIsScrolled((prev) => {
        // אם כרגע במצב רגיל (לא מכווץ) – נעבור ל־true רק כשעוברים את offset + margin
        if (!prev && y > offset + margin) {
          return true;
        }

        // אם כרגע במצב מכווץ – נחזור ל־false רק כשיורדים מתחת ל־offset - margin
        if (prev && y < offset - margin) {
          return false;
        }

        // בתוך הרצועה (offset - margin, offset + margin) לא מחליפים מצב בכלל
        return prev;
      });
    };

    // הרצה ראשונית כדי לקבוע מצב נכון לפי המיקום ההתחלתי
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, margin]);

  return isScrolled;
}
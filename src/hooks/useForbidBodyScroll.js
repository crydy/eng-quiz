import { useEffect, useRef } from "react";

function useForbidBodyScroll(isOpen) {
    const scrollYRef = useRef(null);
    const bodyOverflowRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        if (isOpen) {
            scrollYRef.current = window.scrollY;
            bodyOverflowRef.current = document.body.style.overflow;

            document.body.style.position = "fixed";
            document.body.style.overflowY = "hidden";
            document.body.style.width = "100%";
        } else {
            window.scrollTo(0, scrollYRef.current);

            document.body.style.position = "";
            document.body.style.overflowY = bodyOverflowRef.current;
            document.body.style.width = "";
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);
}

export { useForbidBodyScroll };

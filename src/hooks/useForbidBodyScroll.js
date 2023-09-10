import { useEffect, useRef } from "react";

// prevent body movements when scrolling inside modal
function useForbidBodyScroll(isModalOpened) {
    const scrollYRef = useRef(null);
    const bodyOverflowRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        if (isModalOpened) {
            scrollYRef.current = window.scrollY;
            bodyOverflowRef.current = document.body.style.overflow;

            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = bodyOverflowRef.current;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollYRef.current);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isModalOpened]);
}

export { useForbidBodyScroll };

 // Instructs React to only render this component on the client-side (in the browser).
"use client";

import React, { useEffect, useState } from "react";
import NProgress from "nprogress"; // Library for managing a progress bar UI.
import Router from "next/router"; // Handles routing within Next.js applications.
import PropTypes from "prop-types"; // For type checking component props.

// Configure NProgress to hide the default spinner (we won't use it here).
NProgress.configure({ showSpinner: false });

const NextProgressBar = ({
  // Define props for customization (with defaults):
  color = "#29D", // Color of the progress bar.
  startPosition = 0.3, // Starting position of the progress bar (0 to 1).
  stopDelayMs = 200, // Delay in milliseconds before hiding the progress bar.
  height = 3, // Height of the progress bar in pixels.
  options, // Optional custom options to pass to NProgress.configure().
}) => {
  const [timer, setTimer] = useState(null); // State variable to hold the timeout ID.

  // Effect hook that runs on component mount and whenever options, stopDelayMs, startPosition, or timer changes.
  useEffect(() => {
    if (options) { // If custom options are provided, apply them to NProgress configuration.
      NProgress.configure(options);
    }

    // Function to handle route change start event:
    const routeChangeStart = () => {
      // Set the initial progress bar position.
      NProgress.set(startPosition);
      // Start the progress bar animation.
      NProgress.start();
    };

    // Function to handle route change end or error event:
    const routeChangeEnd = () => {
      // Clear any existing timeout.
      clearTimeout(timer);

      // Set a new timeout to hide the progress bar after the specified delay.
      setTimer(
        setTimeout(() => {
          NProgress.done(true); // Hide the progress bar with a smooth animation.
        }, stopDelayMs)
      );
    };

    // Attach event listeners for route changes:
    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd); // Handle route change errors as well.

    // Cleanup function to detach event listeners when the component unmounts.
    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);
      Router.events.off("routeChangeComplete", routeChangeEnd);
      Router.events.off("routeChangeError", routeChangeEnd);
    };
  }, [options, stopDelayMs, startPosition, timer]);

  // This component doesn't render any JSX directly, but it applies styles globally using styled-jsx.
  return (
      <style jsx global>
         {`
            #nprogress {
               pointer-events: none;
            }

            #nprogress .bar {
               background: ${color};
               position: fixed;
               z-index: 1031;
               top: 0;
               left: 0;
               width: 100%;
               height: ${height}px;
            }

            #nprogress .peg {
               display: block;
               position: absolute;
               right: 0px;
               width: 100px;
               height: 100%;
               box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
               opacity: 1;
               -webkit-transform: rotate(3deg) translate(0px, -4px);
               -ms-transform: rotate(3deg) translate(0px, -4px);
               transform: rotate(3deg) translate(0px, -4px);
            }

            #nprogress .spinner {
               display: "block";
               position: fixed;
               z-index: 1031;
               top: 15px;
               right: 15px;
            }

            #nprogress .spinner-icon {
               width: 18px;
               height: 18px;
               box-sizing: border-box;
               border: solid 2px transparent;
               border-top-color: ${color};
               border-left-color: ${color};
               border-radius: 50%;
               -webkit-animation: nprogresss-spinner 400ms linear infinite;
               animation: nprogress-spinner 400ms linear infinite;
            }

            .nprogress-custom-parent {
               overflow: hidden;
               position: relative;
            }

            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
               position: absolute;
            }

            @-webkit-keyframes nprogress-spinner {
               0% {
                  -webkit-transform: rotate(0deg);
               }
               100% {
                  -webkit-transform: rotate(360deg);
               }
            }

            @keyframes nprogress-spinner {
               0% {
                  transform: rotate(0deg);
               }
               100% {
                  transform: rotate(360deg);
               }
            }
         `}
      </style>
   );
};

NextProgressBar.propTypes = {
   color: PropTypes.string,
   startPosition: PropTypes.number,
   stopDelayMs: PropTypes.number,         
   options: PropTypes.object,
};

export default NextProgressBar;

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loaderball";
import { generateTechIcon } from "../../utils/generateTechIcon";

const Ball = (props) => {
  // Generate icon URL - always use fallback to ensure we have a valid URL
  const iconUrl = useMemo(() => {
    // Always generate a fallback first
    const fallback = generateTechIcon(props.techName || 'Tech');
    
    if (props.imgUrl && props.imgUrl.startsWith('data:')) {
      return props.imgUrl; // Already a data URL
    }
    
    // Return provided URL or fallback
    return props.imgUrl || fallback;
  }, [props.imgUrl, props.techName]);

  // Load texture - always provide a valid URL
  const [decal] = useTexture([iconUrl], undefined, (error) => {
    console.warn(`Texture load failed for ${props.techName}:`, error);
    // Retry with fallback
    return generateTechIcon(props.techName || 'Tech');
  });

  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} />
      <pointLight position={[-5, -5, -5]} intensity={1.0} />
      <pointLight position={[0, 5, 0]} intensity={0.8} />
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color='#ffffff'
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
            metalness={0.3}
            roughness={0.5}
            emissive='#ffffff'
            emissiveIntensity={0.2}
          />
          {decal && (
            <Decal
              position={[0, 0, 1]}
              rotation={[2 * Math.PI, 0, 6.25]}
              scale={1}
              map={decal}
              flatShading
            />
          )}
        </mesh>
      </Float>
    </>
  );
};

// Global context counter to limit simultaneous WebGL contexts
let activeContextCount = 0;
const MAX_CONTEXTS = 6; // Reduced to 6 to prevent context loss (browsers typically support 16-32, but we're being conservative)
const contextQueue = [];

const BallCanvas = ({ icon, techName, forceRender = false, index = 0 }) => {
  const [contextLost, setContextLost] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);
  const containerRef = React.useRef(null);
  const renderTimeoutRef = React.useRef(null);

  // Function to safely render - moved outside useEffect to be accessible
  const tryRender = React.useCallback(() => {
    if (activeContextCount < MAX_CONTEXTS) {
      activeContextCount++;
      setShouldRender(true);
      return true;
    }
    return false;
  }, []);

  // Lazy load: Only render when visible or about to be visible
  React.useEffect(() => {
    let observer = null;
    let fallbackTimeout = null;
    let initialCheckTimeout = null;

    // If forceRender is true (for marquee items), use staggered rendering with context limit
    if (forceRender) {
      // Stagger renders to avoid context overload, but render faster
      // Render in batches: first 8 immediately, then stagger the rest
      const baseDelay = index < 8 ? 0 : (index - 8) * 50; // First 8 render immediately, rest with 50ms delays
      const delay = baseDelay;
      
      renderTimeoutRef.current = setTimeout(() => {
        // Always try to render for forceRender items
        if (tryRender()) {
          // Successfully started rendering
        } else {
          // Queue for later rendering - will process when contexts free up
          contextQueue.push(() => {
            if (tryRender()) {
              setShouldRender(true);
            }
          });
        }
        // For forceRender, always set shouldRender to true after delay
        // The context limit will prevent too many from rendering at once
        setShouldRender(true);
      }, delay);
      
      return () => {
        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }
        if (shouldRender && activeContextCount > 0) {
          activeContextCount--;
          // Process queue
          if (contextQueue.length > 0) {
            const next = contextQueue.shift();
            next?.();
          }
        }
      };
    }

    // For non-marquee items, use IntersectionObserver with context limit
    const checkInitialVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight + 300 && rect.bottom > -300;
        if (isInViewport && tryRender()) {
          setShouldRender(true);
          return true;
        }
      }
      return false;
    };

    // Check if already visible after a short delay
    initialCheckTimeout = setTimeout(() => {
      if (!checkInitialVisibility()) {
        // Set up observer if not initially visible
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (tryRender()) {
                  requestAnimationFrame(() => {
                    setShouldRender(true);
                  });
                } else {
                  // Queue for later
                  contextQueue.push(() => {
                    if (tryRender()) {
                      setShouldRender(true);
                    }
                  });
                }
              } else {
                // Unload when not visible to free up context
                if (shouldRender && activeContextCount > 0) {
                  activeContextCount--;
                  setShouldRender(false);
                  // Process queue
                  if (contextQueue.length > 0) {
                    const next = contextQueue.shift();
                    next?.();
                  }
                }
              }
            });
          },
          {
            rootMargin: '200px',
            threshold: 0.01,
          }
        );

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        // Fallback: render after 2s if observer hasn't triggered
        fallbackTimeout = setTimeout(() => {
          if (!shouldRender && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              if (tryRender()) {
                setShouldRender(true);
              }
            }
          }
        }, 2000);
      }
    }, 100);

    return () => {
      if (initialCheckTimeout) clearTimeout(initialCheckTimeout);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (renderTimeoutRef.current) clearTimeout(renderTimeoutRef.current);
      const currentContainer = containerRef.current;
      if (observer && currentContainer) {
        observer.unobserve(currentContainer);
      }
      // Clean up context count
      if (shouldRender && activeContextCount > 0) {
        activeContextCount--;
        // Process queue
        if (contextQueue.length > 0) {
          const next = contextQueue.shift();
          next?.();
        }
      }
    };
  }, [forceRender, shouldRender, index, tryRender]);

  // Handle WebGL context loss
  React.useEffect(() => {
    if (!shouldRender) return;

    const handleContextLost = (event) => {
      event.preventDefault();
      setContextLost(true);
      // Reduce console spam - only log in development
      if (import.meta.env.DEV) {
        console.warn('WebGL context lost for', techName);
      }
    };

    const handleContextRestored = () => {
      setContextLost(false);
      // Try to re-render after context is restored
      setTimeout(() => {
        if (tryRender()) {
          setShouldRender(true);
        }
      }, 100);
    };

    // Use a timeout to ensure canvas is available
    const timeoutId = setTimeout(() => {
      const currentContainer = containerRef.current;
      if (!currentContainer) return;
      
      const canvas = currentContainer.querySelector('canvas');
      if (canvas && typeof canvas.addEventListener === 'function') {
        canvas.addEventListener('webglcontextlost', handleContextLost);
        canvas.addEventListener('webglcontextrestored', handleContextRestored);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const currentContainer = containerRef.current;
      if (!currentContainer) return;
      
      const canvas = currentContainer.querySelector('canvas');
      if (canvas && typeof canvas.removeEventListener === 'function') {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, [techName, shouldRender, tryRender]);

  // Show placeholder only if context lost
  // For forceRender items, always render the canvas (it will start when shouldRender becomes true)
  // For non-forceRender, only render if shouldRender is true
  if (contextLost) {
    return (
      <div 
        ref={containerRef}
        className="premium-tech-ball-placeholder"
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '112px',
          minWidth: '112px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="premium-tech-ball-placeholder-icon">
          {techName?.charAt(0) || 'T'}
        </div>
      </div>
    );
  }
  
  // For non-forceRender, show placeholder if not ready
  if (!forceRender && !shouldRender) {
    return (
      <div 
        ref={containerRef}
        className="premium-tech-ball-placeholder"
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '112px',
          minWidth: '112px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="premium-tech-ball-placeholder-icon">
          {techName?.charAt(0) || 'T'}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        minHeight: '112px',
        minWidth: '112px'
      }}
    >
      <Canvas
        frameloop={shouldRender ? "always" : "demand"}
        dpr={[1, 1.5]}
        gl={{ 
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false,
          xrCompatible: false,
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          display: shouldRender ? 'block' : 'none', 
          visibility: shouldRender ? 'visible' : 'hidden', 
          opacity: shouldRender ? 1 : 0,
          position: 'relative',
          zIndex: 1,
          background: 'transparent'
        }}
        onError={(error) => {
          console.warn('Canvas error for', techName, error);
          setContextLost(true);
        }}
        onCreated={(state) => {
          // Handle context loss recovery
          try {
            if (!state || !state.gl || !state.gl.domElement) {
              console.warn('Canvas state not properly initialized');
              return;
            }

            const canvas = state.gl.domElement;
            if (!canvas) {
              console.warn('Canvas element not found');
              return;
            }

            const webglContext = canvas.getContext('webgl') || canvas.getContext('webgl2');
            
            if (webglContext) {
              const ext = webglContext.getExtension('WEBGL_lose_context');
              
              if (ext) {
                const handleContextLost = (event) => {
                  event.preventDefault();
                  setContextLost(true);
                  if (activeContextCount > 0) activeContextCount--;
                  // Process queue
                  if (contextQueue.length > 0) {
                    const next = contextQueue.shift();
                    next?.();
                  }
                };

                const handleContextRestored = () => {
                  setContextLost(false);
                  if (tryRender()) {
                    setShouldRender(true);
                  }
                };

                if (canvas && typeof canvas.addEventListener === 'function') {
                  canvas.addEventListener('webglcontextlost', handleContextLost);
                  canvas.addEventListener('webglcontextrestored', handleContextRestored);
                }
              }
            }
          } catch (error) {
            console.warn('Error setting up context loss handler:', error);
            setContextLost(true);
          }
        }}
      >
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#8b5cf6" wireframe />
          </mesh>
        }>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          {/* Always render Ball - for forceRender items, it will render even if shouldRender starts false */}
          {(shouldRender || forceRender) && <Ball imgUrl={icon} techName={techName} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BallCanvas;

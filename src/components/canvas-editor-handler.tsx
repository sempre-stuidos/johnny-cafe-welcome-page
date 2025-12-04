"use client"

import * as React from "react"

interface CanvasEditorHandlerProps {
  sections: Array<{ id: string; key: string }>
}

export function CanvasEditorHandler({ sections }: CanvasEditorHandlerProps) {
  // Add click event listeners to sections and components
  React.useEffect(() => {
    const handleSectionClick = (e: MouseEvent, sectionId: string, sectionKey: string) => {
      e.stopPropagation()
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'section-click',
          sectionId,
          sectionKey,
        }, '*')
      }
    }

    const handleComponentClick = (e: MouseEvent, sectionId: string, sectionKey: string, componentKey: string) => {
      e.stopPropagation()
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'component-click',
          sectionId,
          sectionKey,
          componentKey,
        }, '*')
      }
    }

    const cleanupFunctions: Array<() => void> = []

    sections.forEach((section) => {
      const sectionElement = document.querySelector(`[data-section-key="${section.key}"]`)
      if (sectionElement) {
        // Get section key from element's data attribute as fallback (for potential future use)
        // const elementKey = sectionElement.getAttribute('data-section-key') || section.key
        // const elementId = sectionElement.getAttribute('data-section-id') || section.id
        
        // Add click listener for section (only if not clicking on a component)
        const sectionClickHandler = (e: Event) => {
          // Check if click target is within a component
          const target = e.target as HTMLElement
          const componentElement = target.closest('[data-section-component-key]')
          if (componentElement) {
            // Component click will be handled separately, don't trigger section click
            return
          }
          
          // Use element's data attributes to ensure we have the correct values
          const key = sectionElement.getAttribute('data-section-key') || section.key
          const id = sectionElement.getAttribute('data-section-id') || section.id
          handleSectionClick(e as MouseEvent, id, key)
        }
        sectionElement.addEventListener('click', sectionClickHandler)
        
        // Add visual indication that section is clickable
        const htmlElement = sectionElement as HTMLElement
        htmlElement.style.cursor = 'pointer'
        htmlElement.style.transition = 'opacity 0.2s'
        
        // Optional: Add hover effect
        const hoverHandler = () => {
          htmlElement.style.opacity = '0.95'
        }
        const leaveHandler = () => {
          htmlElement.style.opacity = '1'
        }
        sectionElement.addEventListener('mouseenter', hoverHandler)
        sectionElement.addEventListener('mouseleave', leaveHandler)

        cleanupFunctions.push(() => {
          sectionElement.removeEventListener('click', sectionClickHandler)
          sectionElement.removeEventListener('mouseenter', hoverHandler)
          sectionElement.removeEventListener('mouseleave', leaveHandler)
          htmlElement.style.cursor = ''
          htmlElement.style.opacity = ''
          htmlElement.style.transition = ''
        })

        // Add click listeners for components within this section
        const componentElements = sectionElement.querySelectorAll('[data-section-component-key]')
        componentElements.forEach((componentElement) => {
          const componentKey = componentElement.getAttribute('data-section-component-key')
          if (componentKey) {
            const componentClickHandler = (e: Event) => {
              const key = sectionElement.getAttribute('data-section-key') || section.key
              const id = sectionElement.getAttribute('data-section-id') || section.id
              handleComponentClick(e as MouseEvent, id, key, componentKey)
            }
            componentElement.addEventListener('click', componentClickHandler)
            
            // Add visual indication that component is clickable
            const componentHtmlElement = componentElement as HTMLElement
            componentHtmlElement.style.cursor = 'pointer'
            componentHtmlElement.style.transition = 'opacity 0.2s'
            
            const componentHoverHandler = () => {
              componentHtmlElement.style.opacity = '0.9'
            }
            const componentLeaveHandler = () => {
              componentHtmlElement.style.opacity = '1'
            }
            componentElement.addEventListener('mouseenter', componentHoverHandler)
            componentElement.addEventListener('mouseleave', componentLeaveHandler)

            cleanupFunctions.push(() => {
              componentElement.removeEventListener('click', componentClickHandler)
              componentElement.removeEventListener('mouseenter', componentHoverHandler)
              componentElement.removeEventListener('mouseleave', componentLeaveHandler)
              componentHtmlElement.style.cursor = ''
              componentHtmlElement.style.opacity = ''
              componentHtmlElement.style.transition = ''
            })
          }
        })
      }
    })

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [sections])

  // This component doesn't render anything
  return null
}

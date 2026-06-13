# Storybook Journey Reference Analysis

## What The Reference Does Well

### Animation and transition systems

- Uses one consistent cinematic easing curve for long, soft deceleration.
- Reveals display typography word by word with vertical masks and subtle 3D rotation.
- Applies slow scroll-bound media movement to create depth instead of relying on many decorative animations.
- Uses staggered entrances to establish reading order.
- Treats the large statement section as an intermission between information-heavy chapters.

### Scroll choreography and scene composition

- Alternates light and dark chapters to control pacing.
- Gives important chapters at least one viewport of space.
- Separates background media, atmosphere, content, and interaction into distinct visual layers.
- Connects the timeline with a scroll-progress rail.
- Uses oversized editorial typography as the primary visual hierarchy.

### Interactive patterns

- Keeps interactions focused: image hover depth, a progressive timeline, and restrained buttons.
- Uses visual feedback that changes depth, light, or position rather than generic color-only hover states.
- Maintains a clear scene order from opening film through story, logistics, response, and closing.

## Concepts Adapted For The Wedding Experience

- A shared cinematic easing and word-reveal component.
- Scroll-bound Hero media scale, vertical drift, and content fade.
- A persistent, restrained scene-progress indicator.
- A global film texture so atmospheric treatment remains continuous between scenes.
- A stronger quote intermission with scroll depth and staged typography.
- MUI Accordion as the accessible interaction foundation for the FAQ, with the cinematic visual language retained.

## Concepts Deliberately Not Ported

- The reference loader is not copied directly; the adapted loader has a strict
  time bound while the real Hero video loads beneath it.
- The custom cursor replaces native pointer behavior and harms accessibility.
- Lenis introduces a second scroll model and can conflict with native and Framer Motion scroll behavior.
- Tailwind and utility classes would create a second styling architecture.
- Reference content, imagery, and branded visual details are not reused.

## Improvements Beyond The Reference

- The fullscreen video mounts immediately beneath a short cinematic opening
  sequence, preventing a loading flash while preserving fast video startup.
- Reduced-motion behavior is built into the shared typography reveal.
- The global progress system uses semantic scene IDs and native IntersectionObserver.
- Standard controls continue to use MUI foundations instead of custom interaction primitives.

## Chapter Architecture

The route is now composed as seven narrative scenes rather than a sequence of
content-category sections:

- Arrival
- Journey
- Wedding Day
- Destination
- Guest Guide
- RSVP
- Forever

Location, travel, parking, and accommodation are presented as beats inside the
Destination chapter. Wedding information and the interactive timeline share the
Wedding Day chapter. The quote, memories, and closing share the Forever chapter.

## Loader Adaptation

The opening sequence uses MUI Backdrop, Typography, and CircularProgress with
Framer Motion choreography. It runs for a bounded period while the Hero video is
already mounted beneath it, then crossfades into the Arrival scene. Reduced
motion shortens the sequence, and the hidden experience is inert until the
handoff completes.

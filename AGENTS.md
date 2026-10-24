<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render page-back navigation inside each page's normal content flow (shared PageHero or the page introduction), never in the fixed Header, to prevent scrolling overlap.
- Use shared AnimatedHeading for staggered letter-swing major titles and the shared orbital border treatment for buttons; preserve existing sizes, semantic colors, accessible text and reduced-motion support without changing page layouts.
- Keep the popular-destination ring in a dedicated browser-safe RoundCarousel with existing destination data and links, so carousel motion stays isolated from page content.
- Keep the travel gallery in a browser-safe JourneyGallery with scoped image-flight animations inspired by the supplied Image Gallery; pause outside the viewport and when hidden, provide a pause control and static reduced-motion layout, preserve page scrolling, and disclose generated imagery rather than implying real client evidence.

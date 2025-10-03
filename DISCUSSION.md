# Project Discussion

## Project Kickoff & Audit

I began this project by conducting an audit of the existing state, documented in `audit.md`. This process helped me quickly understand the project’s current status, strengths, and weaknesses. The audit informed my priorities and highlighted both critical and non-critical issues.
Then I created an implementation_plan.md to outline scope of effort for this 2 hour project. 

## Design & Organization

I decided to organize the project using **atomic design principles**, structuring components into atoms, molecules, organisms, templates, and pages. This approach supports scalability and reusability, making it easier to build and maintain a robust UI library.

### UI Library & Storybook

A major focus was on creating a **reusable frontend UI library**. I implemented a variety of atomic and composite components (e.g., Button, Input, Badge, Select, SearchBar, FilterPanel, AdvocateCard, AdvocateList, etc.), with an eye toward easy extension for future features. I also set up **unit tests** and **Storybook** for documentation and robustness, enabling rapid visual feedback and easier iteration.

### Mockup & Visual Design

Before writing code, I used **Google’s Stitch** to create a high-fidelity mockup. This helped clarify the visual direction and user experience goals.

## Implementation Focus

- **Visible, Iterative Features:** I prioritized features that are visible and easy to iterate on, such as search and filtering, so progress could be rapidly demonstrated without a robust backend.
- **Component-Driven Development:** The UI is built from reusable components, making it easy to add new features in the future.
- **Testing & Documentation:** Unit tests and Storybook stories were created for key components to ensure reliability and maintainability.

## What Was Omitted (and Why)

Due to timeboxing the effort to around 2–3 hours, I intentionally did **not** focus on API-heavy optimizations or backend features such as:
- Authentication
- Rate limiting
- CORS
- Advanced error handling
- Database performance optimizations

These features would have required significant additional time and were not critical for demonstrating the core UI and user flows.

## What Would Be Done With More Time

- **Phase 7 of the Implementation Plan:** This phase and other non-critical issues from the audit were not completed due to time constraints.
- **Accessibility:** I would iterate further on accessibility features to ensure the app is usable for all users.
- **Responsive Design:** Additional work would be done to improve mobile and tablet experiences.
- **Pagination:** Although the backend API supports pagination, the frontend does not currently implement paginated views for advocate lists.
- **Database Optimizations:** Planned DB optimizations (indexes, query tuning, etc.) are not yet implemented.
- **Additional Features:** I would consider adding single advocate detail views and an "add advocate" feature.

## Inventory of Features

### Implemented
- **Atomic Design System:** Atoms, molecules, organisms, templates, and pages structure.
- **Reusable UI Library:** Button, Input, Badge, Select, SearchBar, FilterPanel, AdvocateCard, AdvocateList, ThemeToggle, etc.
- **Search & Filtering:** Users can search and filter advocates by name, city, degree, specialty, and experience.
- **Mock Data & Seeding:** Database schema and seed data for advocates.
- **API Endpoints:** RESTful endpoints for fetching and filtering advocates.
- **Storybook & Unit Tests:** For key components.
- **Theme Support:** Light/dark mode toggle.
- **Colors:** Design color inspiration directly from solace health website

### Missing/Not Fully Implemented
- **Pagination in UI:** The backend supports pagination, but the frontend does not expose paginated navigation or infinite scroll.
- **Database Optimizations:** No advanced indexing or query optimization.
- **Authentication & Security:** No login, rate limiting, or CORS configuration.
- **Accessibility Audits:** Only basic accessibility is present; further work is needed.
- **Responsive Design:** Basic responsiveness is present, but not fully tested or refined.
- **Single Advocate View:** No detail page for individual advocates.
- **Add Advocate Feature:** No UI for adding new advocates.
- **Advanced Filtering:** Filtering by years of experience not fully functional.
- **Dark Mode:** Didn't completely wrap dark mode ui experience for the full page templates.
- **Style Guide:** If given more time would have used font, and other design queus from the existing solace website.
- **Memoization & Caching:** No advanced memoization (e.g., React.memo, useMemo for data) or caching (client-side or server-side) is implemented for complex queries or expensive computations; all filtering/searching is performed directly on the data or via direct API/database calls.

## Conclusion

This project demonstrates a strong foundation in component-driven frontend development, atomic design, and rapid prototyping. The focus was on visible, testable, and reusable UI features, with a clear path for future enhancements if more time were available. The audit-driven approach ensured that priorities were aligned with project needs, and the timeboxing allowed for a realistic, demonstrable MVP.
